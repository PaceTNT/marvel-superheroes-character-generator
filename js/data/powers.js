// Powers Data for Marvel Superheroes RPG
// Based on MSRPG Generating Secondary Abilities rulebook

const POWERS_DATA = {
  // Powers, Talents, and Contacts Allocation Table
  // Roll d100 once to determine initial and maximum counts for all three
  allocationTable: [
    {
      roll: [1, 20],
      powers: { initial: 2, max: 4 },
      talents: { initial: 1, max: 6 },
      contacts: { initial: 0, max: 4 }
    },
    {
      roll: [21, 60],
      powers: { initial: 3, max: 4 },
      talents: { initial: 2, max: 5 },
      contacts: { initial: 1, max: 4 }
    },
    {
      roll: [61, 90],
      powers: { initial: 4, max: 4 },
      talents: { initial: 3, max: 4 },
      contacts: { initial: 2, max: 4 }
    },
    {
      roll: [91, 100],
      powers: { initial: 5, max: 5 },
      talents: { initial: 4, max: 4 },
      contacts: { initial: 3, max: 4 }
    }
  ],

  // Power Categories Table
  // Roll d100 to determine which category a power comes from
  categories: [
    { name: "Resistances", roll: [1, 5] },
    { name: "Senses", roll: [6, 10] },
    { name: "Movement", roll: [11, 15] },
    { name: "Matter Control", roll: [16, 25] },
    { name: "Energy Control", roll: [26, 40] },
    { name: "Body Control", roll: [41, 55] },
    { name: "Distance Attacks", roll: [56, 70] },
    { name: "Mental Powers", roll: [71, 75] },
    { name: "Body Alterations / Offensive", roll: [76, 90] },
    { name: "Body Alterations / Defensive", roll: [91, 100] }
  ],

  // Individual Powers by Category
  // starred: true means the power costs 2 slots instead of 1
  // bonus: "PowerName" means choosing this power also grants the bonus power
  powersList: {
    "Resistances": [
      { name: "Resistance to Fire and Heat", starred: false, bonus: null },
      { name: "Resistance to Cold", starred: false, bonus: null },
      { name: "Resistance to Electricity", starred: false, bonus: null },
      { name: "Resistance to Radiation", starred: false, bonus: null },
      { name: "Resistance to Toxins", starred: false, bonus: null },
      { name: "Resistance to Corrosives", starred: false, bonus: null },
      { name: "Resistance to Emotion Attacks", starred: false, bonus: null },
      { name: "Resistance to Mental Attacks", starred: false, bonus: null },
      { name: "Resistance to Magical Attacks", starred: false, bonus: null },
      { name: "Resistance to Disease", starred: false, bonus: null },
      { name: "Invulnerability", starred: true, bonus: null } // Costs 2 slots
    ],

    "Senses": [
      { name: "Protected Senses", starred: false, bonus: null },
      { name: "Enhanced Senses", starred: false, bonus: null },
      { name: "Infravision", starred: false, bonus: null },
      { name: "Cosmic Awareness", starred: true, bonus: null }, // Costs 2 slots
      { name: "Combat Sense", starred: true, bonus: null }, // Costs 2 slots
      { name: "Computer Links", starred: false, bonus: null },
      { name: "Emotion Detection", starred: false, bonus: null },
      { name: "Energy Detection", starred: false, bonus: null },
      { name: "Magic Detection", starred: false, bonus: null },
      { name: "Magnetic Detection", starred: false, bonus: null },
      { name: "Mutant Detection", starred: false, bonus: null },
      { name: "Psionic Detection", starred: false, bonus: null },
      { name: "Astral Detection", starred: false, bonus: null },
      { name: "Tracking Ability", starred: false, bonus: null }
    ],

    "Movement": [
      { name: "Flight", starred: false, bonus: null },
      { name: "Flight", starred: false, bonus: null }, // Listed twice (rolls 1-2)
      { name: "Gliding", starred: false, bonus: null },
      { name: "Leaping", starred: false, bonus: null },
      { name: "Wall-Crawling", starred: false, bonus: null },
      { name: "Wall-Crawling", starred: false, bonus: null }, // Listed twice (rolls 5-6)
      { name: "Lightning Speed", starred: false, bonus: null },
      { name: "Teleportation", starred: true, bonus: null }, // Costs 2 slots
      { name: "Levitation", starred: false, bonus: null },
      { name: "Swimming", starred: false, bonus: null },
      { name: "Climbing", starred: false, bonus: null },
      { name: "Digging", starred: false, bonus: "Claws" },
      { name: "Dimensional Travel", starred: false, bonus: null }
    ],

    "Matter Control": [
      { name: "Earth Control", starred: false, bonus: null },
      { name: "Earth Control", starred: false, bonus: null }, // Listed twice (rolls 1-2)
      { name: "Air Control", starred: false, bonus: null },
      { name: "Air Control", starred: false, bonus: null }, // Listed twice (rolls 3-4)
      { name: "Fire Control", starred: false, bonus: null },
      { name: "Fire Control", starred: false, bonus: null }, // Listed twice (rolls 5-6)
      { name: "Water Control", starred: false, bonus: null },
      { name: "Water Control", starred: false, bonus: null }, // Listed twice (rolls 7-8)
      { name: "Weather Control", starred: false, bonus: null },
      { name: "Animate Objects", starred: false, bonus: null },
      { name: "Density Manipulation - Others", starred: false, bonus: null },
      { name: "Body Transformation - Others", starred: false, bonus: null },
      { name: "Animal Transformation - Others", starred: false, bonus: null }
    ],

    "Energy Control": [
      { name: "Magnetic Manipulation", starred: false, bonus: null },
      { name: "Magnetic Manipulation", starred: false, bonus: null }, // Listed twice (rolls 1-2)
      { name: "Electrical Manipulation", starred: false, bonus: null },
      { name: "Electrical Manipulation", starred: false, bonus: null }, // Listed twice (rolls 3-4)
      { name: "Light Manipulation", starred: false, bonus: null },
      { name: "Light Manipulation", starred: false, bonus: null }, // Listed twice (rolls 5-6)
      { name: "Sound Manipulation", starred: false, bonus: null },
      { name: "Sound Manipulation", starred: false, bonus: null }, // Listed twice (rolls 7-8)
      { name: "Darkforce Manipulation", starred: false, bonus: null },
      { name: "Gravity Manipulation", starred: false, bonus: null },
      { name: "Probability Manipulation", starred: true, bonus: null }, // Costs 2 slots
      { name: "Nullifying Power", starred: true, bonus: null }, // Costs 2 slots
      { name: "Energy Reflection", starred: false, bonus: null },
      { name: "Time Control", starred: true, bonus: null } // Costs 2 slots
    ],

    "Body Control": [
      { name: "Growth", starred: false, bonus: null },
      { name: "Shrinking", starred: false, bonus: null },
      { name: "Density Manipulation - Self", starred: false, bonus: null },
      { name: "Phasing", starred: false, bonus: null },
      { name: "Invisibility", starred: false, bonus: null },
      { name: "Plasticity", starred: false, bonus: null },
      { name: "Elongation", starred: false, bonus: null },
      { name: "Shape-Shifting", starred: false, bonus: null },
      { name: "Imitation", starred: false, bonus: null },
      { name: "Body Transformation - Self", starred: false, bonus: null },
      { name: "Animal Transformation - Self", starred: false, bonus: null },
      { name: "Raise Lowest Ability", starred: false, bonus: null },
      { name: "Blending", starred: false, bonus: null },
      { name: "Power Absorption", starred: false, bonus: null },
      { name: "Alter Ego", starred: false, bonus: null }
    ],

    "Distance Attacks": [
      { name: "Projectile Missile", starred: false, bonus: null },
      { name: "Ensnaring Missile", starred: false, bonus: null },
      { name: "Ice Generation", starred: false, bonus: null },
      { name: "Fire Generation", starred: false, bonus: null },
      { name: "Energy Generation", starred: false, bonus: null },
      { name: "Sound Generation", starred: false, bonus: null },
      { name: "Stunning Missile", starred: false, bonus: null },
      { name: "Corrosive Missile", starred: false, bonus: null },
      { name: "Slashing Missile", starred: false, bonus: null },
      { name: "Nullifier Missile", starred: false, bonus: null },
      { name: "Darkforce Generation", starred: false, bonus: null }
    ],

    "Mental Powers": [
      { name: "Ultimate Skill", starred: false, bonus: null },
      { name: "Telepathy", starred: false, bonus: null },
      { name: "Image Generation", starred: false, bonus: null },
      { name: "Telekinesis", starred: false, bonus: null },
      { name: "Mind Control", starred: false, bonus: null },
      { name: "Emotion Control", starred: false, bonus: null },
      { name: "Mental Probe", starred: false, bonus: null },
      { name: "Force Field Generation", starred: false, bonus: null },
      { name: "Animal Communication and Control", starred: false, bonus: null },
      { name: "Mechanical Intuition", starred: false, bonus: null },
      { name: "Empathy", starred: false, bonus: null },
      { name: "Animal Empathy", starred: false, bonus: null },
      { name: "Psi-Screen", starred: false, bonus: null },
      { name: "Animate Drawings", starred: false, bonus: null },
      { name: "Possession", starred: false, bonus: null },
      { name: "Transferral", starred: false, bonus: null },
      { name: "Astral Projection", starred: false, bonus: null },
      { name: "Psionic Attack", starred: false, bonus: null },
      { name: "Precognition", starred: false, bonus: null },
      { name: "Postcognition", starred: false, bonus: null },
      { name: "Plant Control", starred: false, bonus: null }
    ],

    "Body Alterations / Offensive": [
      { name: "Extra Body Parts - Offensive", starred: false, bonus: null },
      { name: "Extra Attacks", starred: false, bonus: null },
      { name: "Natural Weaponry", starred: false, bonus: null },
      { name: "Claws", starred: false, bonus: null },
      { name: "Fangs/Teeth", starred: false, bonus: null },
      { name: "Horns", starred: false, bonus: null },
      { name: "Quills/Spines", starred: false, bonus: null },
      { name: "Poison Touch", starred: false, bonus: null },
      { name: "Paralysis Touch", starred: false, bonus: null },
      { name: "Rotting Touch", starred: false, bonus: null },
      { name: "Corrosive Touch", starred: false, bonus: null },
      { name: "Vampirism", starred: false, bonus: null },
      { name: "Health-Drain Touch", starred: false, bonus: null },
      { name: "Blinding Touch", starred: false, bonus: null },
      { name: "Energy Touch", starred: false, bonus: "Resistance to Electricity" }
    ],

    "Body Alterations / Defensive": [
      { name: "Body Armor", starred: false, bonus: null },
      { name: "Water Breathing", starred: false, bonus: null },
      { name: "Absorption Power", starred: false, bonus: null },
      { name: "Regeneration", starred: false, bonus: null },
      { name: "Solar Regeneration", starred: false, bonus: null },
      { name: "Recovery", starred: false, bonus: "Any Resistance" },
      { name: "Life Support", starred: false, bonus: null },
      { name: "Pheromones", starred: false, bonus: null },
      { name: "Damage Transfer", starred: false, bonus: null },
      { name: "Healing", starred: false, bonus: null },
      { name: "Immortality", starred: true, bonus: null } // Costs 2 slots (except aliens)
    ]
  }
};

// Helper Functions

/**
 * Get allocation from a d100 roll
 * @param {number} roll - d100 roll (1-100)
 * @returns {object} - { powers: {initial, max}, talents: {initial, max}, contacts: {initial, max} }
 */
function getAllocationFromRoll(roll) {
  for (const entry of POWERS_DATA.allocationTable) {
    if (roll >= entry.roll[0] && roll <= entry.roll[1]) {
      return {
        powers: { ...entry.powers },
        talents: { ...entry.talents },
        contacts: { ...entry.contacts }
      };
    }
  }
  // Fallback (should never happen with valid roll)
  return POWERS_DATA.allocationTable[1]; // 21-60 range as default
}

/**
 * Get power category from a d100 roll
 * @param {number} roll - d100 roll (1-100)
 * @returns {string} - Category name
 */
function getCategoryFromRoll(roll) {
  for (const category of POWERS_DATA.categories) {
    if (roll >= category.roll[0] && roll <= category.roll[1]) {
      return category.name;
    }
  }
  // Fallback
  return "Distance Attacks";
}

/**
 * Get a random power from a category
 * @param {string} categoryName - Name of the category
 * @returns {object} - Power object { name, starred, bonus }
 */
function getRandomPowerFromCategory(categoryName) {
  const powers = POWERS_DATA.powersList[categoryName];
  if (!powers || powers.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * powers.length);
  return { ...powers[randomIndex] }; // Return copy
}

/**
 * Get all powers from a category
 * @param {string} categoryName - Name of the category
 * @returns {array} - Array of power objects
 */
function getPowersInCategory(categoryName) {
  return POWERS_DATA.powersList[categoryName] || [];
}

/**
 * Get all category names
 * @returns {array} - Array of category names
 */
function getAllCategories() {
  return POWERS_DATA.categories.map(cat => cat.name);
}

/**
 * Calculate how many power slots a list of powers consumes
 * @param {array} powers - Array of power objects with 'starred' property
 * @returns {number} - Total slots consumed
 */
function calculatePowerSlots(powers) {
  let slots = 0;
  for (const power of powers) {
    slots += power.starred ? 2 : 1;
  }
  return slots;
}
