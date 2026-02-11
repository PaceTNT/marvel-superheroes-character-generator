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

function applyOriginModifiers(character) {
    const origin = character.origin;

    switch(origin) {
        case "Mutant":
            // Endurance +1 rank
            const newEnduranceRank = getNextRank(character.primaryAbilities.endurance.rank);
            character.primaryAbilities.endurance.rank = newEnduranceRank;
            character.primaryAbilities.endurance.value = getRankValue(newEnduranceRank);

            // Popularity = 0
            character.secondaryAbilities.popularity = 0;
            // Note: Mutant Resources -1 rank is applied during resource rolling in Step 3
            break;

        case "Hi-Tech":
            // Reason +2 ranks
            const newReasonRank = getNextRank(character.primaryAbilities.reason.rank, 2);
            character.primaryAbilities.reason.rank = newReasonRank;
            character.primaryAbilities.reason.value = getRankValue(newReasonRank);
            // Note: Hi-Tech Resources handled in Step 3 (choice of Good or Typical + modifier)
            break;

        case "Robot":
            // Popularity = 0
            character.secondaryAbilities.popularity = 0;
            break;

        case "Alien":
            // Note: Alien Resources (Poor + modifier) handled in Step 3
            break;
    }

    return character;
}
