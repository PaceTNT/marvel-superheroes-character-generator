// Talents and Contacts Data for Marvel Superheroes RPG
// Based on MSRPG Generating Talents rulebook

const TALENTS_DATA = {
  // Talent Category Table
  // Roll d100 to determine which category a talent comes from
  categories: [
    { name: "Weapon Skills",            roll: [1, 20] },
    { name: "Fighting Skills",          roll: [21, 45] },
    { name: "Professional Skills",      roll: [46, 65] },
    { name: "Scientific Skills",        roll: [66, 85] },
    { name: "Mystic and Mental Skills", roll: [86, 90] },
    { name: "Other Skills",             roll: [91, 100] }
  ],

  // Individual Skills by Category
  // roll: d10 range for random rolling
  // skills: array of skill names (multiple means one is picked at random when rolling)
  // ranked: true means the skill requires a secondary roll on Column 2 of the Random Ranks Table
  skillsList: {
    "Weapon Skills": [
      { roll: [1, 2],   skills: ["Guns"], ranked: false },
      { roll: [3, 5],   skills: ["Thrown Weapons"], ranked: false },
      { roll: [6, 6],   skills: ["Bows"], ranked: false },
      { roll: [7, 8],   skills: ["Blunt Weapons"], ranked: false },
      { roll: [9, 9],   skills: ["Sharp Weapons"], ranked: false },
      { roll: [10, 10], skills: ["Oriental Weapons", "Marksman", "Weapons Master", "Weapons Specialist"], ranked: true }
    ],

    "Fighting Skills": [
      { roll: [1, 1],   skills: ["Martial Arts A"], ranked: false },
      { roll: [2, 2],   skills: ["Martial Arts B"], ranked: false },
      { roll: [3, 3],   skills: ["Martial Arts C"], ranked: false },
      { roll: [4, 4],   skills: ["Martial Arts D"], ranked: false },
      { roll: [5, 5],   skills: ["Martial Arts E"], ranked: false },
      { roll: [6, 6],   skills: ["Wrestling"], ranked: false },
      { roll: [7, 7],   skills: ["Thrown Objects"], ranked: false },
      { roll: [8, 8],   skills: ["Tumbling"], ranked: false },
      { roll: [9, 10],  skills: ["Acrobatics"], ranked: false }
    ],

    "Professional Skills": [
      { roll: [1, 1],   skills: ["Medicine"], ranked: true },
      { roll: [2, 2],   skills: ["Law", "Law-Enforcement"], ranked: false },
      { roll: [3, 3],   skills: ["Pilot"], ranked: false },
      { roll: [4, 4],   skills: ["Military"], ranked: false },
      { roll: [5, 5],   skills: ["Business/Finance"], ranked: false },
      { roll: [6, 6],   skills: ["Journalism"], ranked: false },
      { roll: [7, 7],   skills: ["Engineering"], ranked: false },
      { roll: [8, 8],   skills: ["Crime"], ranked: false },
      { roll: [9, 9],   skills: ["Psychiatry"], ranked: false },
      { roll: [10, 10], skills: ["Detective/Espionage"], ranked: false }
    ],

    "Scientific Skills": [
      { roll: [1, 2],   skills: ["Chemistry"], ranked: false },
      { roll: [3, 4],   skills: ["Biology"], ranked: false },
      { roll: [5, 6],   skills: ["Geology"], ranked: false },
      { roll: [7, 7],   skills: ["Genetics"], ranked: false },
      { roll: [8, 8],   skills: ["Archeology"], ranked: false },
      { roll: [9, 9],   skills: ["Physics", "Computers"], ranked: false },
      { roll: [10, 10], skills: ["Electronics"], ranked: false }
    ],

    "Mystic and Mental Skills": [
      { roll: [1, 2],   skills: ["Trance"], ranked: false },
      { roll: [3, 5],   skills: ["Mesmerism and Hypnosis"], ranked: false },
      { roll: [6, 7],   skills: ["Sleight of Hand"], ranked: false },
      { roll: [8, 9],   skills: ["Resist Domination", "Mystic Origin"], ranked: true },
      { roll: [10, 10], skills: ["Occult Lore"], ranked: false }
    ],

    "Other Skills": [
      { roll: [1, 2],   skills: ["Artist"], ranked: false },
      { roll: [3, 5],   skills: ["Languages"], ranked: false },
      { roll: [6, 7],   skills: ["First Aid"], ranked: false },
      { roll: [8, 9],   skills: ["Repair/Tinkering"], ranked: false },
      { roll: [10, 10], skills: ["Trivia", "Performer", "Animal Training", "Heir to Fortune", "Student", "Leadership"], ranked: true }
    ]
  },

  // Contact Types (choose only, not rolled)
  contactTypes: {
    "Professional": [
      "Medicine", "Law", "Law-Enforcement", "Military", "Business World",
      "Journalism", "Crime", "Engineering", "Psychiatry", "Detective/Espionage",
      "Hero Group", "Artist/Performer"
    ],
    "Scientific": [
      "Chemistry", "Biology", "Geology", "Genetics", "Archeology",
      "Physics", "Computers", "Electronics"
    ],
    "Political": [
      "Local", "State", "National", "Other National", "International", "Planetary"
    ],
    "Mystic": [
      "Religion", "Occult Lore", "Mythology"
    ]
  }
};

// Helper Functions

/**
 * Get talent category from a d100 roll
 * @param {number} roll - d100 roll (1-100)
 * @returns {string} - Category name
 */
function getTalentCategoryFromRoll(roll) {
  for (const category of TALENTS_DATA.categories) {
    if (roll >= category.roll[0] && roll <= category.roll[1]) {
      return category.name;
    }
  }
  return "Fighting Skills"; // Fallback
}

/**
 * Get a talent skill from a d10 roll within a category
 * If the entry has multiple skills, one is picked at random
 * @param {string} categoryName - Name of the category
 * @param {number} roll - d10 roll (1-10)
 * @returns {object} - { name, ranked }
 */
function getTalentFromRoll(categoryName, roll) {
  const skills = TALENTS_DATA.skillsList[categoryName];
  if (!skills) return null;

  for (const entry of skills) {
    if (roll >= entry.roll[0] && roll <= entry.roll[1]) {
      // Pick a random skill if multiple are listed
      const skillName = entry.skills[Math.floor(Math.random() * entry.skills.length)];
      return { name: skillName, ranked: entry.ranked };
    }
  }
  return null;
}

/**
 * Get all talent category names
 * @returns {array} - Array of category names
 */
function getAllTalentCategories() {
  return TALENTS_DATA.categories.map(cat => cat.name);
}

/**
 * Get a flat array of all unique individual skill names in a category (for choose mode)
 * Each skill is returned with its ranked status
 * @param {string} categoryName - Name of the category
 * @returns {array} - Array of { name, ranked } objects
 */
function getSkillsInCategory(categoryName) {
  const entries = TALENTS_DATA.skillsList[categoryName];
  if (!entries) return [];

  const skills = [];
  for (const entry of entries) {
    for (const skillName of entry.skills) {
      skills.push({ name: skillName, ranked: entry.ranked });
    }
  }
  return skills;
}

/**
 * Check if a skill requires a Column 2 rank roll
 * @param {string} categoryName - Name of the category
 * @param {string} skillName - Name of the skill
 * @returns {boolean}
 */
function isSkillRanked(categoryName, skillName) {
  const entries = TALENTS_DATA.skillsList[categoryName];
  if (!entries) return false;

  for (const entry of entries) {
    if (entry.skills.includes(skillName)) {
      return entry.ranked;
    }
  }
  return false;
}

/**
 * Get all contact category names
 * @returns {array} - Array of contact category names
 */
function getAllContactCategories() {
  return Object.keys(TALENTS_DATA.contactTypes);
}

/**
 * Get all contact types in a category
 * @param {string} categoryName - Name of the contact category
 * @returns {array} - Array of contact type strings
 */
function getContactsInCategory(categoryName) {
  return TALENTS_DATA.contactTypes[categoryName] || [];
}
