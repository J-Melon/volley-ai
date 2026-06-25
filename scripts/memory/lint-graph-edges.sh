#!/usr/bin/env bash
# Validates parent: frontmatter edges in the memory corpus, and optionally
# renders the forest as a tree.
#
# Every parent: value must resolve to an existing .md file whose basename
# matches the slug. Exits non-zero when any dangling parent is found.
#
# Usage:
#   lint-graph-edges.sh [MEMORY_DIR]            validate (default)
#   lint-graph-edges.sh --tree [MEMORY_DIR]     render the forest, then validate
#
# parent: may sit at the top level of the frontmatter or nested under
# metadata: (any indentation); both are read. MEMORY_DIR defaults to
# ~/.claude/projects/-home-josh-gamedev-volley/memory so the hook runs with
# no arguments.

set -euo pipefail

BOLD=$'\033[1m'
DIM=$'\033[2m'
CYAN=$'\033[36m'
BLUE=$'\033[34m'
GREEN=$'\033[32m'
YELLOW=$'\033[33m'
RED=$'\033[31m'
WHITE=$'\033[37m'
NC=$'\033[0m'

colour_at_depth() {
    local d=$1
    if (( d <= 2 )); then printf "%s" "$GREEN"
    elif (( d == 3 )); then printf "%s" "$YELLOW"
    elif (( d <= 4 )); then printf "%s" "${BOLD}${YELLOW}"
    elif (( d == 5 )); then printf "%s" "$RED"
    else printf "%s" "${BOLD}${RED}"
    fi
}
    elif (( d == 5 )); then printf "%s" "$RED"
    else printf "%s" "${BOLD}${RED}"
    fi
}


mode="lint"
if [[ "${1:-}" == "--tree" ]]; then
    mode="tree"
    shift
fi

# Default to the memory root this script ships in (scripts/memory/ -> repo root),
# so the forest is self-contained and relocatable. Override with an explicit arg.
_SELF_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MEMORY_DIR="${1:-$(cd "$_SELF_DIR/../.." && pwd)}"

if [[ ! -d "$MEMORY_DIR" ]]; then
    echo "lint-graph-edges: memory dir not found: $MEMORY_DIR" >&2
    exit 1
fi

# Read a file's parent: slug from its frontmatter (top-level or nested under
# metadata:, at any indent). Prints the slug, or nothing for a root.
is_memory_node() {
    local name="$(basename "$1" .md)"
    local dir="$(dirname "$1")"
    # Spine files and letters are always memory nodes.
    [[ "$name" == "MEMORY" ]]         && return 0
    [[ "$name" == "letters" ]]        && return 0
    [[ "$name" == trunk_* ]]          && return 0
    [[ "$dir" == */letters ]]         && return 0
    # Memory nodes follow a naming convention.
    [[ "$name" == feedback_* ]]       && return 0
    [[ "$name" == project_* ]]        && return 0
    [[ "$name" == reference_* ]]      && return 0
    return 1
}

read_parent() {
    awk '
        /^---[[:space:]]*$/ { fence++; next }
        fence == 1 && /^[[:space:]]*parent:[[:space:]]*/ {
            sub(/^[[:space:]]*parent:[[:space:]]*/, ""); print; exit
        }
        fence >= 2 { exit }
    ' "$1"
}

dangling=0
orphans=0
# slug -> parent slug, for the tree render
declare -A PARENT_OF
declare -A IS_NODE

while IFS= read -r -d '' filepath; do
    is_memory_node "$filepath" || continue
    filename="$(basename "$filepath" .md)"
    IS_NODE["$filename"]=1
    parent_value="$(read_parent "$filepath")"

    if [[ -z "$parent_value" ]]; then
        orphans=$((orphans + 1))
        PARENT_OF["$filename"]=""
        continue
    fi

    PARENT_OF["$filename"]="$parent_value"
done < <(find "$MEMORY_DIR" -path "$MEMORY_DIR/scripts" -prune -o -name "*.md" -print0 | sort -z)

# No spine means MEMORY_DIR is the wrong tree, not an empty forest.
if [[ -z "${IS_NODE[MEMORY]:-}" || -z "${IS_NODE[trunk_unordered]:-}" ]]; then
    echo "lint-graph-edges: $MEMORY_DIR has no MEMORY.md/trunk spine; wrong dir?" >&2
    exit 2
fi

# Resolve parents against the set of known nodes (any subdir), not a fixed path,
# so a parent file in letters/ or any subdir resolves. Done as a second pass so
# a parent seen later in the walk still counts.
for child in "${!PARENT_OF[@]}"; do
    p="${PARENT_OF[$child]}"
    [[ -z "$p" ]] && continue
    if [[ -z "${IS_NODE[$p]:-}" ]]; then
        echo "dangling parent: $child -> $p (no node: $p)"
        dangling=$((dangling + 1))
    fi
done

if [[ "$mode" == "tree" ]]; then
    # Render each root and descend its children. A node whose parent is empty,
    # or whose parent does not resolve to a known node, is treated as a root.
    print_children() {
        local parent="$1" indent="$2" depth="$3" child colour
        for child in $(printf '%s\n' "${!PARENT_OF[@]}" | sort); do
            if [[ "${PARENT_OF[$child]}" == "$parent" ]]; then
                colour="$(colour_at_depth "$depth")"
                printf '%s- %b%s\n' "$indent" "${colour}${child}${NC}"
                print_children "$child" "  $indent" $((depth + 1))
            fi
        done
    }
    # Show the WHOLE navigable surface: ordered trees first (roots with
    # children), then every unordered node (a root with no children, not yet
    # placed). A fresh instance must be able to reach all of them, so render all.
    has_children() { printf '%s\n' "${PARENT_OF[@]}" | grep -qx "$1"; }
    is_root() { local p="${PARENT_OF[$1]:-}"; [[ -z "$p" || -z "${IS_NODE[$p]:-}" ]]; }
    typed_roots=0
    unordered=0
    for node in $(printf '%s\n' "${!IS_NODE[@]}" | sort); do
        if is_root "$node" && has_children "$node"; then
            [[ $typed_roots -gt 0 ]] && echo
            printf '%b\n' "${BOLD}${CYAN}${node}${NC}"
            print_children "$node" "  " 1
            typed_roots=$((typed_roots + 1))
        fi
    done
    # Bridge: group the unordered nodes under their proposed trunk, so the render
    # shows a navigable forest (trunks), not a flat dump. The bucketing map is a
    # markdown file with "## <trunk> (N)" headers and "- <node>" lines.
    BRIDGE="${BRIDGE_MAP:-$_SELF_DIR/memory-bucketing.md}"
    declare -A TRUNK_OF
    if [[ -f "$BRIDGE" ]]; then
        cur=""
        while IFS= read -r line; do
            if [[ "$line" =~ ^##\ ([a-z-]+) ]]; then cur="${BASH_REMATCH[1]}"
            elif [[ "$line" =~ ^-\ ([A-Za-z0-9_]+) ]]; then TRUNK_OF["${BASH_REMATCH[1]}"]="$cur"; fi
        done < "$BRIDGE"
    fi
    echo
    echo "# bridge: unordered nodes grouped under their proposed trunk"
    for trunk in dev-cycle who-i-am docs volley shuck UNBUCKETED; do
        first=1
        for node in $(printf '%s\n' "${!IS_NODE[@]}" | sort); do
            is_root "$node" && ! has_children "$node" || continue
            [[ "$node" == trunk_* ]] && continue
            [[ "$node" == "MEMORY" ]] && continue
            t="${TRUNK_OF[$node]:-UNBUCKETED}"
            [[ "$t" == "$trunk" ]] || continue
            if [[ $first == 1 ]]; then echo; printf '%b\n' "${YELLOW}## ${trunk}${NC}"; first=0; fi
            printf -- '- %b%s\n' "${DIM}${WHITE}${node}${NC}"
            unordered=$((unordered + 1))
        done
    done
    printf '%b\n' "${GREEN}--- ${typed_roots} ordered trees, ${unordered} unordered nodes across the trunks ---${NC}"
fi

echo "lint-graph-edges: $dangling dangling, $orphans root/untyped nodes"

if [[ "$dangling" -gt 0 ]]; then
    exit 1
fi
