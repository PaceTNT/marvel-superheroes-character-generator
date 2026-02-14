// UI Management

document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadCharacterFromLocalStorage();
});

function initializeEventListeners() {
    // Origin Selection
    document.getElementById('rollOrigin').addEventListener('click', handleRollOrigin);
    document.getElementById('confirmOrigin').addEventListener('click', handleConfirmOrigin);

    document.querySelectorAll('.origin-card').forEach(card => {
        card.addEventListener('click', () => handleSelectOrigin(card.dataset.origin));
    });

    // Abilities
    document.getElementById('rollAllAbilities').addEventListener('click', handleRollAllAbilities);
    document.getElementById('confirmAbilities')?.addEventListener('click', () => {
        // Require Altered Humans to select a boost ability before continuing
        if (currentCharacter.origin === 'Altered Human' && !currentCharacter.alteredHumanBoostAbility) {
            showAlertModal('Please choose one ability to raise by one rank before continuing.', 'Ability Boost Required');
            return;
        }
        applyOriginModifiers(currentCharacter);
        updateSecondaryAbilities();
        nextStep();
        setupResourcesUI();
        setupPopularityUI();
    });

    // Character Details
    document.getElementById('characterName')?.addEventListener('input', (e) => {
        currentCharacter.name = e.target.value;
        updateSummary();
    });

    document.getElementById('realName')?.addEventListener('input', (e) => {
        currentCharacter.realName = e.target.value;
        updateSummary();
    });

    document.getElementById('backstory')?.addEventListener('input', (e) => {
        currentCharacter.backstory = e.target.value;
    });

    // Image prompt options
    document.getElementById('genderAppearance')?.addEventListener('change', (e) => {
        currentCharacter.genderAppearance = e.target.value;
        saveCharacterToLocalStorage();
    });

    document.getElementById('primarySuitColor')?.addEventListener('input', (e) => {
        currentCharacter.primarySuitColor = e.target.value;
        document.getElementById('primaryColorLabel').textContent = e.target.value;
        saveCharacterToLocalStorage();
    });

    document.getElementById('secondarySuitColor')?.addEventListener('input', (e) => {
        currentCharacter.secondarySuitColor = e.target.value;
        document.getElementById('secondaryColorLabel').textContent = e.target.value;
        saveCharacterToLocalStorage();
    });

    // Powers, Talents, Contacts
    document.getElementById('rollAllocation')?.addEventListener('click', handleRollAllocation);
    document.getElementById('rollRandomPower')?.addEventListener('click', handleRollRandomPower);
    document.getElementById('choosePower')?.addEventListener('click', handleChoosePower);
    document.getElementById('confirmSpecialAbilities')?.addEventListener('click', () => {
        nextStep();
    });

    // Talents and Contacts
    document.getElementById('rollRandomTalent')?.addEventListener('click', handleRollRandomTalent);
    document.getElementById('chooseTalent')?.addEventListener('click', handleChooseTalent);
    document.getElementById('chooseContact')?.addEventListener('click', handleChooseContact);

    // Modal buttons
    document.getElementById('modalCancel')?.addEventListener('click', closeModal);
    document.getElementById('modalBack')?.addEventListener('click', handleModalBack);
    document.getElementById('powerDetailsClose')?.addEventListener('click', hidePowerDetailsModal);
    document.getElementById('talentDetailsClose')?.addEventListener('click', hideTalentDetailsModal);
    document.getElementById('contactDetailsClose')?.addEventListener('click', hideContactDetailsModal);
    document.getElementById('modalConfirm')?.addEventListener('click', handleModalConfirm);

    // Alert Modal
    document.getElementById('alertModalOk')?.addEventListener('click', hideAlertModal);

    // Confirm Modal
    document.getElementById('confirmModalCancel')?.addEventListener('click', hideConfirmModal);
    document.getElementById('confirmModalOk')?.addEventListener('click', () => {
        if (confirmModalCallback) confirmModalCallback();
        hideConfirmModal();
    });

    // Start Over
    document.getElementById('startOverBtn')?.addEventListener('click', showStartOverModal);
    document.getElementById('startOverCancel')?.addEventListener('click', hideStartOverModal);
    document.getElementById('startOverConfirm')?.addEventListener('click', () => {
        hideStartOverModal();
        resetCharacter();
    });
}

function handleRollOrigin() {
    const result = rollOrigin();
    currentCharacter.origin = result.origin;

    // Update UI
    document.querySelectorAll('.origin-card').forEach(card => {
        card.classList.remove('selected');
        if (card.dataset.origin === result.origin) {
            card.classList.add('selected');
        }
    });

    // Show both the roll result and origin description
    const originData = ORIGINS_DATA[result.origin];
    document.getElementById('originResult').innerHTML = `
        <h4>🎲 Rolled: ${result.roll}</h4>
        <h4>${result.origin}</h4>
        <p>${originData.description}</p>
        <p><em>Examples: ${originData.examples}</em></p>
        <p><strong>Modifiers:</strong></p>
        <ul>
            ${Object.entries(originData.modifiers).map(([key, value]) =>
                `<li>${key}: ${value}</li>`
            ).join('')}
        </ul>
    `;
    document.getElementById('originResult').classList.remove('hidden');
    document.getElementById('confirmOrigin').classList.remove('hidden');

    updateSummary();
}

function handleSelectOrigin(origin) {
    currentCharacter.origin = origin;

    // Update UI
    document.querySelectorAll('.origin-card').forEach(card => {
        card.classList.remove('selected');
        if (card.dataset.origin === origin) {
            card.classList.add('selected');
        }
    });

    // Show origin description
    const originData = ORIGINS_DATA[origin];
    document.getElementById('originResult').innerHTML = `
        <h4>${origin}</h4>
        <p>${originData.description}</p>
        <p><em>Examples: ${originData.examples}</em></p>
        <p><strong>Modifiers:</strong></p>
        <ul>
            ${Object.entries(originData.modifiers).map(([key, value]) =>
                `<li>${key}: ${value}</li>`
            ).join('')}
        </ul>
    `;
    document.getElementById('originResult').classList.remove('hidden');
    document.getElementById('confirmOrigin').classList.remove('hidden');

    updateSummary();
}

function handleConfirmOrigin() {
    nextStep();
}

function handleRollAllAbilities() {
    const abilities = ['fighting', 'agility', 'strength', 'endurance', 'reason', 'intuition', 'psyche'];

    abilities.forEach(ability => {
        const result = rollAbility(currentCharacter.origin);
        currentCharacter.primaryAbilities[ability] = {
            roll: result.roll,
            rank: result.rank,
            value: result.value
        };

        // Update table
        const row = document.querySelector(`tr[data-ability="${ability}"]`);
        row.querySelector('.roll-result').textContent = result.roll;
        row.querySelector('.rank-result').textContent = result.rank;
        row.querySelector('.value-result').textContent = result.value;
    });

    document.getElementById('confirmAbilities').classList.remove('hidden');

    // Show Altered Human ability boost selector
    showAlteredHumanBoostSelector();

    updateSummary();
}

function rerollAbility(abilityName) {
    const result = rollAbility(currentCharacter.origin);
    currentCharacter.primaryAbilities[abilityName] = {
        roll: result.roll,
        rank: result.rank,
        value: result.value
    };

    const row = document.querySelector(`tr[data-ability="${abilityName}"]`);
    row.querySelector('.roll-result').textContent = result.roll;
    row.querySelector('.rank-result').textContent = result.rank;
    row.querySelector('.value-result').textContent = result.value;

    // Refresh boost selector to reflect new rank values
    showAlteredHumanBoostSelector();

    updateSummary();
}

/**
 * Show the Altered Human ability boost selector in the origin modifier box.
 * Allows the player to choose one primary ability to raise by one rank.
 */
function showAlteredHumanBoostSelector() {
    const modifierBox = document.getElementById('originModifier');

    if (currentCharacter.origin !== 'Altered Human') {
        modifierBox.classList.add('hidden');
        currentCharacter.alteredHumanBoostAbility = null;
        return;
    }

    const abilities = [
        { key: 'fighting', label: 'Fighting (F)' },
        { key: 'agility', label: 'Agility (A)' },
        { key: 'strength', label: 'Strength (S)' },
        { key: 'endurance', label: 'Endurance (E)' },
        { key: 'reason', label: 'Reason (R)' },
        { key: 'intuition', label: 'Intuition (I)' },
        { key: 'psyche', label: 'Psyche (P)' }
    ];

    let html = '<h4>Altered Human Bonus</h4>';
    html += '<p>Choose one primary ability to raise by one rank:</p>';
    html += '<div class="boost-options">';
    abilities.forEach(a => {
        const ability = currentCharacter.primaryAbilities[a.key];
        const nextRank = getNextRank(ability.rank);
        const nextValue = getRankValue(nextRank);
        const isSelected = currentCharacter.alteredHumanBoostAbility === a.key;
        html += `<button class="boost-option${isSelected ? ' selected' : ''}" data-ability="${a.key}">
            ${a.label}: ${ability.rank} → ${nextRank} (${nextValue})
        </button>`;
    });
    html += '</div>';

    modifierBox.innerHTML = html;
    modifierBox.classList.remove('hidden');

    // Attach click handlers
    modifierBox.querySelectorAll('.boost-option').forEach(btn => {
        btn.addEventListener('click', () => {
            currentCharacter.alteredHumanBoostAbility = btn.dataset.ability;
            // Update selection styling
            modifierBox.querySelectorAll('.boost-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });
}

function updateSecondaryAbilities() {
    const health = calculateHealth(currentCharacter.primaryAbilities);
    const karma = calculateKarma(currentCharacter.primaryAbilities);

    currentCharacter.secondaryAbilities.health = health;
    currentCharacter.secondaryAbilities.karma = karma;

    document.getElementById('healthValue').textContent = health;
    document.getElementById('karmaValue').textContent = karma;

    updateSummary();
}

/**
 * Set up the Popularity UI in Step 3 based on the character's origin.
 * Shows checkboxes for Secret ID, mutant association, and generally unpopular.
 */
function setupPopularityUI() {
    const origin = currentCharacter.origin;
    const pop = currentCharacter.secondaryAbilities.popularity;

    // Show controls
    document.getElementById('popularityControls').classList.remove('hidden');

    // Hide "hangs with mutants" for mutants (doesn't apply)
    const mutantAssocOption = document.getElementById('mutantAssocOption');
    if (origin === 'Mutant') {
        mutantAssocOption.classList.add('hidden');
        pop.hangsWithMutants = false;
    } else {
        mutantAssocOption.classList.remove('hidden');
    }

    // Set default checkbox states based on origin
    const unpopularCheck = document.getElementById('unpopularCheck');
    if (origin === 'Alien') {
        unpopularCheck.checked = true;
        pop.generallyUnpopular = true;
    }

    // Sync checkboxes with character state
    document.getElementById('secretIdCheck').checked = pop.hasSecretId;
    document.getElementById('mutantAssocCheck').checked = pop.hangsWithMutants;
    unpopularCheck.checked = pop.generallyUnpopular;

    // Calculate and display
    updatePopularityDisplay();
}

/**
 * Handle changes to popularity modifier checkboxes.
 */
function handlePopularityChange() {
    const pop = currentCharacter.secondaryAbilities.popularity;

    pop.hasSecretId = document.getElementById('secretIdCheck').checked;
    pop.hangsWithMutants = document.getElementById('mutantAssocCheck').checked;
    pop.generallyUnpopular = document.getElementById('unpopularCheck').checked;

    calculatePopularity(currentCharacter);
    updatePopularityDisplay();
    updateSummary();
    saveCharacterToLocalStorage();
}

/**
 * Update the popularity display value and info text.
 */
function updatePopularityDisplay() {
    calculatePopularity(currentCharacter);
    const pop = currentCharacter.secondaryAbilities.popularity;

    let displayText;
    if (pop.hasSecretId) {
        displayText = `(${pop.heroPopularity})/(${pop.secretPopularity})`;
    } else {
        displayText = `${pop.heroPopularity}`;
    }

    document.getElementById('popularityValue').textContent = displayText;

    // Build info text showing breakdown
    const infoParts = [`Base: ${pop.base}`];
    if (pop.hasSecretId) {
        infoParts.push('Secret ID: -5');
    } else {
        infoParts.push('Public ID: +10');
    }
    if (pop.hangsWithMutants && currentCharacter.origin !== 'Mutant') {
        infoParts.push('Mutant assoc: -5');
    }
    if (pop.generallyUnpopular) {
        infoParts.push('Unpopular: -5');
    }

    const infoEl = document.getElementById('popularityInfo');
    infoEl.textContent = infoParts.join(' | ');
    infoEl.classList.remove('hidden');

    saveCharacterToLocalStorage();
}

/**
 * Set up the Resources UI in Step 3 based on the character's origin.
 * Shows Hi-Tech choice buttons or standard roll button + info text.
 */
function setupResourcesUI() {
    const origin = currentCharacter.origin;
    const normalControls = document.getElementById('normalResourceControls');
    const hiTechControls = document.getElementById('hiTechResourceControls');
    const infoEl = document.getElementById('resourcesInfo');

    if (origin === 'Hi-Tech') {
        normalControls.classList.add('hidden');
        hiTechControls.classList.remove('hidden');
        infoEl.textContent = 'Choose: Good (fixed) or Typical + Ability Modifier roll';
        infoEl.classList.remove('hidden');
    } else {
        normalControls.classList.remove('hidden');
        hiTechControls.classList.add('hidden');
        if (origin === 'Alien') {
            infoEl.textContent = 'Base: Poor + Ability Modifier roll';
        } else if (origin === 'Mutant') {
            infoEl.textContent = 'Base: Typical + Ability Modifier roll, then -1 rank';
        } else {
            infoEl.textContent = 'Base: Typical + Ability Modifier roll';
        }
        infoEl.classList.remove('hidden');
    }
}

/**
 * Roll Resources using the Ability Modifier Table.
 * Base rank is Typical (or Poor for Aliens). Mutants get -1 rank after.
 */
function rollResources() {
    const origin = currentCharacter.origin;
    const baseRank = (origin === 'Alien') ? 'Poor' : 'Typical';

    const result = rollResourceRank(baseRank);

    let finalRank = result.rank;
    let finalValue = result.value;
    let mutantPenalty = false;

    // Apply Mutant -1 rank penalty
    if (origin === 'Mutant') {
        finalRank = getPreviousRank(finalRank);
        finalValue = getRankValue(finalRank);
        mutantPenalty = true;
    }

    // Store as both base and current resources
    currentCharacter.secondaryAbilities.baseResources = { rank: finalRank, value: finalValue };
    currentCharacter.secondaryAbilities.resources = { rank: finalRank, value: finalValue };

    // Build display text
    let displayText = `${finalRank} (${finalValue})`;
    let detailParts = [`Base: ${baseRank}, Modifier roll: ${result.modifierRoll} (${result.modifierDescription})`];
    if (mutantPenalty) {
        detailParts.push('Mutant: -1 rank');
    }

    document.getElementById('resourcesValue').textContent = displayText;
    document.getElementById('resourcesInfo').textContent = detailParts.join(' | ');
    document.getElementById('resourcesInfo').classList.remove('hidden');

    updateSummary();
    saveCharacterToLocalStorage();
}

/**
 * Set Resources to Good (Hi-Tech fixed option).
 */
function setResourcesGood() {
    currentCharacter.secondaryAbilities.baseResources = { rank: 'Good', value: 8 };
    currentCharacter.secondaryAbilities.resources = { rank: 'Good', value: 8 };

    document.getElementById('resourcesValue').textContent = 'Good (8)';
    document.getElementById('resourcesInfo').textContent = 'Hi-Tech: Set to Good (fixed)';
    document.getElementById('resourcesInfo').classList.remove('hidden');

    updateSummary();
    saveCharacterToLocalStorage();
}

// ===== RESOURCE PURCHASING FUNCTIONS =====

/**
 * Get the effective slot limit for a category (initial + purchased).
 */
function getEffectiveLimit(details) {
    return details.initial + (details.purchased || 0);
}

/**
 * Calculate total rank cost of all purchases.
 */
function getTotalPurchaseCost() {
    return ((currentCharacter.powerDetails.purchased || 0) * 2) +
        (currentCharacter.talentDetails.purchased || 0) +
        (currentCharacter.contactDetails.purchased || 0);
}

/**
 * Check if a purchase of the given rank cost is affordable
 * (won't reduce Resources below Feeble).
 */
function canAffordPurchase(additionalRankCost) {
    const base = currentCharacter.secondaryAbilities.baseResources;
    if (!base) return false;

    const baseIndex = getRankIndex(base.rank);
    if (baseIndex === -1) return false;

    const newTotalCost = getTotalPurchaseCost() + additionalRankCost;
    return (baseIndex - newTotalCost) >= 0; // Feeble is index 0
}

/**
 * Recalculate current Resources based on baseResources minus purchase costs.
 */
function recalculateResources() {
    const base = currentCharacter.secondaryAbilities.baseResources;
    if (!base) return;

    const totalCost = getTotalPurchaseCost();

    if (totalCost === 0) {
        currentCharacter.secondaryAbilities.resources = { rank: base.rank, value: base.value };
    } else {
        const newRank = getPreviousRank(base.rank, totalCost);
        currentCharacter.secondaryAbilities.resources = {
            rank: newRank,
            value: getRankValue(newRank)
        };
    }
}

/**
 * Purchase an additional slot of the given type by reducing Resources.
 * @param {string} type - 'power', 'talent', or 'contact'
 */
function purchaseSlot(type) {
    const costMap = { power: 2, talent: 1, contact: 1 };
    const cost = costMap[type];

    // Get the relevant details object
    let details;
    if (type === 'power') details = currentCharacter.powerDetails;
    else if (type === 'talent') details = currentCharacter.talentDetails;
    else details = currentCharacter.contactDetails;

    // Check if already at max
    if (getEffectiveLimit(details) >= details.max) {
        showAlertModal(`Already at maximum ${type} slots!`, 'At Maximum');
        return;
    }

    // Check if we can afford it
    if (!canAffordPurchase(cost)) {
        showAlertModal('Not enough Resources! Cannot reduce below Feeble.', 'Insufficient Resources');
        return;
    }

    // Apply purchase
    details.purchased = (details.purchased || 0) + 1;

    // Recalculate resources
    recalculateResources();

    // Update all displays
    updatePurchaseSection();
    updatePowerSlotsDisplay();
    updateTalentSlotsDisplay();
    updateContactSlotsDisplay();
    updateResourcesValueDisplay();
    updateSummary();
    saveCharacterToLocalStorage();
}

/**
 * Update the purchasing section UI to reflect current state.
 */
function updatePurchaseSection() {
    const resources = currentCharacter.secondaryAbilities.resources;
    if (!resources) return;

    // Update displayed resources rank
    document.getElementById('purchaseResourcesRank').textContent = `${resources.rank} (${resources.value})`;

    // Show base info if purchases have been made
    const totalCost = getTotalPurchaseCost();
    const baseInfo = document.getElementById('purchaseBaseInfo');
    if (totalCost > 0) {
        const base = currentCharacter.secondaryAbilities.baseResources;
        baseInfo.textContent = `(was ${base.rank}, -${totalCost} rank${totalCost > 1 ? 's' : ''} from purchases)`;
    } else {
        baseInfo.textContent = '';
    }

    // Update current/max for each category
    const pd = currentCharacter.powerDetails;
    const td = currentCharacter.talentDetails;
    const cd = currentCharacter.contactDetails;

    document.getElementById('purchasePowerCurrent').textContent = getEffectiveLimit(pd);
    document.getElementById('purchasePowerMax').textContent = pd.max;
    document.getElementById('purchaseTalentCurrent').textContent = getEffectiveLimit(td);
    document.getElementById('purchaseTalentMax').textContent = td.max;
    document.getElementById('purchaseContactCurrent').textContent = getEffectiveLimit(cd);
    document.getElementById('purchaseContactMax').textContent = cd.max;

    // Disable buttons that can't be used
    document.getElementById('purchasePowerBtn').disabled =
        getEffectiveLimit(pd) >= pd.max || !canAffordPurchase(2);
    document.getElementById('purchaseTalentBtn').disabled =
        getEffectiveLimit(td) >= td.max || !canAffordPurchase(1);
    document.getElementById('purchaseContactBtn').disabled =
        getEffectiveLimit(cd) >= cd.max || !canAffordPurchase(1);
}

/**
 * Update the Resources value display in Step 3 to reflect purchase deductions.
 */
function updateResourcesValueDisplay() {
    const resources = currentCharacter.secondaryAbilities.resources;
    if (resources) {
        document.getElementById('resourcesValue').textContent = `${resources.rank} (${resources.value})`;
    }
}

function showStep(stepNumber) {
    // Update step indicator
    document.querySelectorAll('.step-indicator .step').forEach((step, index) => {
        step.classList.remove('active');
        if (index + 1 === stepNumber) {
            step.classList.add('active');
        }
        if (index + 1 < stepNumber) {
            step.classList.add('completed');
        } else {
            step.classList.remove('completed');
        }
    });

    // Update panels
    document.querySelectorAll('.step-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(`step${stepNumber}`).classList.add('active');

    currentStep = stepNumber;
}

function nextStep() {
    if (currentStep < 5) {
        showStep(currentStep + 1);
    }
}

function previousStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

function updateSummary() {
    const summary = document.getElementById('characterSummary');

    let html = '';

    if (currentCharacter.name) {
        html += `<h3>${currentCharacter.name}</h3>`;
    }

    if (currentCharacter.origin) {
        html += `<p><strong>Origin:</strong> ${currentCharacter.origin}</p>`;
    }

    if (currentCharacter.primaryAbilities.fighting) {
        html += '<h4>Primary Abilities</h4>';
        html += '<ul>';
        for (const [key, ability] of Object.entries(currentCharacter.primaryAbilities)) {
            if (ability) {
                html += `<li><strong>${key.toUpperCase()[0]}:</strong> ${ability.rank} (${ability.value})</li>`;
            }
        }
        html += '</ul>';
    }

    if (currentCharacter.secondaryAbilities.health > 0) {
        html += '<h4>Secondary Abilities</h4>';
        html += `<p><strong>Health:</strong> ${currentCharacter.secondaryAbilities.health}</p>`;
        html += `<p><strong>Karma:</strong> ${currentCharacter.secondaryAbilities.karma}</p>`;
        if (currentCharacter.secondaryAbilities.resources) {
            html += `<p><strong>Resources:</strong> ${currentCharacter.secondaryAbilities.resources.rank}</p>`;
        }
        const pop = currentCharacter.secondaryAbilities.popularity;
        if (pop && typeof pop === 'object') {
            if (pop.hasSecretId) {
                html += `<p><strong>Popularity:</strong> (${pop.heroPopularity})/(${pop.secretPopularity})</p>`;
            } else {
                html += `<p><strong>Popularity:</strong> ${pop.heroPopularity}</p>`;
            }
        } else {
            html += `<p><strong>Popularity:</strong> ${pop}</p>`;
        }
    }

    // Battlesuit bonuses
    if (currentCharacter.battlesuit) {
        html += '<h4>Battle-Suit</h4>';
        html += '<p style="font-size: 0.85em; color: var(--primary-color, #0066cc);">FASE bonuses from suit:</p>';
        html += '<ul style="font-size: 0.85em;">';
        const abilityLabels = { fighting: 'F', agility: 'A', strength: 'S', endurance: 'E' };
        for (const [ability, label] of Object.entries(abilityLabels)) {
            const mod = currentCharacter.battlesuit.modifiers[ability];
            if (mod.modifier !== 0) {
                const sign = mod.modifier > 0 ? '+' : '';
                html += `<li><strong>${label}:</strong> ${sign}${mod.modifier} rank(s)</li>`;
            }
        }
        html += '</ul>';
    }

    // Powers
    if (currentCharacter.powerDetails && currentCharacter.powerDetails.list.length > 0) {
        html += '<h4>Powers</h4>';
        html += '<ul style="font-size: 0.9em;">';
        currentCharacter.powerDetails.list.forEach(power => {
            const suitTag = currentCharacter.battlesuit ? ' [Suit]' : '';
            const subtypeText = power.subtype ? ` (${power.subtype})` : '';
            const bonusText = power.isBonusPower ? ' [Bonus]' : '';
            html += `<li>${power.name}${subtypeText}${power.starred ? ' ⭐⭐' : ''}${bonusText} - ${power.rank}${suitTag}</li>`;
        });
        html += '</ul>';
    }

    // Talents
    if (currentCharacter.talentDetails && currentCharacter.talentDetails.list.length > 0) {
        html += '<h4>Talents</h4>';
        html += '<ul style="font-size: 0.9em;">';
        currentCharacter.talentDetails.list.forEach(talent => {
            const rankText = talent.rank ? ` - ${talent.rank}` : '';
            html += `<li>${talent.name}${rankText}</li>`;
        });
        html += '</ul>';
    }

    // Contacts
    if (currentCharacter.contactDetails && currentCharacter.contactDetails.list.length > 0) {
        html += '<h4>Contacts</h4>';
        html += '<ul style="font-size: 0.9em;">';
        currentCharacter.contactDetails.list.forEach(contact => {
            html += `<li>${contact.type}: ${contact.name}</li>`;
        });
        html += '</ul>';
    }

    summary.innerHTML = html || '<p class="empty-state">Start creating your character...</p>';
}

function generateCharacterSheet() {
    // Update character with final details
    currentCharacter.name = document.getElementById('characterName').value;
    currentCharacter.realName = document.getElementById('realName').value;
    currentCharacter.backstory = document.getElementById('backstory').value;

    // Equipment (still free-form)
    currentCharacter.equipment = document.getElementById('equipmentInput').value.split('\n').filter(e => e.trim());

    // Image prompt options
    currentCharacter.genderAppearance = document.getElementById('genderAppearance').value;
    currentCharacter.primarySuitColor = document.getElementById('primarySuitColor').value;
    currentCharacter.secondarySuitColor = document.getElementById('secondarySuitColor').value;

    // Powers, talents, contacts are already tracked in their Details objects

    // Popularity display helper
    const popularityDisplay = (() => {
        const p = currentCharacter.secondaryAbilities.popularity;
        if (p && typeof p === 'object') {
            return p.hasSecretId ? `(${p.heroPopularity})/(${p.secretPopularity})` : p.heroPopularity;
        }
        return p;
    })();

    // Show final summary
    let html = `
        <h2>${currentCharacter.name || 'Unnamed Hero'}</h2>
        <p><em>${currentCharacter.realName || 'Unknown Identity'}</em> &mdash; ${currentCharacter.origin}</p>

        <div class="sheet-abilities-grid">
            <div class="sheet-abilities-primary">
                <h4>Primary Abilities</h4>
                <table>
                    <tr><td><strong>Fighting</strong></td><td>${currentCharacter.primaryAbilities.fighting.rank} (${currentCharacter.primaryAbilities.fighting.value})</td></tr>
                    <tr><td><strong>Agility</strong></td><td>${currentCharacter.primaryAbilities.agility.rank} (${currentCharacter.primaryAbilities.agility.value})</td></tr>
                    <tr><td><strong>Strength</strong></td><td>${currentCharacter.primaryAbilities.strength.rank} (${currentCharacter.primaryAbilities.strength.value})</td></tr>
                    <tr><td><strong>Endurance</strong></td><td>${currentCharacter.primaryAbilities.endurance.rank} (${currentCharacter.primaryAbilities.endurance.value})</td></tr>
                    <tr><td><strong>Reason</strong></td><td>${currentCharacter.primaryAbilities.reason.rank} (${currentCharacter.primaryAbilities.reason.value})</td></tr>
                    <tr><td><strong>Intuition</strong></td><td>${currentCharacter.primaryAbilities.intuition.rank} (${currentCharacter.primaryAbilities.intuition.value})</td></tr>
                    <tr><td><strong>Psyche</strong></td><td>${currentCharacter.primaryAbilities.psyche.rank} (${currentCharacter.primaryAbilities.psyche.value})</td></tr>
                </table>
            </div>
            <div class="sheet-abilities-secondary">
                <h4>Secondary Abilities</h4>
                <table>
                    <tr><td><strong>Health</strong></td><td>${currentCharacter.secondaryAbilities.health}</td></tr>
                    <tr><td><strong>Karma</strong></td><td>${currentCharacter.secondaryAbilities.karma}</td></tr>
                    <tr><td><strong>Resources</strong></td><td>${currentCharacter.secondaryAbilities.resources ? currentCharacter.secondaryAbilities.resources.rank : 'N/A'}</td></tr>
                    <tr><td><strong>Popularity</strong></td><td>${popularityDisplay}</td></tr>
                </table>
            </div>
        </div>

        ${currentCharacter.battlesuit ? `<h4>Battle-Suit</h4>
            <p>All powers are combined into an artificial battle-suit.</p>
            <table class="power-detail-table">
                <thead><tr><th>Ability</th><th>Roll</th><th>Modifier</th><th>Before Suit</th><th>With Suit</th></tr></thead>
                <tbody>
                ${['fighting', 'agility', 'strength', 'endurance'].map(a => {
                    const mod = currentCharacter.battlesuit.modifiers[a];
                    const orig = currentCharacter.battlesuit.originalAbilities[a];
                    const curr = currentCharacter.primaryAbilities[a];
                    return `<tr><td>${a.charAt(0).toUpperCase() + a.slice(1)}</td><td>${mod.roll}</td><td>${mod.description}</td><td>${orig.rank} (${orig.value})</td><td>${curr.rank} (${curr.value})</td></tr>`;
                }).join('')}
                </tbody>
            </table>` : ''}

        ${currentCharacter.powerDetails.list.length ? `
            <h4>Powers</h4>
            <div class="sheet-powers-summary">
                <table>
                    <thead><tr><th>Power</th><th>Rank</th><th>Value</th><th>Category</th></tr></thead>
                    <tbody>
                    ${currentCharacter.powerDetails.list.map(p => `<tr><td>${p.name}${p.starred ? ' ⭐⭐' : ''}</td><td>${p.rank}</td><td>${p.value}</td><td>${p.category}</td></tr>`).join('')}
                    </tbody>
                </table>
            </div>` : ''}

        ${currentCharacter.talentDetails.list.length ? `
            <h4>Talents</h4>
            <div class="sheet-talents-summary">
                <table>
                    <thead><tr><th>Talent</th><th>Rank</th><th>Category</th></tr></thead>
                    <tbody>
                    ${currentCharacter.talentDetails.list.map(t => `<tr><td>${t.name}</td><td>${t.rank ? `${t.rank} (${t.value})` : '—'}</td><td>${t.category}</td></tr>`).join('')}
                    </tbody>
                </table>
            </div>` : ''}

        ${currentCharacter.contactDetails.list.length ? `
            <h4>Contacts</h4>
            <div class="sheet-contacts-summary">
                <table>
                    <thead><tr><th>Name</th><th>Type</th><th>Category</th></tr></thead>
                    <tbody>
                    ${currentCharacter.contactDetails.list.map(c => `<tr><td>${c.name}</td><td>${c.type}</td><td>${c.category}</td></tr>`).join('')}
                    </tbody>
                </table>
            </div>` : ''}

        ${currentCharacter.equipment.length ? `<h4>Equipment</h4><ul>${currentCharacter.equipment.map(e => `<li>${e}</li>`).join('')}</ul>` : ''}

        ${currentCharacter.backstory ? `<h4>Backstory</h4><p>${currentCharacter.backstory}</p>` : ''}

        ${currentCharacter.powerDetails.list.length ? `
            <div class="sheet-section-details sheet-power-details">
                <h4>Power Details</h4>
                ${currentCharacter.powerDetails.list.map(p => {
                    const details = typeof POWER_DETAILS_DATA !== 'undefined' ? POWER_DETAILS_DATA[p.name] : null;
                    return `<div class="sheet-power-block">
                        <h5>${p.name}${p.starred ? ' ⭐⭐' : ''} — ${p.rank} (${p.value})</h5>
                        ${details ? renderPowerDetailsHTML(details) : '<p class="empty-state">No detailed description available.</p>'}
                    </div>`;
                }).join('')}
            </div>` : ''}

        ${currentCharacter.talentDetails.list.length ? `
            <div class="sheet-section-details sheet-talent-details">
                <h4>Talent Details</h4>
                ${currentCharacter.talentDetails.list.map(t => {
                    const tDetails = typeof TALENT_DETAILS_DATA !== 'undefined' ? TALENT_DETAILS_DATA[t.name] : null;
                    return `<div class="sheet-talent-block">
                        <h5>${t.name}${t.rank ? ` — ${t.rank} (${t.value})` : ''}</h5>
                        ${tDetails ? renderTalentDetailsHTML(tDetails) : '<p class="empty-state">No detailed description available.</p>'}
                    </div>`;
                }).join('')}
            </div>` : ''}

        ${currentCharacter.contactDetails.list.length ? `
            <div class="sheet-section-details">
                <h4>Contact Details</h4>
                ${currentCharacter.contactDetails.list.map(c => {
                    const cDetails = typeof CONTACT_DETAILS_DATA !== 'undefined' ? CONTACT_DETAILS_DATA[c.type] : null;
                    return `<div class="sheet-contact-block">
                        <h5>${c.name} — ${c.type}</h5>
                        ${cDetails ? renderContactDetailsHTML(cDetails) : '<p class="empty-state">No detailed description available.</p>'}
                    </div>`;
                }).join('')}
            </div>` : ''}
    `;

    document.getElementById('characterSummary').innerHTML = html;
    document.getElementById('exportButtons').classList.remove('hidden');

    // Generate and display the image prompt
    const imagePrompt = generateImagePrompt();
    document.getElementById('imagePromptOutput').value = imagePrompt;
    document.getElementById('imagePromptSection').classList.remove('hidden');

    saveCharacterToLocalStorage();
}

function exportJSON() {
    const dataStr = JSON.stringify(currentCharacter, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentCharacter.name || 'character'}.json`;
    link.click();
}

function printCharacter() {
    window.print();
}

function updateUI() {
    updateSummary();
    if (currentCharacter.primaryAbilities.fighting) {
        updateSecondaryAbilities();
    }
}

// ===== POWERS, TALENTS, AND CONTACTS FUNCTIONS =====

// Modal state
let modalState = {
    mode: null, // 'category' | 'power' | 'talent-category' | 'talent-skill' | 'contact-category' | 'contact-type' | 'contact-name'
    selectedCategory: null,
    selectedPower: null,
    selectedTalent: null,
    selectedContactType: null,
    selectedContactCategory: null,
    context: null // 'power' | 'talent' | 'contact'
};

/**
 * Handle allocation roll for powers/talents/contacts
 */
function handleRollAllocation() {
    const result = rollAllocation();

    // Update character data
    currentCharacter.powerDetails.roll = result.roll;
    currentCharacter.powerDetails.initial = result.powers.initial;
    currentCharacter.powerDetails.max = result.powers.max;
    currentCharacter.powerDetails.purchased = 0;
    currentCharacter.powerDetails.current = 0;
    currentCharacter.powerDetails.list = []; // Clear existing powers

    // Revert battlesuit if active (powers are being cleared)
    if (currentCharacter.battlesuit) {
        revertBattlesuit();
    }

    currentCharacter.talentDetails.roll = result.roll;
    currentCharacter.talentDetails.initial = result.talents.initial;
    currentCharacter.talentDetails.max = result.talents.max;
    currentCharacter.talentDetails.purchased = 0;
    currentCharacter.talentDetails.list = []; // Clear existing talents

    currentCharacter.contactDetails.roll = result.roll;
    currentCharacter.contactDetails.initial = result.contacts.initial;
    currentCharacter.contactDetails.max = result.contacts.max;
    currentCharacter.contactDetails.purchased = 0;
    currentCharacter.contactDetails.list = []; // Clear existing contacts

    // Apply Alien contact cap: maximum 1 contact
    if (currentCharacter.origin === 'Alien') {
        currentCharacter.contactDetails.max = Math.min(currentCharacter.contactDetails.max, 1);
        currentCharacter.contactDetails.initial = Math.min(currentCharacter.contactDetails.initial, 1);
    }

    // Reset resources to base (undo any previous purchases)
    if (currentCharacter.secondaryAbilities.baseResources) {
        const base = currentCharacter.secondaryAbilities.baseResources;
        currentCharacter.secondaryAbilities.resources = { rank: base.rank, value: base.value };
    }

    // Update UI
    document.getElementById('allocationRoll').textContent = result.roll;
    document.getElementById('powersInitial').textContent = currentCharacter.powerDetails.initial;
    document.getElementById('powersMax').textContent = currentCharacter.powerDetails.max;
    document.getElementById('talentsInitial').textContent = currentCharacter.talentDetails.initial;
    document.getElementById('talentsMax').textContent = currentCharacter.talentDetails.max;
    document.getElementById('contactsInitial').textContent = currentCharacter.contactDetails.initial;
    document.getElementById('contactsMax').textContent = currentCharacter.contactDetails.max;

    // Also update the counters in each section
    document.getElementById('powerSlotsInitial').textContent = currentCharacter.powerDetails.initial;
    document.getElementById('powerSlotsMax').textContent = currentCharacter.powerDetails.max;
    document.getElementById('talentSlotsInitial').textContent = currentCharacter.talentDetails.initial;
    document.getElementById('talentSlotsMax').textContent = currentCharacter.talentDetails.max;
    document.getElementById('contactSlotsInitial').textContent = currentCharacter.contactDetails.initial;
    document.getElementById('contactSlotsMax').textContent = currentCharacter.contactDetails.max;

    // Show result box and sections
    document.getElementById('allocationResult').classList.remove('hidden');
    document.getElementById('powersSection').classList.remove('hidden');
    document.getElementById('talentsSection').classList.remove('hidden');
    document.getElementById('contactsSection').classList.remove('hidden');
    document.getElementById('equipmentSection').classList.remove('hidden');
    document.getElementById('confirmSpecialAbilities').classList.remove('hidden');

    // Show purchasing section if resources have been set
    if (currentCharacter.secondaryAbilities.baseResources) {
        document.getElementById('purchaseSection').classList.remove('hidden');
        updatePurchaseSection();
    }

    // Update slots displays
    updatePowerSlotsDisplay();
    updateTalentSlotsDisplay();
    updateContactSlotsDisplay();

    // Clear and render lists
    renderPowersList();
    renderTalentsList();
    renderContactsList();

    // Clear equipment
    document.getElementById('equipmentInput').value = '';

    saveCharacterToLocalStorage();
}

/**
 * Handle rolling a random power
 */
function handleRollRandomPower() {
    // Check if we can add more powers
    const effectivePowerLimit = getEffectiveLimit(currentCharacter.powerDetails);
    if (currentCharacter.powerDetails.current >= effectivePowerLimit) {
        showAlertModal('You have reached your available power slots! Purchase more in the section above, or you\'re at maximum.', 'Power Slots Full');
        return;
    }

    // Roll a complete power
    const power = rollCompletePower();

    // Enforce minimum rank if applicable
    const enforced = applyMinimumRank(power.rank, power.name, currentCharacter.primaryAbilities);
    power.rank = enforced.rank;
    power.value = enforced.value;

    // Check if this power would exceed the limit
    const slotsNeeded = power.starred ? 2 : 1;
    if (currentCharacter.powerDetails.current + slotsNeeded > effectivePowerLimit) {
        showAlertModal(`Cannot add this power: it costs ${slotsNeeded} slot(s) but you only have ${effectivePowerLimit - currentCharacter.powerDetails.current} slot(s) remaining.`, 'Not Enough Slots');
        return;
    }

    // Add power to character (with bonus power prompts)
    addPowerWithPrompts(power);
}

/**
 * Handle choosing a power manually
 */
function handleChoosePower() {
    // Check if we can add more powers
    const effectivePowerLimit = getEffectiveLimit(currentCharacter.powerDetails);
    if (currentCharacter.powerDetails.current >= effectivePowerLimit) {
        showAlertModal('You have reached your available power slots! Purchase more in the section above, or you\'re at maximum.', 'Power Slots Full');
        return;
    }

    // Open modal for category selection
    modalState.mode = 'category';
    modalState.selectedCategory = null;
    modalState.selectedPower = null;

    showCategorySelection();
}

/**
 * Show category selection in modal
 */
function showCategorySelection() {
    const modal = document.getElementById('powerModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalBack = document.getElementById('modalBack');
    const modalConfirm = document.getElementById('modalConfirm');

    modalTitle.textContent = 'Choose Power Category';
    modalBack.classList.add('hidden');
    modalConfirm.classList.add('hidden');

    // Build category options
    let html = '';
    const categories = getAllCategories();
    categories.forEach(categoryName => {
        const categoryData = POWERS_DATA.categories.find(c => c.name === categoryName);
        html += `
            <div class="category-option" data-category="${categoryName}">
                <div class="category-name">${categoryName}</div>
                <div class="category-range">Roll ${categoryData.roll[0]}-${categoryData.roll[1]}</div>
            </div>
        `;
    });

    modalBody.innerHTML = html;

    // Add click handlers
    document.querySelectorAll('.category-option').forEach(option => {
        option.addEventListener('click', () => {
            // Deselect all
            document.querySelectorAll('.category-option').forEach(opt => opt.classList.remove('selected'));
            // Select this one
            option.classList.add('selected');
            modalState.selectedCategory = option.dataset.category;

            // Show the powers in this category
            showPowerSelection(modalState.selectedCategory);
        });
    });

    modal.classList.add('active');
}

/**
 * Show power selection in modal for a specific category
 */
function showPowerSelection(categoryName) {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalBack = document.getElementById('modalBack');
    const modalConfirm = document.getElementById('modalConfirm');

    modalState.mode = 'power';
    modalTitle.textContent = `Choose Power: ${categoryName}`;
    modalBack.classList.remove('hidden');
    modalConfirm.classList.add('hidden');
    modalConfirm.textContent = 'Add Power';

    // Build power options
    let html = '';
    const powers = getPowersInCategory(categoryName);
    powers.forEach((power, index) => {
        const starredText = power.starred ? ' ⭐⭐' : '';
        const costText = power.starred ? '(Costs 2 slots)' : '(Costs 1 slot)';
        let extraInfo = '';
        if (power.bonus) {
            extraInfo = ` | Bonus: ${power.bonus}`;
        }
        if (power.name === 'Extra Body Parts - Offensive') {
            extraInfo = ' | Choose subtype';
        }
        html += `
            <div class="power-option" data-power-index="${index}">
                <div class="power-option-name">${power.name}${starredText}</div>
                <div class="power-option-details">${costText}${extraInfo}</div>
            </div>
        `;
    });

    modalBody.innerHTML = html;

    // Add click handlers
    document.querySelectorAll('.power-option').forEach(option => {
        option.addEventListener('click', () => {
            // Deselect all
            document.querySelectorAll('.power-option').forEach(opt => opt.classList.remove('selected'));
            // Select this one
            option.classList.add('selected');
            const powerIndex = parseInt(option.dataset.powerIndex);
            modalState.selectedPower = powers[powerIndex];
            modalConfirm.classList.remove('hidden');
        });
    });
}

/**
 * Handle modal back button
 */
function handleModalBack() {
    if (modalState.mode === 'power') {
        showCategorySelection();
    } else if (modalState.mode === 'talent-skill') {
        showTalentCategorySelection();
    } else if (modalState.mode === 'contact-type') {
        showContactCategorySelection();
    } else if (modalState.mode === 'contact-name') {
        showContactTypeSelection(modalState.selectedContactCategory);
    }
}

/**
 * Handle modal confirm button
 */
function handleModalConfirm() {
    if (modalState.mode === 'power' && modalState.selectedPower) {
        // Check if power would exceed limit
        const slotsNeeded = modalState.selectedPower.starred ? 2 : 1;
        const effectivePowerLimit = getEffectiveLimit(currentCharacter.powerDetails);
        if (currentCharacter.powerDetails.current + slotsNeeded > effectivePowerLimit) {
            showAlertModal(`Cannot add this power: it costs ${slotsNeeded} slot(s) but you only have ${effectivePowerLimit - currentCharacter.powerDetails.current} slot(s) remaining.`, 'Not Enough Slots');
            return;
        }

        // Roll rank for the power, enforcing minimum rank if applicable
        const rankResult = rollPowerRank();
        const enforced = applyMinimumRank(rankResult.rank, modalState.selectedPower.name, currentCharacter.primaryAbilities);

        // Create power object
        const power = {
            name: modalState.selectedPower.name,
            category: modalState.selectedCategory,
            rank: enforced.rank,
            value: enforced.value,
            starred: modalState.selectedPower.starred,
            bonus: modalState.selectedPower.bonus
        };

        // Add to character (with bonus power prompts)
        closeModal();
        addPowerWithPrompts(power);

    } else if (modalState.mode === 'talent-skill' && modalState.selectedTalent) {
        // Roll rank if the talent is ranked (Column 2)
        let rank = null;
        let value = null;
        if (modalState.selectedTalent.ranked) {
            const rankRoll = rollD100();
            const rankResult = getRankFromRoll(rankRoll, 2);
            rank = rankResult.name;
            value = rankResult.value;
        }

        const talent = {
            name: modalState.selectedTalent.name,
            category: modalState.selectedCategory,
            rank: rank,
            value: value
        };

        addTalentToCharacter(talent);
        closeModal();

    } else if (modalState.mode === 'contact-name') {
        const nameInput = document.getElementById('contactNameInput');
        const contactName = nameInput ? nameInput.value.trim() : '';
        if (!contactName) {
            showAlertModal('Please enter a name for your contact.', 'Name Required');
            return;
        }

        const contact = {
            type: modalState.selectedContactType,
            category: modalState.selectedContactCategory,
            name: contactName
        };

        addContactToCharacter(contact);
        closeModal();
    }
}

/**
 * Close modal
 */
function closeModal() {
    document.getElementById('powerModal').classList.remove('active');
    modalState = {
        mode: null,
        selectedCategory: null,
        selectedPower: null,
        selectedTalent: null,
        selectedContactType: null,
        selectedContactCategory: null,
        context: null
    };
}

/**
 * Add a power to the character and update UI
 */
function addPowerToCharacter(power) {
    // Add to character
    currentCharacter.powerDetails.list.push(power);

    // Update current slot count
    const slotsUsed = calculatePowerSlots(currentCharacter.powerDetails.list);
    currentCharacter.powerDetails.current = slotsUsed;

    // Update UI
    renderPowersList();
    updatePowerSlotsDisplay();
    updateSummary();
    saveCharacterToLocalStorage();

    // Check for Hi-Tech + Body Armor => offer battlesuit
    if (power.name === 'Body Armor' && currentCharacter.origin === 'Hi-Tech' && !currentCharacter.battlesuit) {
        showBattlesuitPrompt();
    }
}

/**
 * Add a power to the character with prompts for Extra Body Parts subtypes and bonus powers.
 * This is the main entry point for adding powers (replaces direct addPowerToCharacter calls).
 */
function addPowerWithPrompts(power) {
    if (power.name === 'Extra Body Parts - Offensive') {
        // Show subtype selection before adding the power
        showExtraBodyPartsSelection(power, (selectedSubtype) => {
            power.subtype = selectedSubtype.name;
            power.subtypeNotes = selectedSubtype.notes || null;
            // Set the bonus from the selected subtype
            power.bonus = selectedSubtype.bonusPower || null;
            addPowerToCharacter(power);
            offerBonusPower(power);
        });
    } else {
        addPowerToCharacter(power);
        offerBonusPower(power);
    }
}

/**
 * Check if a power has a bonus and offer it to the player if slots remain.
 */
function offerBonusPower(power) {
    if (!power.bonus) return;

    const effectiveLimit = getEffectiveLimit(currentCharacter.powerDetails);
    const slotsRemaining = effectiveLimit - currentCharacter.powerDetails.current;
    if (slotsRemaining < 1) return;

    if (power.bonus === 'Any Resistance') {
        showResistanceSelection(power.name, (resistanceName) => {
            const bonusPower = createBonusPower(resistanceName, 'Resistances');
            addPowerToCharacter(bonusPower);
        });
    } else if (power.bonus === 'Enhanced Senses or any detection Power') {
        showDetectionPowerSelection(power.name, (powerName) => {
            const bonusPower = createBonusPower(powerName, 'Senses');
            addPowerToCharacter(bonusPower);
        });
    } else {
        const bonusCategory = findCategoryForPower(power.bonus) || power.category;
        showBonusPowerConfirm(power.name, power.bonus, () => {
            const bonusPower = createBonusPower(power.bonus, bonusCategory);
            addPowerToCharacter(bonusPower);
        });
    }
}

/**
 * Create a bonus power object with a rolled rank.
 */
function createBonusPower(powerName, category) {
    const rankResult = rollPowerRank();
    const enforced = applyMinimumRank(rankResult.rank, powerName, currentCharacter.primaryAbilities);
    // Look up if this power is starred
    const powers = POWERS_DATA.powersList[category] || [];
    const powerData = powers.find(p => p.name === powerName);
    const starred = powerData ? powerData.starred : false;

    return {
        name: powerName,
        category: category,
        rank: enforced.rank,
        value: enforced.value,
        starred: starred,
        bonus: null,
        isBonusPower: true
    };
}

/**
 * Show Extra Body Parts subtype selection modal.
 */
function showExtraBodyPartsSelection(mainPower, onSelect) {
    const modal = document.getElementById('bonusPowerModal');
    const title = document.getElementById('bonusPowerModalTitle');
    const body = document.getElementById('bonusPowerModalBody');
    const oldConfirm = document.getElementById('bonusPowerModalConfirm');
    const oldCancel = document.getElementById('bonusPowerModalCancel');

    title.textContent = 'Extra Body Parts - Choose Type';

    const subtypes = POWER_DETAILS_DATA['Extra Body Parts - Offensive']?.subtypes || [];

    let html = '<div class="power-detail-section">';
    html += '<p>Choose which type of extra body part your hero has:</p>';
    html += '</div>';
    html += '<div class="bonus-power-options">';
    subtypes.forEach((subtype, index) => {
        const bonusText = subtype.bonusPower
            ? `<div class="bonus-power-tag">Bonus: ${subtype.bonusPower}</div>`
            : '';
        const notesText = subtype.notes
            ? `<div class="bonus-power-notes">${subtype.notes}</div>`
            : '';
        html += `
            <div class="bonus-power-option" data-index="${index}">
                <div class="bonus-power-option-name">${subtype.name}</div>
                ${bonusText}
                ${notesText}
            </div>
        `;
    });
    html += '</div>';
    body.innerHTML = html;

    // Clone buttons to remove old listeners, then configure
    const confirmBtn = oldConfirm.cloneNode(true);
    const cancelBtn = oldCancel.cloneNode(true);
    oldConfirm.parentNode.replaceChild(confirmBtn, oldConfirm);
    oldCancel.parentNode.replaceChild(cancelBtn, oldCancel);

    confirmBtn.textContent = 'Select';
    confirmBtn.classList.add('hidden');
    cancelBtn.textContent = 'Cancel';

    let selectedIndex = null;

    // Add click handlers for options (using the new confirmBtn reference)
    body.querySelectorAll('.bonus-power-option').forEach(option => {
        option.addEventListener('click', () => {
            body.querySelectorAll('.bonus-power-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            selectedIndex = parseInt(option.dataset.index);
            confirmBtn.classList.remove('hidden');
        });
    });

    confirmBtn.addEventListener('click', () => {
        if (selectedIndex !== null) {
            modal.classList.remove('active');
            onSelect(subtypes[selectedIndex]);
        }
    });

    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        // Still add the power without a subtype
        mainPower.subtype = null;
        mainPower.bonus = null;
        addPowerToCharacter(mainPower);
    });

    modal.classList.add('active');
}

/**
 * Show a confirmation prompt for a standard bonus power (yes/no).
 */
function showBonusPowerConfirm(mainPowerName, bonusPowerName, onAccept) {
    const modal = document.getElementById('bonusPowerModal');
    const title = document.getElementById('bonusPowerModalTitle');
    const body = document.getElementById('bonusPowerModalBody');
    const oldConfirm = document.getElementById('bonusPowerModalConfirm');
    const oldCancel = document.getElementById('bonusPowerModalCancel');

    title.textContent = 'Bonus Power Available!';

    body.innerHTML = `
        <div class="power-detail-section">
            <p><strong>${mainPowerName}</strong> includes a bonus power: <strong>${bonusPowerName}</strong></p>
            <p>Would you like to add it? This will use 1 additional power slot.</p>
        </div>
    `;

    // Clone buttons to remove old listeners, then configure
    const confirmBtn = oldConfirm.cloneNode(true);
    const cancelBtn = oldCancel.cloneNode(true);
    oldConfirm.parentNode.replaceChild(confirmBtn, oldConfirm);
    oldCancel.parentNode.replaceChild(cancelBtn, oldCancel);

    confirmBtn.textContent = 'Add Bonus Power';
    confirmBtn.classList.remove('hidden');
    cancelBtn.textContent = 'No Thanks';

    confirmBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        onAccept();
    });

    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.classList.add('active');
}

/**
 * Show resistance selection for "Any Resistance" bonus power.
 */
function showResistanceSelection(mainPowerName, onSelect) {
    const modal = document.getElementById('bonusPowerModal');
    const title = document.getElementById('bonusPowerModalTitle');
    const body = document.getElementById('bonusPowerModalBody');
    const oldConfirm = document.getElementById('bonusPowerModalConfirm');
    const oldCancel = document.getElementById('bonusPowerModalCancel');

    title.textContent = 'Bonus Power: Choose Resistance';

    const resistances = getResistancePowers();
    const resistancePowers = POWERS_DATA.powersList["Resistances"] || [];

    let html = '<div class="power-detail-section">';
    html += `<p><strong>${mainPowerName}</strong> grants a bonus Resistance power. Choose which one (costs 1 power slot):</p>`;
    html += '</div>';
    html += '<div class="bonus-power-options">';
    resistances.forEach((name, index) => {
        const powerData = resistancePowers.find(p => p.name === name);
        const costText = powerData && powerData.starred ? ' (2 slots)' : '';
        html += `
            <div class="bonus-power-option" data-index="${index}">
                <div class="bonus-power-option-name">${name}${costText}</div>
            </div>
        `;
    });
    html += '</div>';
    body.innerHTML = html;

    // Clone buttons to remove old listeners, then configure
    const confirmBtn = oldConfirm.cloneNode(true);
    const cancelBtn = oldCancel.cloneNode(true);
    oldConfirm.parentNode.replaceChild(confirmBtn, oldConfirm);
    oldCancel.parentNode.replaceChild(cancelBtn, oldCancel);

    confirmBtn.textContent = 'Add Resistance';
    confirmBtn.classList.add('hidden');
    cancelBtn.textContent = 'No Thanks';

    let selectedIndex = null;

    body.querySelectorAll('.bonus-power-option').forEach(option => {
        option.addEventListener('click', () => {
            body.querySelectorAll('.bonus-power-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            selectedIndex = parseInt(option.dataset.index);
            confirmBtn.classList.remove('hidden');
        });
    });

    confirmBtn.addEventListener('click', () => {
        if (selectedIndex !== null) {
            const selectedName = resistances[selectedIndex];
            const powerData = resistancePowers.find(p => p.name === selectedName);
            const slotsNeeded = powerData && powerData.starred ? 2 : 1;
            const effectiveLimit = getEffectiveLimit(currentCharacter.powerDetails);
            const slotsRemaining = effectiveLimit - currentCharacter.powerDetails.current;
            if (slotsNeeded > slotsRemaining) {
                showAlertModal(`${selectedName} costs ${slotsNeeded} slot(s) but you only have ${slotsRemaining} remaining.`, 'Not Enough Slots');
                return;
            }
            modal.classList.remove('active');
            onSelect(selectedName);
        }
    });

    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.classList.add('active');
}

/**
 * Show detection/sense power selection for "Enhanced Senses or any detection Power" bonus.
 */
function showDetectionPowerSelection(mainPowerName, onSelect) {
    const modal = document.getElementById('bonusPowerModal');
    const title = document.getElementById('bonusPowerModalTitle');
    const body = document.getElementById('bonusPowerModalBody');
    const oldConfirm = document.getElementById('bonusPowerModalConfirm');
    const oldCancel = document.getElementById('bonusPowerModalCancel');

    title.textContent = 'Bonus Power: Choose Sense/Detection';

    const powers = getDetectionAndSensePowers();
    const sensesPowers = POWERS_DATA.powersList["Senses"] || [];

    let html = '<div class="power-detail-section">';
    html += `<p><strong>${mainPowerName}</strong> grants a bonus sense or detection power. Choose which one:</p>`;
    html += '</div>';
    html += '<div class="bonus-power-options">';
    powers.forEach((name, index) => {
        const powerData = sensesPowers.find(p => p.name === name);
        const costText = powerData && powerData.starred ? ' (2 slots)' : '';
        html += `
            <div class="bonus-power-option" data-index="${index}">
                <div class="bonus-power-option-name">${name}${costText}</div>
            </div>
        `;
    });
    html += '</div>';
    body.innerHTML = html;

    // Clone buttons to remove old listeners, then configure
    const confirmBtn = oldConfirm.cloneNode(true);
    const cancelBtn = oldCancel.cloneNode(true);
    oldConfirm.parentNode.replaceChild(confirmBtn, oldConfirm);
    oldCancel.parentNode.replaceChild(cancelBtn, oldCancel);

    confirmBtn.textContent = 'Add Power';
    confirmBtn.classList.add('hidden');
    cancelBtn.textContent = 'No Thanks';

    let selectedIndex = null;

    body.querySelectorAll('.bonus-power-option').forEach(option => {
        option.addEventListener('click', () => {
            body.querySelectorAll('.bonus-power-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            selectedIndex = parseInt(option.dataset.index);
            confirmBtn.classList.remove('hidden');
        });
    });

    confirmBtn.addEventListener('click', () => {
        if (selectedIndex !== null) {
            const selectedName = powers[selectedIndex];
            const powerData = sensesPowers.find(p => p.name === selectedName);
            const slotsNeeded = powerData && powerData.starred ? 2 : 1;
            const effectiveLimit = getEffectiveLimit(currentCharacter.powerDetails);
            const slotsRemaining = effectiveLimit - currentCharacter.powerDetails.current;
            if (slotsNeeded > slotsRemaining) {
                showAlertModal(`${selectedName} costs ${slotsNeeded} slot(s) but you only have ${slotsRemaining} remaining.`, 'Not Enough Slots');
                return;
            }
            modal.classList.remove('active');
            onSelect(selectedName);
        }
    });

    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.classList.add('active');
}

/**
 * Remove a power from the character
 */
function removePowerFromCharacter(index) {
    const power = currentCharacter.powerDetails.list[index];
    const isBattlesuitArmor = power && power.name === 'Body Armor' && currentCharacter.battlesuit;
    const confirmMsg = isBattlesuitArmor
        ? 'Remove Body Armor? This will also remove your battle-suit and revert FASE bonuses.'
        : 'Remove this power?';

    showConfirmModal(confirmMsg, 'Remove Power', () => {
        // Revert battlesuit if removing Body Armor
        if (isBattlesuitArmor) {
            revertBattlesuit();
        }

        currentCharacter.powerDetails.list.splice(index, 1);

        // Update current slot count
        const slotsUsed = calculatePowerSlots(currentCharacter.powerDetails.list);
        currentCharacter.powerDetails.current = slotsUsed;

        // Update UI
        renderPowersList();
        updatePowerSlotsDisplay();
        updateSummary();
        saveCharacterToLocalStorage();
    });
}

/**
 * Render the powers list
 */
function renderPowersList() {
    const powersList = document.getElementById('powersList');

    if (currentCharacter.powerDetails.list.length === 0) {
        powersList.innerHTML = '<p class="empty-state">No powers added yet. Click "Roll Random Power" or "Choose Power" to begin.</p>';
        return;
    }

    const hasBattlesuit = !!currentCharacter.battlesuit;

    let html = '';
    currentCharacter.powerDetails.list.forEach((power, index) => {
        const starredIndicator = power.starred ? ' <span class="power-starred">⭐⭐</span>' : '';
        const escapedName = power.name.replace(/'/g, "\\'");
        const battlesuitTag = (hasBattlesuit && power.name === 'Body Armor')
            ? ' <span class="battlesuit-tag">BATTLE-SUIT</span>'
            : (hasBattlesuit ? ' <span class="battlesuit-equipped-tag">[In Suit]</span>' : '');
        const subtypeTag = power.subtype
            ? ` <span class="power-subtype-tag">(${power.subtype})</span>`
            : '';
        const bonusTag = power.isBonusPower
            ? ' <span class="bonus-power-indicator">BONUS</span>'
            : '';
        html += `
            <div class="power-card${hasBattlesuit && power.name === 'Body Armor' ? ' battlesuit-card' : ''}">
                <div class="power-info">
                    <div class="power-name">${power.name}${subtypeTag}${starredIndicator}${bonusTag}${battlesuitTag}</div>
                    <div class="power-details">
                        Category: ${power.category} |
                        Rank: ${power.rank} (${power.value})
                    </div>
                </div>
                <div class="power-actions">
                    <button class="btn btn-secondary btn-small" onclick="showPowerDetailsModal('${escapedName}')">📖 Details</button>
                    <button class="btn btn-warning btn-small" onclick="removePowerFromCharacter(${index})">🗑️ Remove</button>
                </div>
            </div>
        `;
    });

    powersList.innerHTML = html;
}

/**
 * Update power slots display
 */
function updatePowerSlotsDisplay() {
    const slotsUsed = currentCharacter.powerDetails.current;
    const effectiveSlots = getEffectiveLimit(currentCharacter.powerDetails);
    const slotsMax = currentCharacter.powerDetails.max;

    document.getElementById('powerSlotsUsed').textContent = slotsUsed;
    document.getElementById('powerSlotsInitial').textContent = effectiveSlots;
    document.getElementById('powerSlotsMax').textContent = slotsMax;
}

// ===== TALENT FUNCTIONS =====

/**
 * Handle rolling a random talent
 */
function handleRollRandomTalent() {
    const effectiveTalentLimit = getEffectiveLimit(currentCharacter.talentDetails);
    if (currentCharacter.talentDetails.list.length >= effectiveTalentLimit) {
        showAlertModal('You have reached your available talent slots! Purchase more in the section above, or you\'re at maximum.', 'Talent Slots Full');
        return;
    }

    const result = rollCompleteTalent();

    const talent = {
        name: result.name,
        category: result.category,
        rank: result.rank,
        value: result.value
    };

    addTalentToCharacter(talent);
}

/**
 * Handle choosing a talent manually
 */
function handleChooseTalent() {
    const effectiveTalentLimit = getEffectiveLimit(currentCharacter.talentDetails);
    if (currentCharacter.talentDetails.list.length >= effectiveTalentLimit) {
        showAlertModal('You have reached your available talent slots! Purchase more in the section above, or you\'re at maximum.', 'Talent Slots Full');
        return;
    }

    modalState.context = 'talent';
    modalState.mode = 'talent-category';
    modalState.selectedCategory = null;
    modalState.selectedTalent = null;

    showTalentCategorySelection();
}

/**
 * Show talent category selection in modal
 */
function showTalentCategorySelection() {
    const modal = document.getElementById('powerModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalBack = document.getElementById('modalBack');
    const modalConfirm = document.getElementById('modalConfirm');

    modalState.mode = 'talent-category';
    modalTitle.textContent = 'Choose Talent Category';
    modalBack.classList.add('hidden');
    modalConfirm.classList.add('hidden');

    let html = '';
    const categories = getAllTalentCategories();
    categories.forEach(categoryName => {
        const categoryData = TALENTS_DATA.categories.find(c => c.name === categoryName);
        html += `
            <div class="category-option" data-category="${categoryName}">
                <div class="category-name">${categoryName}</div>
                <div class="category-range">Roll ${categoryData.roll[0]}-${categoryData.roll[1]}</div>
            </div>
        `;
    });

    modalBody.innerHTML = html;

    document.querySelectorAll('.category-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.category-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            modalState.selectedCategory = option.dataset.category;
            showTalentSkillSelection(modalState.selectedCategory);
        });
    });

    modal.classList.add('active');
}

/**
 * Show talent skill selection in modal for a specific category
 */
function showTalentSkillSelection(categoryName) {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalBack = document.getElementById('modalBack');
    const modalConfirm = document.getElementById('modalConfirm');

    modalState.mode = 'talent-skill';
    modalTitle.textContent = `Choose Talent: ${categoryName}`;
    modalBack.classList.remove('hidden');
    modalConfirm.classList.add('hidden');
    modalConfirm.textContent = 'Add Talent';

    const skills = getSkillsInCategory(categoryName);
    let html = '';
    skills.forEach((skill, index) => {
        const rankedText = skill.ranked ? ' *' : '';
        const rankedDetail = skill.ranked ? '(Rank rolled on Column 2)' : '';
        html += `
            <div class="power-option" data-skill-index="${index}">
                <div class="power-option-name">${skill.name}${rankedText}</div>
                <div class="power-option-details">${rankedDetail}</div>
            </div>
        `;
    });

    modalBody.innerHTML = html;

    document.querySelectorAll('.power-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.power-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            const skillIndex = parseInt(option.dataset.skillIndex);
            modalState.selectedTalent = skills[skillIndex];
            modalConfirm.classList.remove('hidden');
        });
    });
}

/**
 * Add a talent to the character and update UI
 */
function addTalentToCharacter(talent) {
    currentCharacter.talentDetails.list.push(talent);
    currentCharacter.talents = currentCharacter.talentDetails.list.map(t => t.name);

    renderTalentsList();
    updateTalentSlotsDisplay();
    updateSummary();
    saveCharacterToLocalStorage();
}

/**
 * Remove a talent from the character
 */
function removeTalentFromCharacter(index) {
    showConfirmModal('Remove this talent?', 'Remove Talent', () => {
        currentCharacter.talentDetails.list.splice(index, 1);
        currentCharacter.talents = currentCharacter.talentDetails.list.map(t => t.name);

        renderTalentsList();
        updateTalentSlotsDisplay();
        updateSummary();
        saveCharacterToLocalStorage();
    });
}

/**
 * Render the talents list
 */
function renderTalentsList() {
    const talentsList = document.getElementById('talentsList');

    if (currentCharacter.talentDetails.list.length === 0) {
        talentsList.innerHTML = '<p class="empty-state">No talents added yet. Click "Roll Random Talent" or "Choose Talent" to begin.</p>';
        return;
    }

    let html = '';
    currentCharacter.talentDetails.list.forEach((talent, index) => {
        const rankedIndicator = talent.rank ? ' *' : '';
        const rankText = talent.rank ? ` | Rank: ${talent.rank} (${talent.value})` : '';
        const escapedName = talent.name.replace(/'/g, "\\'");
        html += `
            <div class="talent-card">
                <div class="talent-info">
                    <div class="talent-name">${talent.name}${rankedIndicator}</div>
                    <div class="talent-details">
                        Category: ${talent.category}${rankText}
                    </div>
                </div>
                <div class="talent-actions">
                    <button class="btn btn-secondary btn-small" onclick="showTalentDetailsModal('${escapedName}')">📖 Details</button>
                    <button class="btn btn-warning btn-small" onclick="removeTalentFromCharacter(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    talentsList.innerHTML = html;
}

/**
 * Update talent slots display
 */
function updateTalentSlotsDisplay() {
    const slotsUsed = currentCharacter.talentDetails.list.length;
    const effectiveSlots = getEffectiveLimit(currentCharacter.talentDetails);
    const slotsMax = currentCharacter.talentDetails.max;

    document.getElementById('talentSlotsUsed').textContent = slotsUsed;
    document.getElementById('talentSlotsInitial').textContent = effectiveSlots;
    document.getElementById('talentSlotsMax').textContent = slotsMax;
}

// ===== CONTACT FUNCTIONS =====

/**
 * Handle choosing a contact
 */
function handleChooseContact() {
    const effectiveContactLimit = getEffectiveLimit(currentCharacter.contactDetails);
    if (currentCharacter.contactDetails.list.length >= effectiveContactLimit) {
        showAlertModal('You have reached your available contact slots! Purchase more in the section above, or you\'re at maximum.', 'Contact Slots Full');
        return;
    }

    modalState.context = 'contact';
    modalState.mode = 'contact-category';
    modalState.selectedContactCategory = null;
    modalState.selectedContactType = null;

    showContactCategorySelection();
}

/**
 * Show contact category selection in modal
 */
function showContactCategorySelection() {
    const modal = document.getElementById('powerModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalBack = document.getElementById('modalBack');
    const modalConfirm = document.getElementById('modalConfirm');

    modalState.mode = 'contact-category';
    modalTitle.textContent = 'Choose Contact Category';
    modalBack.classList.add('hidden');
    modalConfirm.classList.add('hidden');

    let html = '';
    const categories = getAllContactCategories();
    categories.forEach(categoryName => {
        const count = getContactsInCategory(categoryName).length;
        html += `
            <div class="category-option" data-category="${categoryName}">
                <div class="category-name">${categoryName}</div>
                <div class="category-range">${count} contact types</div>
            </div>
        `;
    });

    modalBody.innerHTML = html;

    document.querySelectorAll('.category-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.category-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            modalState.selectedContactCategory = option.dataset.category;
            showContactTypeSelection(modalState.selectedContactCategory);
        });
    });

    modal.classList.add('active');
}

/**
 * Show contact type selection in modal
 */
function showContactTypeSelection(categoryName) {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalBack = document.getElementById('modalBack');
    const modalConfirm = document.getElementById('modalConfirm');

    modalState.mode = 'contact-type';
    modalTitle.textContent = `Choose Contact Type: ${categoryName}`;
    modalBack.classList.remove('hidden');
    modalConfirm.classList.add('hidden');

    const types = getContactsInCategory(categoryName);
    let html = '';
    types.forEach((type, index) => {
        html += `
            <div class="power-option" data-type-index="${index}">
                <div class="power-option-name">${type}</div>
            </div>
        `;
    });

    modalBody.innerHTML = html;

    document.querySelectorAll('.power-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.power-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            const typeIndex = parseInt(option.dataset.typeIndex);
            modalState.selectedContactType = types[typeIndex];
            showContactNameInput();
        });
    });
}

/**
 * Show contact name input in modal
 */
function showContactNameInput() {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalBack = document.getElementById('modalBack');
    const modalConfirm = document.getElementById('modalConfirm');

    modalState.mode = 'contact-name';
    modalTitle.textContent = 'Name Your Contact';
    modalBack.classList.remove('hidden');
    modalConfirm.classList.remove('hidden');
    modalConfirm.textContent = 'Add Contact';

    modalBody.innerHTML = `
        <p style="margin-bottom: 15px;"><strong>Contact Type:</strong> ${modalState.selectedContactType} (${modalState.selectedContactCategory})</p>
        <div class="form-group" style="margin: 0;">
            <label>Contact Name</label>
            <input type="text" id="contactNameInput" placeholder="e.g., Fred Duncan" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 1em;">
        </div>
    `;

    // Focus the input
    const input = document.getElementById('contactNameInput');
    setTimeout(() => input.focus(), 100);

    // Allow Enter key to confirm
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            handleModalConfirm();
        }
    });
}

/**
 * Add a contact to the character and update UI
 */
function addContactToCharacter(contact) {
    currentCharacter.contactDetails.list.push(contact);
    currentCharacter.contacts = currentCharacter.contactDetails.list.map(c => `${c.type}: ${c.name}`);

    renderContactsList();
    updateContactSlotsDisplay();
    updateSummary();
    saveCharacterToLocalStorage();
}

/**
 * Remove a contact from the character
 */
function removeContactFromCharacter(index) {
    showConfirmModal('Remove this contact?', 'Remove Contact', () => {
        currentCharacter.contactDetails.list.splice(index, 1);
        currentCharacter.contacts = currentCharacter.contactDetails.list.map(c => `${c.type}: ${c.name}`);

        renderContactsList();
        updateContactSlotsDisplay();
        updateSummary();
        saveCharacterToLocalStorage();
    });
}

/**
 * Render the contacts list
 */
function renderContactsList() {
    const contactsList = document.getElementById('contactsList');

    if (currentCharacter.contactDetails.list.length === 0) {
        contactsList.innerHTML = '<p class="empty-state">No contacts added yet. Click "Choose Contact" to begin.</p>';
        return;
    }

    let html = '';
    currentCharacter.contactDetails.list.forEach((contact, index) => {
        const escapedType = contact.type.replace(/'/g, "\\'");
        html += `
            <div class="contact-card">
                <div class="contact-info">
                    <div class="contact-name">${contact.name}</div>
                    <div class="contact-details">
                        Type: ${contact.type} | Category: ${contact.category}
                    </div>
                </div>
                <div class="contact-actions">
                    <button class="btn btn-secondary btn-small" onclick="showContactDetailsModal('${escapedType}')">📖 Details</button>
                    <button class="btn btn-warning btn-small" onclick="removeContactFromCharacter(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    contactsList.innerHTML = html;
}

/**
 * Update contact slots display
 */
function updateContactSlotsDisplay() {
    const slotsUsed = currentCharacter.contactDetails.list.length;
    const effectiveSlots = getEffectiveLimit(currentCharacter.contactDetails);
    const slotsMax = currentCharacter.contactDetails.max;

    document.getElementById('contactSlotsUsed').textContent = slotsUsed;
    document.getElementById('contactSlotsInitial').textContent = effectiveSlots;
    document.getElementById('contactSlotsMax').textContent = slotsMax;
}

// ===== POWER DETAILS MODAL =====

/**
 * Show the power details modal for a given power name.
 * Uses the POWER_DETAILS_DATA global loaded via script tag.
 */
function showPowerDetailsModal(powerName) {
    const power = POWER_DETAILS_DATA[powerName];

    const title = document.getElementById('powerDetailsTitle');
    const body = document.getElementById('powerDetailsBody');

    title.textContent = powerName;

    if (!power) {
        body.innerHTML = '<p class="empty-state">No detailed description available for this power.</p>';
    } else {
        body.innerHTML = renderPowerDetailsHTML(power);
    }

    document.getElementById('powerDetailsModal').classList.add('active');
}

/**
 * Hide the power details modal
 */
function hidePowerDetailsModal() {
    document.getElementById('powerDetailsModal').classList.remove('active');
}

/**
 * Render the HTML content for a power's details
 */
function renderPowerDetailsHTML(power) {
    let html = '';

    // Description
    if (power.description) {
        html += `<div class="power-detail-section"><p>${power.description}</p></div>`;
    }

    // Example (single string)
    if (power.example) {
        html += `<div class="power-detail-section power-detail-example"><strong>Example:</strong> ${power.example}</div>`;
    }

    // Examples (array of strings)
    if (power.examples && power.examples.length > 0) {
        html += `<div class="power-detail-section power-detail-example"><strong>Examples:</strong><ul>`;
        power.examples.forEach(ex => { html += `<li>${ex}</li>`; });
        html += `</ul></div>`;
    }

    // Notes
    if (power.notes) {
        html += `<div class="power-detail-section power-detail-notes"><strong>Notes:</strong> ${power.notes}</div>`;
    }

    // Minimum Rank
    if (power.minimumRank) {
        html += `<div class="power-detail-section"><strong>Minimum Rank:</strong> ${power.minimumRank}</div>`;
    }

    // Effective Rank
    if (power.effectiveRank) {
        html += `<div class="power-detail-section"><strong>Effective Rank:</strong> ${power.effectiveRank}</div>`;
    }

    // Battle Suit
    if (power.battleSuit) {
        html += `<div class="power-detail-section power-detail-notes"><strong>Battle Suit:</strong> ${power.battleSuit}</div>`;
    }

    // Bonus Power
    if (power.bonusPower) {
        html += `<div class="power-detail-section"><strong>Bonus Power:</strong> ${power.bonusPower}</div>`;
    }

    // Related Power
    if (power.relatedPower) {
        html += `<div class="power-detail-section"><strong>Related Power:</strong> ${power.relatedPower}</div>`;
    }

    // Subtypes
    if (power.subtypes && power.subtypes.length > 0) {
        html += `<div class="power-detail-section"><strong>Subtypes:</strong><ul>`;
        power.subtypes.forEach(sub => {
            let text = sub.name;
            if (sub.bonusPower) text += ` (Bonus: ${sub.bonusPower})`;
            if (sub.notes) text += ` &mdash; ${sub.notes}`;
            html += `<li>${text}</li>`;
        });
        html += `</ul></div>`;
    }

    // Power Stunts
    if (power.powerStunts && power.powerStunts.length > 0) {
        html += `<div class="power-detail-section"><strong>Power Stunts:</strong><ul>`;
        power.powerStunts.forEach(stunt => { html += `<li>${stunt}</li>`; });
        html += `</ul></div>`;
    }

    // Limitations
    if (power.limitations && power.limitations.length > 0) {
        html += `<div class="power-detail-section"><strong>Limitations:</strong><ul>`;
        power.limitations.forEach(limit => { html += `<li>${limit}</li>`; });
        html += `</ul></div>`;
    }

    // Effects
    if (power.effects) {
        html += `<div class="power-detail-section"><strong>Effects:</strong><ul>`;
        for (const [key, value] of Object.entries(power.effects)) {
            html += `<li><strong>${key}:</strong> ${value}</li>`;
        }
        html += `</ul></div>`;
    }

    // Emotion Types
    if (power.emotionTypes && power.emotionTypes.length > 0) {
        html += `<div class="power-detail-section"><strong>Emotion Types:</strong><ul>`;
        power.emotionTypes.forEach(emotion => { html += `<li>${emotion}</li>`; });
        html += `</ul></div>`;
    }

    // Eligible Talents
    if (power.eligibleTalents && power.eligibleTalents.length > 0) {
        html += `<div class="power-detail-section"><strong>Eligible Talents:</strong><ul>`;
        power.eligibleTalents.forEach(talent => { html += `<li>${talent}</li>`; });
        html += `</ul></div>`;
    }

    // Table
    if (power.table) {
        html += `<div class="power-detail-section">`;
        if (power.table.title) html += `<strong>${power.table.title}</strong>`;
        html += `<table class="power-detail-table">`;
        if (power.table.columns) {
            html += `<thead><tr>`;
            power.table.columns.forEach(col => { html += `<th>${col}</th>`; });
            html += `</tr></thead>`;
        }
        if (power.table.rows) {
            html += `<tbody>`;
            power.table.rows.forEach(row => {
                html += `<tr>`;
                row.forEach(cell => { html += `<td>${cell}</td>`; });
                html += `</tr>`;
            });
            html += `</tbody>`;
        }
        html += `</table></div>`;
    }

    return html;
}

// ===== TALENT DETAILS MODAL =====

/**
 * Show the talent details modal for a given talent name.
 * Uses the TALENT_DETAILS_DATA global loaded via script tag.
 */
function showTalentDetailsModal(talentName) {
    const talent = typeof TALENT_DETAILS_DATA !== 'undefined' ? TALENT_DETAILS_DATA[talentName] : null;

    const title = document.getElementById('talentDetailsTitle');
    const body = document.getElementById('talentDetailsBody');

    title.textContent = talentName;

    if (!talent) {
        body.innerHTML = '<p class="empty-state">No detailed description available for this talent.</p>';
    } else {
        body.innerHTML = renderTalentDetailsHTML(talent);
    }

    document.getElementById('talentDetailsModal').classList.add('active');
}

/**
 * Hide the talent details modal
 */
function hideTalentDetailsModal() {
    document.getElementById('talentDetailsModal').classList.remove('active');
}

/**
 * Render the HTML content for a talent's details
 */
function renderTalentDetailsHTML(talent) {
    let html = '';

    // Description
    if (talent.description) {
        html += `<div class="power-detail-section"><p>${talent.description}</p></div>`;
    }

    // Notes
    if (talent.notes) {
        html += `<div class="power-detail-section power-detail-notes"><strong>Notes:</strong> ${talent.notes}</div>`;
    }

    // Effects
    if (talent.effects) {
        html += `<div class="power-detail-section"><strong>Effects:</strong><ul>`;
        for (const [key, value] of Object.entries(talent.effects)) {
            html += `<li><strong>${key}:</strong> ${value}</li>`;
        }
        html += `</ul></div>`;
    }

    return html;
}

// ===== CONTACT DETAILS MODAL =====

/**
 * Show the contact details modal for a given contact type name.
 * Uses the CONTACT_DETAILS_DATA global loaded via script tag.
 */
function showContactDetailsModal(contactType) {
    const contact = typeof CONTACT_DETAILS_DATA !== 'undefined' ? CONTACT_DETAILS_DATA[contactType] : null;

    const title = document.getElementById('contactDetailsTitle');
    const body = document.getElementById('contactDetailsBody');

    title.textContent = contactType;

    if (!contact) {
        body.innerHTML = '<p class="empty-state">No detailed description available for this contact type.</p>';
    } else {
        body.innerHTML = renderContactDetailsHTML(contact);
    }

    document.getElementById('contactDetailsModal').classList.add('active');
}

/**
 * Hide the contact details modal
 */
function hideContactDetailsModal() {
    document.getElementById('contactDetailsModal').classList.remove('active');
}

/**
 * Render the HTML content for a contact's details
 */
function renderContactDetailsHTML(contact) {
    let html = '';

    // Description
    if (contact.description) {
        html += `<div class="power-detail-section"><p>${contact.description}</p></div>`;
    }

    // Example
    if (contact.example) {
        html += `<div class="power-detail-section power-detail-example"><strong>Example:</strong> ${contact.example}</div>`;
    }

    // Notes
    if (contact.notes) {
        html += `<div class="power-detail-section power-detail-notes"><strong>Notes:</strong> ${contact.notes}</div>`;
    }

    return html;
}

// ===== BATTLESUIT FUNCTIONS (Hi-Tech + Body Armor) =====

/**
 * Show the battlesuit prompt modal for Hi-Tech heroes who gain Body Armor.
 */
function showBattlesuitPrompt() {
    const modal = document.getElementById('battlesuitModal');
    const body = document.getElementById('battlesuitModalBody');
    const yesBtn = document.getElementById('battlesuitModalYes');
    const noBtn = document.getElementById('battlesuitModalNo');
    const closeBtn = document.getElementById('battlesuitModalClose');

    document.getElementById('battlesuitModalTitle').textContent = 'Battle-Suit Option';

    body.innerHTML = `
        <div class="power-detail-section">
            <p>As a <strong>Hi-Tech</strong> hero with <strong>Body Armor</strong>, you may choose to combine all your powers into a <strong>battle-suit</strong> (a la Iron Man).</p>
            <p>All of your other Powers will be included in the suit, and the suit is considered <em>artificial</em> Body Armor.</p>
            <p>You will roll on the <strong>Ability Modifier Table</strong> for each physical ability (Fighting, Agility, Strength, Endurance) to determine potential bonuses when wearing the suit.</p>
        </div>
    `;

    yesBtn.classList.remove('hidden');
    noBtn.classList.remove('hidden');
    closeBtn.classList.add('hidden');

    // Remove old listeners by cloning
    const newYes = yesBtn.cloneNode(true);
    const newNo = noBtn.cloneNode(true);
    yesBtn.parentNode.replaceChild(newYes, yesBtn);
    noBtn.parentNode.replaceChild(newNo, noBtn);

    newYes.addEventListener('click', () => {
        applyBattlesuit();
    });

    newNo.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.classList.add('active');
}

/**
 * Roll FASE bonuses on the Ability Modifier Table and apply them.
 * Stores original abilities so they can be reverted if Body Armor is removed.
 */
function applyBattlesuit() {
    const faseAbilities = ['fighting', 'agility', 'strength', 'endurance'];

    // Store original FASE values before battlesuit
    const originalAbilities = {};
    faseAbilities.forEach(ability => {
        originalAbilities[ability] = {
            rank: currentCharacter.primaryAbilities[ability].rank,
            value: currentCharacter.primaryAbilities[ability].value
        };
    });

    // Roll on Ability Modifier Table for each FASE ability
    const modifiers = {};
    faseAbilities.forEach(ability => {
        const roll = rollD100();
        const entry = getAbilityModifier(roll);
        modifiers[ability] = {
            roll: roll,
            modifier: entry.modifier,
            description: entry.description
        };

        // Apply the modifier
        if (entry.modifier !== 0) {
            const newRank = applyRankModifier(currentCharacter.primaryAbilities[ability].rank, entry.modifier);
            currentCharacter.primaryAbilities[ability].rank = newRank;
            currentCharacter.primaryAbilities[ability].value = getRankValue(newRank);
        }
    });

    // Store battlesuit data
    currentCharacter.battlesuit = {
        modifiers: modifiers,
        originalAbilities: originalAbilities
    };

    // Recalculate Health since FASE changed
    updateSecondaryAbilities();

    // Show results in the modal
    showBattlesuitResults(modifiers, originalAbilities);

    // Update all displays
    updateAbilitiesTable();
    renderPowersList();
    updateSummary();
    saveCharacterToLocalStorage();
}

/**
 * Show the battlesuit roll results in the modal.
 */
function showBattlesuitResults(modifiers, originalAbilities) {
    const body = document.getElementById('battlesuitModalBody');
    const yesBtn = document.getElementById('battlesuitModalYes');
    const noBtn = document.getElementById('battlesuitModalNo');
    const closeBtn = document.getElementById('battlesuitModalClose');

    document.getElementById('battlesuitModalTitle').textContent = 'Battle-Suit Created!';

    // Hide yes/no, show close
    yesBtn.classList.add('hidden');
    noBtn.classList.add('hidden');
    closeBtn.classList.remove('hidden');

    const abilityLabels = {
        fighting: 'Fighting (F)',
        agility: 'Agility (A)',
        strength: 'Strength (S)',
        endurance: 'Endurance (E)'
    };

    let html = '<div class="power-detail-section"><p>Your battle-suit has been created! Here are the FASE ability modifiers:</p></div>';
    html += '<table class="power-detail-table"><thead><tr><th>Ability</th><th>Roll</th><th>Modifier</th><th>Before</th><th>After</th></tr></thead><tbody>';

    for (const ability of ['fighting', 'agility', 'strength', 'endurance']) {
        const mod = modifiers[ability];
        const origRank = originalAbilities[ability].rank;
        const newRank = currentCharacter.primaryAbilities[ability].rank;
        const newValue = currentCharacter.primaryAbilities[ability].value;
        const changed = origRank !== newRank;
        const highlight = changed ? ' style="font-weight: bold; color: var(--success-color, #28a745);"' : '';

        html += `<tr>
            <td>${abilityLabels[ability]}</td>
            <td>${mod.roll}</td>
            <td>${mod.description}</td>
            <td>${origRank} (${originalAbilities[ability].value})</td>
            <td${highlight}>${newRank} (${newValue})</td>
        </tr>`;
    }

    html += '</tbody></table>';
    html += '<div class="power-detail-section power-detail-notes"><strong>Note:</strong> All powers are now part of the suit (artificial, equipment-based). Removing Body Armor will revert these bonuses.</div>';

    body.innerHTML = html;

    // Wire up close button
    const newClose = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newClose, closeBtn);
    newClose.addEventListener('click', () => {
        document.getElementById('battlesuitModal').classList.remove('active');
    });
}

/**
 * Revert battlesuit FASE bonuses when Body Armor is removed.
 */
function revertBattlesuit() {
    if (!currentCharacter.battlesuit) return;

    const originalAbilities = currentCharacter.battlesuit.originalAbilities;
    for (const ability of ['fighting', 'agility', 'strength', 'endurance']) {
        if (originalAbilities[ability]) {
            currentCharacter.primaryAbilities[ability].rank = originalAbilities[ability].rank;
            currentCharacter.primaryAbilities[ability].value = originalAbilities[ability].value;
        }
    }

    currentCharacter.battlesuit = null;

    // Recalculate Health
    updateSecondaryAbilities();
    updateAbilitiesTable();
}

/**
 * Update the abilities table display to reflect current values.
 * Used after battlesuit application/reversion.
 */
function updateAbilitiesTable() {
    const abilities = ['fighting', 'agility', 'strength', 'endurance', 'reason', 'intuition', 'psyche'];
    abilities.forEach(ability => {
        const data = currentCharacter.primaryAbilities[ability];
        if (!data) return;
        const row = document.querySelector(`tr[data-ability="${ability}"]`);
        if (row) {
            row.querySelector('.rank-result').textContent = data.rank;
            row.querySelector('.value-result').textContent = data.value;
        }
    });
}

// ===== Image Generation Prompt Functions =====

function generateImagePrompt() {
    const char = currentCharacter;

    // Randomly select art style
    const artStyles = [
        {
            era: "1960s",
            description: "classic 1960s Comics style, bold ink lines, Ben-Day dots, four-color printing aesthetic, dramatic inspired poses and perspectives, thick black outlines"
        },
        {
            era: "1980s",
            description: "1980s Comics style, detailed cross-hatching, dynamic anatomy, rich color palette, and cinematic compositions"
        },
        {
            era: "1990s",
            description: "1990s Comics style, extreme musculature, hyper-detailed rendering, heavy shadows and dramatic lighting, dynamic splash-page composition"
        }
    ];
    const selectedStyle = artStyles[Math.floor(Math.random() * artStyles.length)];

    // Map gender appearance to visual description
    const genderDescriptions = {
        "Androgynous": "an androgynous figure",
        "Masculine": "a male figure",
        "Feminine": "a female figure"
    };
    const genderDesc = genderDescriptions[char.genderAppearance || "Androgynous"];

    // Convert hex colors to descriptive color names
    const primaryColorName = hexToColorName(char.primarySuitColor || "#ED1D24");
    const secondaryColorName = hexToColorName(char.secondarySuitColor || "#1E3A5F");

    // Build physique description from FASERIP ranks
    const physiqueDesc = buildPhysiqueDescription(char.primaryAbilities);

    // Build powers visual description
    const powersDesc = buildPowersVisualDescription(
        char.powerDetails ? char.powerDetails.list : []
    );

    // Build origin flavor
    const originFlavor = buildOriginFlavor(char.origin, char.battlesuit);

    // Randomly select bad guys and setting
    const encounter = selectRandomEncounter();

    // Build the character name reference
    const heroName = char.name || "an unnamed superhero";

    // Assemble the full prompt
    const parts = [
        `A ${selectedStyle.description}.`,
        ``,
        `The image depicts ${heroName}, ${genderDesc}.`,
        physiqueDesc,
        originFlavor,
        ``,
        `The hero wears a skintight super-suit with ${primaryColorName} as the primary color and ${secondaryColorName} as the secondary color, with a distinctive emblem on the chest.`,
    ];

    if (powersDesc) {
        parts.push(``);
        parts.push(`The hero is visibly manifesting their powers: ${powersDesc}.`);
    }

    parts.push(``);
    parts.push(`${heroName} is in the middle of an intense battle against ${encounter.enemies} in ${encounter.setting}. ${encounter.actionDetail}`);
    parts.push(``);
    parts.push(`The composition is dynamic and action-packed, with dramatic perspective and motion lines. The hero is the clear focal point of the image.`);

    return parts.join('\n').trim();
}

function hexToColorName(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    const d = max - min;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

    let h = 0;
    if (d !== 0) {
        if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        else if (max === g) h = ((b - r) / d + 2) * 60;
        else h = ((r - g) / d + 4) * 60;
    }

    // Near-achromatic colors
    if (s < 0.1) {
        if (l < 0.15) return "black";
        if (l < 0.35) return "dark charcoal gray";
        if (l < 0.65) return "medium gray";
        if (l < 0.85) return "light silver gray";
        return "white";
    }

    // Determine lightness qualifier
    let lightQual = "";
    if (l < 0.25) lightQual = "dark ";
    else if (l < 0.4) lightQual = "deep ";
    else if (l > 0.75) lightQual = "light ";
    else if (l > 0.6) lightQual = "bright ";

    // Map hue to color name
    let hueName;
    if (h < 15) hueName = "red";
    else if (h < 35) hueName = "orange";
    else if (h < 50) hueName = "golden yellow";
    else if (h < 70) hueName = "yellow";
    else if (h < 85) hueName = "yellow-green";
    else if (h < 150) hueName = "green";
    else if (h < 175) hueName = "teal";
    else if (h < 200) hueName = "cyan";
    else if (h < 240) hueName = "blue";
    else if (h < 270) hueName = "indigo";
    else if (h < 300) hueName = "purple";
    else if (h < 335) hueName = "magenta";
    else hueName = "red";

    return lightQual + hueName;
}

function buildPhysiqueDescription(abilities) {
    const parts = [];

    // Strength determines visible musculature
    // Typical or lower = not muscular, Good to Remarkable = lean and muscular, Incredible+ = very muscular
    const strengthDescMap = {
        "Feeble": "a thin, frail frame",
        "Poor": "a slim, wiry build",
        "Typical": "an average build with no notable muscularity",
        "Good": "a lean, muscular build",
        "Excellent": "a lean, muscular build with sharp definition",
        "Remarkable": "a lean, muscular build with impressive definition and powerful proportions",
        "Incredible": "a very muscular physique with superhuman proportions",
        "Amazing": "a very muscular, massively powerful frame with impossibly large muscles",
        "Monstrous": "a very muscular, titan-like physique of staggering inhuman proportions"
    };
    const strengthRank = abilities.strength ? abilities.strength.rank : "Typical";
    parts.push(`They have ${strengthDescMap[strengthRank] || "an average build"}`);

    // Agility determines how they carry themselves
    const agilityRank = abilities.agility ? abilities.agility.rank : "Typical";
    const agilityIndex = RANKS_DATA.ranks.findIndex(r => r.name === agilityRank);
    if (agilityIndex >= 5) {
        parts.push("and move with extraordinary grace and acrobatic fluidity");
    } else if (agilityIndex >= 3) {
        parts.push("and carry themselves with nimble confidence");
    }

    // Fighting determines battle-readiness in posture
    const fightingRank = abilities.fighting ? abilities.fighting.rank : "Typical";
    const fightingIndex = RANKS_DATA.ranks.findIndex(r => r.name === fightingRank);
    if (fightingIndex >= 5) {
        parts.push("Their fighting stance radiates mastery and lethal precision");
    } else if (fightingIndex >= 3) {
        parts.push("Their stance shows trained combat readiness");
    }

    // Psyche determines eye intensity
    const psycheRank = abilities.psyche ? abilities.psyche.rank : "Typical";
    const psycheIndex = RANKS_DATA.ranks.findIndex(r => r.name === psycheRank);
    if (psycheIndex >= 6) {
        parts.push("Their eyes burn with overwhelming psychic intensity");
    } else if (psycheIndex >= 4) {
        parts.push("Their gaze carries an aura of powerful willpower");
    }

    // Reason determines intellectual expression
    const reasonRank = abilities.reason ? abilities.reason.rank : "Typical";
    const reasonIndex = RANKS_DATA.ranks.findIndex(r => r.name === reasonRank);
    if (reasonIndex >= 6) {
        parts.push("A visibly calculating, genius intellect shows behind their expression");
    }

    // Intuition determines awareness expression
    const intuitionRank = abilities.intuition ? abilities.intuition.rank : "Typical";
    const intuitionIndex = RANKS_DATA.ranks.findIndex(r => r.name === intuitionRank);
    if (intuitionIndex >= 5) {
        parts.push("Their expression shows preternatural awareness of their surroundings");
    }

    // Endurance determines energy/aura
    const enduranceRank = abilities.endurance ? abilities.endurance.rank : "Typical";
    const enduranceIndex = RANKS_DATA.ranks.findIndex(r => r.name === enduranceRank);
    if (enduranceIndex >= 6) {
        parts.push("An aura of inexhaustible stamina and resilience surrounds them");
    }

    return parts.join(". ") + ".";
}

function buildPowersVisualDescription(powersList) {
    if (!powersList || powersList.length === 0) return "";

    const powerVisualMap = {
        // Resistances
        "Resistance to Fire and Heat": "a shimmering heat-proof aura",
        "Resistance to Cold": "a frosty crystalline barrier on their skin",
        "Resistance to Electricity": "crackling static discharge harmlessly arcing off their body",
        "Invulnerability": "an impenetrable golden energy field around their body",

        // Movement
        "Flight": "soaring through the air with a glowing energy trail",
        "Gliding": "outstretched wings or membranes catching the wind",
        "Leaping": "launching through the air with incredible leg power",
        "Wall-Crawling": "clinging effortlessly to surfaces with glowing fingertips",
        "Lightning Speed": "a blur of motion with speed lines and afterimages",
        "Teleportation": "shimmering dimensional rifts opening around them",
        "Levitation": "floating above the ground with no visible means of support",
        "Swimming": "sleek aquatic adaptations visible on their body",
        "Dimensional Travel": "reality warping and dimensional portals swirling nearby",

        // Matter Control
        "Earth Control": "massive chunks of rock and earth swirling under their command",
        "Air Control": "powerful whirlwinds and gusts of air surrounding them",
        "Fire Control": "roaring flames bending to their will",
        "Water Control": "surging torrents of water coiling around their arms",
        "Weather Control": "storm clouds, lightning bolts, and howling winds answering their call",
        "Density Manipulation - Others": "distortion effects warping the density of nearby objects",
        "Body Transformation - Others": "transmutation energy transforming a nearby target",
        "Animal Transformation - Others": "mystical energy reshaping a target's form",

        // Energy Control
        "Magnetic Manipulation": "metallic objects hovering and orbiting around them surrounded by magnetic field lines",
        "Electrical Manipulation": "arcs of electricity dancing between their hands",
        "Light Manipulation": "dazzling prismatic light bending and refracting around them",
        "Sound Manipulation": "visible sonic waves distorting the air",
        "Darkforce Manipulation": "tendrils of pure darkness extending from their hands",
        "Gravity Manipulation": "objects floating and warping in a gravity distortion field",
        "Probability Manipulation": "a subtle reality-warping shimmer around them",
        "Nullifying Power": "a dampening field visually suppressing nearby energy",
        "Energy Reflection": "incoming attacks bouncing off a mirror-like energy shield",
        "Time Control": "temporal distortion effects with frozen motion around them",

        // Body Control
        "Growth": "towering above normal size with massive proportions",
        "Shrinking": "diminished to a tiny size but still clearly powerful",
        "Density Manipulation - Self": "their body shimmering between solid and intangible states",
        "Phasing": "partially transparent, phasing through solid matter",
        "Invisibility": "partially fading from visibility with a shimmer effect",
        "Plasticity": "stretching and morphing their body in impossible ways",
        "Elongation": "extending their limbs to superhuman lengths",
        "Shape-Shifting": "their form rippling as they shift between shapes",
        "Body Transformation - Self": "their body transmuting into another material",
        "Animal Transformation - Self": "partially transformed into an animal hybrid form",
        "Blending": "skin and suit shifting color to match the surroundings",
        "Power Absorption": "draining energy visibly from a nearby opponent",

        // Distance Attacks
        "Projectile Missile": "launching powerful projectiles from their hands",
        "Ensnaring Missile": "firing web-like or net-like restraints at enemies",
        "Ice Generation": "blasting streams of ice and frost from their hands",
        "Fire Generation": "hurling blasts of intense flame",
        "Energy Generation": "projecting devastating beams of pure energy from their palms",
        "Sound Generation": "emitting powerful sonic blasts visible as concentric waves",
        "Stunning Missile": "firing crackling stun bolts",
        "Corrosive Missile": "launching sizzling acid projectiles",
        "Slashing Missile": "hurling razor-sharp energy blades",
        "Darkforce Generation": "projecting bolts of pure darkness",

        // Mental Powers
        "Telepathy": "a glowing psychic aura emanating from their temples",
        "Image Generation": "realistic psychic illusions materializing around them",
        "Telekinesis": "objects floating and moving under their mental control surrounded by a telekinetic glow",
        "Mind Control": "hypnotic psychic waves radiating from their eyes",
        "Emotion Control": "an empathic aura visibly affecting those nearby",
        "Force Field Generation": "a translucent protective force field bubble around them",
        "Animal Communication and Control": "wild animals responding to their psychic commands",
        "Psionic Attack": "devastating psionic energy blasts from their forehead",
        "Precognition": "ghostly after-images of future events flickering around them",
        "Astral Projection": "a glowing astral form partially separating from their body",
        "Plant Control": "vines and vegetation growing and moving at their command",

        // Body Alterations - Offensive
        "Extra Body Parts - Offensive": "additional powerful limbs or appendages",
        "Extra Attacks": "striking with blinding speed from multiple angles",
        "Energy Touch": "hands crackling with destructive energy",
        "Paralyzing Touch": "hands glowing with paralyzing neural energy",
        "Claws": "razor-sharp retractable claws extended from their hands",
        "Rotting Touch": "hands surrounded by a decaying dark miasma",
        "Corrosive Touch": "hands dripping with luminous corrosive substance",
        "Health-Drain Touch": "glowing vampiric energy draining from a touched foe",

        // Body Alterations - Defensive
        "Body Armor": "armored plating or hardened skin visible across their body",
        "Absorption Power": "visibly absorbing incoming energy attacks into their body",
        "Regeneration": "wounds rapidly healing with a visible green glow",
        "Solar Regeneration": "drawing visible energy from sunlight to heal",
        "Life Support": "a self-sustaining environmental aura around their body",
        "Pheromones": "a subtle alluring mist surrounding them",
        "Healing": "radiant golden healing energy flowing from their hands",
        "Immortality": "a timeless, ethereal quality to their appearance",

        // Bonus powers
        "Water Breathing": "gills or aquatic breathing apparatus visible on their neck",
        "Any Resistance": "an energy field protecting against various attacks"
    };

    const visualParts = [];
    for (const power of powersList) {
        const visual = powerVisualMap[power.name];
        if (visual) {
            visualParts.push(visual);
        } else {
            visualParts.push(`manifesting ${power.name.toLowerCase()}`);
        }
    }

    // Limit to 3 most prominent powers to keep prompt focused
    return visualParts.slice(0, 3).join(", ");
}

function buildOriginFlavor(origin, battlesuit) {
    if (battlesuit) {
        return "They wear a high-tech powered battle-suit with visible mechanical joints, glowing power indicators, and an advanced heads-up display visor.";
    }

    const originDescriptions = {
        "Altered Human": "Their body shows subtle signs of superhuman transformation -- an otherworldly glow in their veins, or skin with an unusual sheen, hinting at the accident or experiment that changed them.",
        "Mutant": "They carry the unmistakable mark of a mutant, with unusual features that set them apart: perhaps unusual eye color, distinctive markings, or a unique physical trait that speaks to their genetic evolution.",
        "Hi-Tech": "Their costume incorporates visible advanced technology: glowing circuit patterns, micro-servos, and high-tech gadgets integrated into the suit's design.",
        "Robot": "They are clearly a robotic or android being, with visible mechanical joints, metallic plating, sensor arrays, and glowing optical sensors for eyes.",
        "Alien": "They have distinctly non-human features marking them as an extraterrestrial being: unusual skin tone, exotic facial structure, and otherworldly physical proportions."
    };

    return originDescriptions[origin] || "";
}

function selectRandomEncounter() {
    const enemies = [
        {
            name: "a horde of quasi-futuristic soldiers in yellow hazmat beekeeper suits",
            actionDetail: "Laser blasts and explosions fill the air as the hero smashes through their ranks."
        },
        {
            name: "a squad of evil masked agents in green uniforms wielding energy weapons",
            actionDetail: "The evil insignia is visible on their uniforms as the hero tears through their formation."
        },
        {
            name: "a gang of armored mercenaries with heavy weapons",
            actionDetail: "Bullets ricochet harmlessly as the hero charges into the fray."
        },
        {
            name: "a swarm of robotic drones controlled by a shadowy villain",
            actionDetail: "Sparking wreckage of destroyed drones litters the ground as the hero fights on."
        },
        {
            name: "a group of superpowered thugs in mismatched costumes",
            actionDetail: "The villains reel backwards from the hero's devastating counterattack."
        },
        {
            name: "a massive rampaging monster towering over the buildings",
            actionDetail: "The ground cracks beneath the monster's feet as the hero leaps to confront it."
        },
        {
            name: "an army of silver humanoid robots with metallic faces and energy gauntlets",
            actionDetail: "Shattered humanoid robot parts scatter through the air from the hero's powerful strikes."
        },
        {
            name: "a cadre of ninja warriors from the Hand, clad in crimson",
            actionDetail: "The ninjas attack from every angle but the hero counters with devastating skill."
        },
        {
            name: "a team of giant mechs, giant purple-and-pink superhero-hunting robots",
            actionDetail: "The towering giant robot fires energy beams as the hero dodges and strikes back."
        },
        {
            name: "a horde of symbiote-infected civilians writhing with alien tendrils",
            actionDetail: "Black symbiote tendrils lash out as the hero fights to free the infected."
        },
        {
            name: "a pack of underground cave monsters pouring out of a crack in the earth",
            actionDetail: "The subterranean creatures swarm upward but the hero holds the line."
        },
        {
            name: "a group of green-skinned alien infiltrators revealed in their true forms",
            actionDetail: "The shape-shifting aliens snarl as their disguises fall away under the hero's assault."
        }
    ];

    const settings = [
        "a crumbling city street with overturned cars and shattered storefronts",
        "the rooftops of Manhattan at sunset, with the skyline glowing behind them",
        "a high-tech laboratory filled with sparking equipment and shattered glass",
        "a desolate alien landscape under twin moons and a purple sky",
        "a massive underground cavern lit by glowing crystals",
        "the deck of a S.H.I.E.L.D. helicarrier under attack, high above the clouds",
        "a burning warehouse district at night, with smoke and flames illuminating the scene",
        "Times Square, with neon signs flickering and civilians fleeing in panic",
        "the ruins of an ancient temple overgrown with jungle vegetation",
        "a frozen arctic wasteland with howling winds and cracked ice",
        "a Stark Industries factory floor with sparking machinery and conveyor belts",
        "the steps of a grand courthouse, columns cracked and debris everywhere"
    ];

    const selectedEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    const selectedSetting = settings[Math.floor(Math.random() * settings.length)];

    return {
        enemies: selectedEnemy.name,
        setting: selectedSetting,
        actionDetail: selectedEnemy.actionDetail
    };
}

function copyImagePrompt() {
    const textarea = document.getElementById('imagePromptOutput');
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textarea.value).then(() => {
        const confirmation = document.getElementById('copyConfirmation');
        confirmation.classList.remove('hidden');
        setTimeout(() => confirmation.classList.add('hidden'), 2000);
    });
}
