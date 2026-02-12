// Ability Calculations
function calculateHealth(abilities) {
    return abilities.fighting.value +
           abilities.agility.value +
           abilities.strength.value +
           abilities.endurance.value;
}

function calculateKarma(abilities) {
    return abilities.reason.value +
           abilities.intuition.value +
           abilities.psyche.value;
}

/**
 * Calculate popularity based on base value and modifiers.
 * Rules:
 * - Base: 10 for most, 0 for Mutant/Robot
 * - +10 if identity is publicly known (no secret ID)
 * - -5 if identity is secret
 * - -5 if hero hangs out with known mutants (non-mutant only)
 * - -5 if hero is generally unpopular (aliens default, or player choice)
 * - Secret ID popularity cannot be negative (clamped to 0)
 */
function calculatePopularity(character) {
    const pop = character.secondaryAbilities.popularity;
    let total = pop.base;

    if (pop.hasSecretId) {
        total -= 5;
    } else {
        total += 10;
    }

    if (pop.hangsWithMutants && character.origin !== 'Mutant') {
        total -= 5;
    }

    if (pop.generallyUnpopular) {
        total -= 5;
    }

    pop.heroPopularity = total;

    if (pop.hasSecretId) {
        // Secret ID popularity cannot start negative
        pop.secretPopularity = Math.max(0, total);
    } else {
        pop.secretPopularity = null;
    }
}

function applyOriginModifiers(character) {
    const origin = character.origin;

    // Set base popularity by origin
    const pop = character.secondaryAbilities.popularity;
    switch(origin) {
        case "Mutant":
            // Endurance +1 rank
            const newEnduranceRank = getNextRank(character.primaryAbilities.endurance.rank);
            character.primaryAbilities.endurance.rank = newEnduranceRank;
            character.primaryAbilities.endurance.value = getRankValue(newEnduranceRank);

            // Mutant base popularity = 0
            pop.base = 0;
            // Note: Mutant Resources -1 rank is applied during resource rolling in Step 3
            break;

        case "Hi-Tech":
            // Reason +2 ranks
            const newReasonRank = getNextRank(character.primaryAbilities.reason.rank, 2);
            character.primaryAbilities.reason.rank = newReasonRank;
            character.primaryAbilities.reason.value = getRankValue(newReasonRank);
            // Note: Hi-Tech Resources handled in Step 3 (choice of Good or Typical + modifier)
            pop.base = 10;
            break;

        case "Robot":
            // Robot base popularity = 0
            pop.base = 0;
            break;

        case "Alien":
            // Note: Alien Resources (Poor + modifier) handled in Step 3
            pop.base = 10;
            // Aliens default to generally unpopular
            pop.generallyUnpopular = true;
            break;

        default:
            // Altered Human and others: base 10
            pop.base = 10;
            break;
    }

    // Calculate initial popularity
    calculatePopularity(character);

    return character;
}
