---
name: Linear project icon names
description: Valid PascalCase names for the Project.icon field in Linear's GraphQL API, plus how to set them
type: reference
originSessionId: 26df4970-7a24-40ba-a457-e03a80606c13
---
Linear's `Project.icon` field accepts PascalCase icon names from their built-in SVG set. This is not documented publicly; the full list has to be probed or extracted from the in-app picker DOM. Below is the known-valid set, gathered from the icon picker UI and API probing as of April 2026.

**How to set via API:**

```bash
curl -s -X POST https://api.linear.app/graphql \
  -H "Authorization: $LINEAR_API_KEY" -H "Content-Type: application/json" \
  -d '{"query":"mutation { projectUpdate(id: \"<id>\", input: { icon: \"PingPong\" }) { success } }"}'
```

The MCP `save_project` tool's `icon` field accepts the same value (its docstring says "emoji" but it accepts these PascalCase names too).

**Known-valid icon names:**

Faces: `Face`, `UnhappyFace`, `FaceHeartEyes`, `FaceFlatSmile`, `FaceMask`, `FaceSurprise`, `FaceMonocle`, `FaceSunglasses`, `FaceStarEyes`, `FaceTongue`, `FaceTired`, `FaceId`

People/gestures: `Users`, `Mask`, `Shrug`, `Signature`, `FootPrint`, `Accessibility`, `ThumbsUp`, `ThumbsDown`

Anatomy/health: `Dna`, `Heart`, `Cross`, `Bandage`, `Pills`, `Health`, `SafetyKit`, `Hear`, `Skull`, `Bones`, `Brain`

Food: `Burger`, `Coffee`, `Biscuit`, `Pizza`, `Ramen`

Nature: `Leaf`, `Tree`, `Flower`, `PalmTree`, `Feather`, `Mountain`, `Sun`, `Cloud`, `Storm`, `Bolt`, `Fire`, `Umbrella`

Sports/play: `Dino`, `AmericanFootBall`, `Basketball`, `BowlingBall`, `Dumbbell`, `Golf`, `LockerRoom`, `PingPong`, `Runner`, `SoccerBall`, `Stadium`, `Surfer`, `TennisBall`, `Jersey`, `Dice`, `PokerCard`

Audio: `Mic`, `MusicKey`, `MusicTape`, `Speaker`, `Boombox`, `Sound`

Shapes/tools: `Cone`, `Cube`, `Brush`, `Bucket`, `Basket`, `Scissors`, `Eraser`, `Ladder`, `Magnet`, `Flashlight`, `Gears`, `Lock`, `Binocular`, `Extinguisher`, `Paint`

Buildings/objects: `Brick`, `Crane`, `Book`, `BookOpen`, `Bookmark`, `Briefcase`, `Calculator`, `NotePad`, `Bed`, `Box`, `BoxOpen`, `ClothHanger`, `TeeShirt`, `Wall`, `Garage`

Abstract/symbolic: `LightBulb`, `MagicWand`, `CrystalBall`, `Present`, `Shield`, `Crown`, `Recycle`, `Hourglass`, `Megaphone`, `Chemist`, `Direction`, `Favorite`, `Rocket`

Tech/UI: `Camera`, `Calendar`, `Database`, `Folder`, `Phone`, `Pin`, `Robot`, `Search`, `Video`, `Shop`, `Ship`, `Sign`, `Project`

**Known-invalid names** (rejected by API): Target, Flag, Star, Music, Art, Design, Building, Workshop, Court, Ball, Wave, Menu, Signage, Clean, Release, Demo, Test, Playtest, Gear, Hammer, Package, Store, People, Person, Tool, Cog, Edit, Writing, Pen, Paper.

**Gotchas:**
- Case matters; `PingPong` works, `pingpong` does not
- Names don't always match their obvious synonym; "Music" fails but `MusicKey` / `MusicTape` work; "Menu" fails but `BookOpen` / `NotePad` work
- The icon picker in Linear's web app renders a larger catalogue; if something is missing here, inspect the DOM; each button has `href="#IconName"` on its SVG `<use>`, giving the exact value to send
