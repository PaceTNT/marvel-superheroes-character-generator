// Dice Rolling Functions
function rollD100() {
    return Math.floor(Math.random() * 100) + 1;
}

function rollD10() {
    return Math.floor(Math.random() * 10) + 1;
}

function rollOrigin() {
    const roll = rollD100();
    let origin;

    if (roll <= 30) origin = "Altered Human";
    else if (roll <= 60) origin = "Mutant";
    else if (roll <= 90) origin = "Hi-Tech";
    else if (roll <= 95) origin = "Robot";
    else origin = "Alien";

    return { roll, origin };
}

function rollAbility(origin) {
    const column = ORIGINS_DATA[origin].column;
    const roll = rollD100();
    const rank = getRankFromRoll(roll, column);

    return {
        roll: roll,
        rank: rank.name,
        value: rank.value
    };
}

// Powers, Talents, and Contacts Rolling Functions

/**
 * Roll for powers/talents/contacts allocation
 * Single d100 roll determines initial and maximum counts for all three
 * @returns {object} - { roll, powers: {initial, max}, talents: {initial, max}, contacts: {initial, max} }
 */
function rollAllocation() {
    const roll = rollD100();
    const allocation = getAllocationFromRoll(roll);

    return {
        roll: roll,
        powers: allocation.powers,
        talents: allocation.talents,
        contacts: allocation.contacts
    };
}

/**
 * Roll for a power category
 * @returns {object} - { roll, category }
 */
function rollPowerCategory() {
    const roll = rollD100();
    const category = getCategoryFromRoll(roll);

    return {
        roll: roll,
        category: category
    };
}

/**
 * Roll for a specific power within a category
 * @param {string} categoryName - Name of the category
 * @returns {object} - { power } where power has { name, starred, bonus }
 */
function rollPowerFromCategory(categoryName) {
    const power = getRandomPowerFromCategory(categoryName);

    return {
        power: power
    };
}

/**
 * Roll for a power rank (uses Column 4 of Random Ranks Table)
 * @returns {object} - { roll, rank, value }
 */
function rollPowerRank() {
    const roll = rollD100();
    const rank = getRankFromRoll(roll, 4); // Column 4 for powers

    return {
        roll: roll,
        rank: rank.name,
        value: rank.value
    };
}

/**
 * Roll a complete random power with all details
 * Rolls category, power, and rank in one go
 * @returns {object} - { category, power, rank, value, roll }
 */
function rollCompletePower() {
    const categoryResult = rollPowerCategory();
    const powerResult = rollPowerFromCategory(categoryResult.category);
    const rankResult = rollPowerRank();

    return {
        category: categoryResult.category,
        name: powerResult.power.name,
        starred: powerResult.power.starred,
        bonus: powerResult.power.bonus,
        rank: rankResult.rank,
        value: rankResult.value,
        categoryRoll: categoryResult.roll,
        rankRoll: rankResult.roll
    };
}

/**
 * Roll for Resources using base rank + Ability Modifier Table
 * @param {string} baseRankName - Starting rank ("Typical" for most, "Poor" for Alien)
 * @returns {object} - { baseRank, modifierRoll, modifier, modifierDescription, rank, value }
 */
function rollResourceRank(baseRankName) {
    const roll = rollD100();
    const modifierEntry = getAbilityModifier(roll);
    const finalRank = applyRankModifier(baseRankName, modifierEntry.modifier);

    return {
        baseRank: baseRankName,
        modifierRoll: roll,
        modifier: modifierEntry.modifier,
        modifierDescription: modifierEntry.description,
        rank: finalRank,
        value: getRankValue(finalRank)
    };
}

// Talent Rolling Functions

/**
 * Roll for a talent category
 * @returns {object} - { roll, category }
 */
function rollTalentCategory() {
    const roll = rollD100();
    const category = getTalentCategoryFromRoll(roll);

    return {
        roll: roll,
        category: category
    };
}

/**
 * Roll a complete random talent with all details
 * Rolls category (d100), then skill (d10), then optionally rank (Column 2)
 * @returns {object} - { category, name, categoryRoll, skillRoll, rank, value }
 */
function rollCompleteTalent() {
    const categoryResult = rollTalentCategory();
    const skillRoll = rollD10();
    const talentResult = getTalentFromRoll(categoryResult.category, skillRoll);

    let rank = null;
    let value = null;

    // If the skill is ranked, roll on Column 2 of the Random Ranks Table
    if (talentResult.ranked) {
        const rankRoll = rollD100();
        const rankResult = getRankFromRoll(rankRoll, 2); // Column 2 for talents
        rank = rankResult.name;
        value = rankResult.value;
    }

    return {
        category: categoryResult.category,
        name: talentResult.name,
        categoryRoll: categoryResult.roll,
        skillRoll: skillRoll,
        rank: rank,
        value: value
    };
}
