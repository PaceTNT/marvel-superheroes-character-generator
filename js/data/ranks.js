// Random Ranks Table Data
const RANKS_DATA = {
    ranks: [
        { name: "Feeble", value: 1, columns: { 1: [1, 5], 2: [1, 5], 3: [1, 5], 4: [1, 5], 5: [1, 10] } },
        { name: "Poor", value: 3, columns: { 1: [6, 10], 2: [6, 25], 3: [6, 10], 4: [6, 10], 5: [11, 20] } },
        { name: "Typical", value: 5, columns: { 1: [11, 20], 2: [26, 75], 3: [11, 40], 4: [11, 15], 5: [21, 30] } },
        { name: "Good", value: 8, columns: { 1: [21, 40], 2: [76, 95], 3: [41, 80], 4: [16, 40], 5: [31, 40] } },
        { name: "Excellent", value: 16, columns: { 1: [41, 60], 2: [96, 100], 3: [81, 95], 4: [41, 50], 5: [41, 60] } },
        { name: "Remarkable", value: 26, columns: { 1: [61, 80], 2: null, 3: [96, 100], 4: [51, 70], 5: [61, 70] } },
        { name: "Incredible", value: 36, columns: { 1: [81, 96], 2: null, 3: null, 4: [71, 90], 5: [71, 80] } },
        { name: "Amazing", value: 46, columns: { 1: [97, 100], 2: null, 3: null, 4: [91, 98], 5: [81, 95] } },
        { name: "Monstrous", value: 63, columns: { 1: null, 2: null, 3: null, 4: [99, 100], 5: [96, 100] } },
        // Ranks below are unattainable via rolling and exist only for manual entry (no roll columns).
        { name: "Unearthly", value: 88, columns: { 1: null, 2: null, 3: null, 4: null, 5: null } },
        { name: "Shift X", value: 126, columns: { 1: null, 2: null, 3: null, 4: null, 5: null } },
        { name: "Shift Y", value: 176, columns: { 1: null, 2: null, 3: null, 4: null, 5: null } },
        { name: "Shift Z", value: 351, columns: { 1: null, 2: null, 3: null, 4: null, 5: null } },
        { name: "Class 1000", value: 1000, columns: { 1: null, 2: null, 3: null, 4: null, 5: null } },
        { name: "Class 3000", value: 3000, columns: { 1: null, 2: null, 3: null, 4: null, 5: null } },
        { name: "Class 5000", value: 5000, columns: { 1: null, 2: null, 3: null, 4: null, 5: null } },
        { name: "Beyond", value: 10000, columns: { 1: null, 2: null, 3: null, 4: null, 5: null } }
    ]
};

function getRankFromRoll(roll, column) {
    for (const rank of RANKS_DATA.ranks) {
        const range = rank.columns[column];
        if (range && roll >= range[0] && roll <= range[1]) {
            return { name: rank.name, value: rank.value };
        }
    }
    return { name: "Typical", value: 5 }; // Fallback
}

function getNextRank(currentRankName, steps = 1) {
    const currentIndex = RANKS_DATA.ranks.findIndex(r => r.name === currentRankName);
    if (currentIndex === -1) return currentRankName;

    const newIndex = Math.min(currentIndex + steps, RANKS_DATA.ranks.length - 1);
    return RANKS_DATA.ranks[newIndex].name;
}

function getPreviousRank(currentRankName, steps = 1) {
    const currentIndex = RANKS_DATA.ranks.findIndex(r => r.name === currentRankName);
    if (currentIndex === -1) return currentRankName;

    const newIndex = Math.max(currentIndex - steps, 0);
    return RANKS_DATA.ranks[newIndex].name;
}

function getRankValue(rankName) {
    const rank = RANKS_DATA.ranks.find(r => r.name === rankName);
    return rank ? rank.value : 5;
}

// Ability Modifier Table - used for Resources and optional ability adjustments
const ABILITY_MODIFIER_TABLE = [
    { roll: [1, 15], modifier: -1, description: "Reduce by one rank" },
    { roll: [16, 50], modifier: 0, description: "No change" },
    { roll: [51, 85], modifier: 1, description: "Raise by one rank" },
    { roll: [86, 95], modifier: 3, description: "Raise by three ranks" },
    { roll: [96, 100], modifier: 4, description: "Raise by four ranks" }
];

function getAbilityModifier(roll) {
    for (const entry of ABILITY_MODIFIER_TABLE) {
        if (roll >= entry.roll[0] && roll <= entry.roll[1]) {
            return entry;
        }
    }
    return { modifier: 0, description: "No change" };
}

function applyRankModifier(baseRankName, steps) {
    if (steps > 0) {
        return getNextRank(baseRankName, steps);
    } else if (steps < 0) {
        return getPreviousRank(baseRankName, Math.abs(steps));
    }
    return baseRankName;
}

function getRankIndex(rankName) {
    return RANKS_DATA.ranks.findIndex(r => r.name === rankName);
}

/**
 * Compute a power's minimum rank floor based on POWER_DETAILS_DATA, if any.
 * If the power has a minimumRank like "Endurance +1CS" or "Intuition",
 * this resolves it against the character's current primary abilities.
 * @param {string} powerName - The power name to look up in POWER_DETAILS_DATA
 * @param {object} primaryAbilities - The character's primaryAbilities (e.g., { fighting: {rank, value}, ... })
 * @returns {string|null} - The minimum rank name, or null if the power has no minimum rank
 */
function computeMinimumRank(powerName, primaryAbilities) {
    const details = typeof POWER_DETAILS_DATA !== 'undefined' ? POWER_DETAILS_DATA[powerName] : null;
    if (!details || !details.minimumRank) {
        return null;
    }

    // Parse minimumRank string: "Ability +NCS" or just "Ability"
    const match = details.minimumRank.match(/^(\w+)\s*(?:\+(\d+)CS)?$/);
    if (!match) {
        return null;
    }

    const abilityName = match[1].toLowerCase(); // e.g., "endurance", "fighting"
    const columnShift = match[2] ? parseInt(match[2], 10) : 0;

    const ability = primaryAbilities[abilityName];
    if (!ability || !ability.rank) {
        return null;
    }

    // Compute the minimum rank by applying the column shift to the ability rank
    return columnShift > 0 ? getNextRank(ability.rank, columnShift) : ability.rank;
}

/**
 * Enforce a power's minimum rank based on POWER_DETAILS_DATA.
 * If the power has a minimumRank like "Endurance +1CS" or "Intuition",
 * the rolled rank is raised to that minimum if it's lower.
 * @param {string} rolledRankName - The rank name from the initial roll
 * @param {string} powerName - The power name to look up in POWER_DETAILS_DATA
 * @param {object} primaryAbilities - The character's primaryAbilities (e.g., { fighting: {rank, value}, ... })
 * @returns {{ rank: string, value: number }} - The (possibly raised) rank name and value
 */
function applyMinimumRank(rolledRankName, powerName, primaryAbilities) {
    const minimumRankName = computeMinimumRank(powerName, primaryAbilities);
    if (!minimumRankName) {
        return { rank: rolledRankName, value: getRankValue(rolledRankName) };
    }

    const minimumIndex = getRankIndex(minimumRankName);
    const rolledIndex = getRankIndex(rolledRankName);

    if (rolledIndex < minimumIndex) {
        return { rank: minimumRankName, value: getRankValue(minimumRankName) };
    }

    return { rank: rolledRankName, value: getRankValue(rolledRankName) };
}
