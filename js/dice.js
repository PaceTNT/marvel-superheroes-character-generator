// Dice Rolling Functions
function rollD100() {
    return Math.floor(Math.random() * 100) + 1;
}

function rollD10() {
    return Math.floor(Math.random() * 10) + 1;
}

function rollSuperheroName() {
    const adjective = getRandomSuperheroAdjective();
    let noun = getRandomSuperheroNoun();

    let attempts = 0;
    while (noun.toLowerCase() === adjective.toLowerCase() && attempts < 5) {
        noun = getRandomSuperheroNoun();
        attempts++;
    }

    const prefixed = rollD100() <= 33;
    const name = prefixed ? `The ${adjective} ${noun}` : `${adjective} ${noun}`;

    return { adjective, noun, prefixed, name };
}

function rollMundaneName() {
    const firstName = getRandomFirstName();
    const lastName = getRandomLastName();
    return { firstName, lastName, name: `${firstName} ${lastName}` };
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
 * Roll for Powers allocation
 * @returns {object} - { roll, initial, max }
 */
function rollPowersAllocation() {
    const roll = rollD100();
    const allocation = getAllocationFromRoll(roll);

    return {
        roll: roll,
        initial: allocation.powers.initial,
        max: allocation.powers.max
    };
}

/**
 * Roll for Talents allocation
 * @returns {object} - { roll, initial, max }
 */
function rollTalentsAllocation() {
    const roll = rollD100();
    const allocation = getAllocationFromRoll(roll);

    return {
        roll: roll,
        initial: allocation.talents.initial,
        max: allocation.talents.max
    };
}

/**
 * Roll for Contacts allocation
 * @returns {object} - { roll, initial, max }
 */
function rollContactsAllocation() {
    const roll = rollD100();
    const allocation = getAllocationFromRoll(roll);

    return {
        roll: roll,
        initial: allocation.contacts.initial,
        max: allocation.contacts.max
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
