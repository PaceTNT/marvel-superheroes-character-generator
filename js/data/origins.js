// Origin Data
const ORIGINS_DATA = {
    "Altered Human": {
        diceRange: [1, 30],
        column: 1,
        description: "Everyday people exposed to radiation, formulas, or trained in special talents.",
        examples: "Fantastic Four, Hulk, Doctor Strange",
        modifiers: {
            abilities: "Choose one ability to raise by 1 rank",
            resources: "Typical + Ability Modifier roll",
            popularity: "Roll normally"
        }
    },
    "Mutant": {
        diceRange: [31, 60],
        column: 1,
        description: "Homo Superior with inborn powers. Generally feared by the populace.",
        examples: "X-Men, X-Factor, New Mutants",
        modifiers: {
            endurance: "+1 rank",
            powers: "+1 power (max 5)",
            resources: "Typical + Ability Modifier roll, then -1 rank",
            popularity: "Starts at 0"
        }
    },
    "Hi-Tech": {
        diceRange: [61, 90],
        column: 3,
        description: "Heroes deriving abilities from equipment (technological or mystical).",
        examples: "Iron Man, Captain Britain",
        modifiers: {
            reason: "+2 ranks",
            resources: "Good (fixed) or Typical + Ability Modifier roll",
            contacts: "Requires 1 Contact (organization)",
            talents: "Requires 1 Scientific/Professional Talent"
        }
    },
    "Robot": {
        diceRange: [91, 95],
        column: 4,
        description: "Artificially-created sentient beings (androids, synthezoids, golems).",
        examples: "Vision, Machine Man, Ultron",
        modifiers: {
            popularity: "Starts at 0",
            special: "Can heal normally, no Karma loss when destroyed"
        }
    },
    "Alien": {
        diceRange: [96, 100],
        column: 5,
        description: "Beings from other civilizations, planets, or dimensions.",
        examples: "Thor, Kree, Skrull",
        modifiers: {
            powers: "-1 power (min 2)",
            resources: "Poor + Ability Modifier roll",
            contacts: "Maximum 1 Contact"
        }
    }
};
