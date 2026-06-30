/** @type {import("@opencode-ai/plugin").Plugin} */
export const GodotIQGuards = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      const tool = input.tool
      if (!tool || !tool.startsWith("godotiq_")) return

      const args = output?.args ?? {}
      const path = args.path ?? args.file ?? args.scene ?? args.expected_scene ?? ""
      if (typeof path !== "string" || path.length === 0) return

      const segments = path.replace(/^res:\/\//, "").split("/")
      const touchesDotDir = segments.some(s => s.length > 0 && s.startsWith("."))

      if (touchesDotDir) {
        throw new Error(
          `GodotIQ tool "${tool}" blocked: path "${path}" accesses a hidden/dot directory. ` +
          "GodotIQ is for game files (scenes, scripts, assets), not config directories."
        )
      }
    },
  }
}
