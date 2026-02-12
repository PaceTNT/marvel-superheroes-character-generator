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

    // Powers
    if (currentCharacter.powerDetails && currentCharacter.powerDetails.list.length > 0) {
        html += '<h4>Powers</h4>';
        html += '<ul style="font-size: 0.9em;">';
        currentCharacter.powerDetails.list.forEach(power => {
            html += `<li>${power.name}${power.starred ? ' ⭐⭐' : ''} - ${power.rank}</li>`;
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

    // Powers, talents, contacts are already tracked in their Details objects

    // Show final summary
    let html = `
        <h2>${currentCharacter.name || 'Unnamed Hero'}</h2>
        <p><em>${currentCharacter.realName || 'Unknown Identity'}</em></p>

        <h4>Origin</h4>
        <p>${currentCharacter.origin}</p>

        <h4>Primary Abilities</h4>
        <ul>
            <li>Fighting: ${currentCharacter.primaryAbilities.fighting.rank} (${currentCharacter.primaryAbilities.fighting.value})</li>
            <li>Agility: ${currentCharacter.primaryAbilities.agility.rank} (${currentCharacter.primaryAbilities.agility.value})</li>
            <li>Strength: ${currentCharacter.primaryAbilities.strength.rank} (${currentCharacter.primaryAbilities.strength.value})</li>
            <li>Endurance: ${currentCharacter.primaryAbilities.endurance.rank} (${currentCharacter.primaryAbilities.endurance.value})</li>
            <li>Reason: ${currentCharacter.primaryAbilities.reason.rank} (${currentCharacter.primaryAbilities.reason.value})</li>
            <li>Intuition: ${currentCharacter.primaryAbilities.intuition.rank} (${currentCharacter.primaryAbilities.intuition.value})</li>
            <li>Psyche: ${currentCharacter.primaryAbilities.psyche.rank} (${currentCharacter.primaryAbilities.psyche.value})</li>
        </ul>

        <h4>Secondary Abilities</h4>
        <p>Health: ${currentCharacter.secondaryAbilities.health}</p>
        <p>Karma: ${currentCharacter.secondaryAbilities.karma}</p>
        <p>Resources: ${currentCharacter.secondaryAbilities.resources ? currentCharacter.secondaryAbilities.resources.rank : 'N/A'}</p>
        <p>Popularity: ${(() => {
            const p = currentCharacter.secondaryAbilities.popularity;
            if (p && typeof p === 'object') {
                return p.hasSecretId ? `(${p.heroPopularity})/(${p.secretPopularity})` : p.heroPopularity;
            }
            return p;
        })()}</p>

        ${currentCharacter.powerDetails.list.length ? `<h4>Powers</h4>${currentCharacter.powerDetails.list.map(p => {
            const details = typeof POWER_DETAILS_DATA !== 'undefined' ? POWER_DETAILS_DATA[p.name] : null;
            return `<div class="sheet-power-block">
                <h5>${p.name}${p.starred ? ' ⭐⭐' : ''} - ${p.rank} (${p.value}) - ${p.category}</h5>
                ${details ? renderPowerDetailsHTML(details) : '<p class="empty-state">No detailed description available.</p>'}
            </div>`;
        }).join('')}` : ''}
        ${currentCharacter.talentDetails.list.length ? `<h4>Talents</h4>${currentCharacter.talentDetails.list.map(t => {
            const tDetails = typeof TALENT_DETAILS_DATA !== 'undefined' ? TALENT_DETAILS_DATA[t.name] : null;
            return `<div class="sheet-talent-block">
                <h5>${t.name}${t.rank ? ` - ${t.rank} (${t.value})` : ''} - ${t.category}</h5>
                ${tDetails ? renderTalentDetailsHTML(tDetails) : '<p class="empty-state">No detailed description available.</p>'}
            </div>`;
        }).join('')}` : ''}
        ${currentCharacter.contactDetails.list.length ? `<h4>Contacts</h4>${currentCharacter.contactDetails.list.map(c => {
            const cDetails = typeof CONTACT_DETAILS_DATA !== 'undefined' ? CONTACT_DETAILS_DATA[c.type] : null;
            return `<div class="sheet-contact-block">
                <h5>${c.name} - ${c.type} (${c.category})</h5>
                ${cDetails ? renderContactDetailsHTML(cDetails) : '<p class="empty-state">No detailed description available.</p>'}
            </div>`;
        }).join('')}` : ''}
        ${currentCharacter.equipment.length ? `<h4>Equipment</h4><ul>${currentCharacter.equipment.map(e => `<li>${e}</li>`).join('')}</ul>` : ''}

        ${currentCharacter.backstory ? `<h4>Backstory</h4><p>${currentCharacter.backstory}</p>` : ''}
    `;

    document.getElementById('characterSummary').innerHTML = html;
    document.getElementById('exportButtons').classList.remove('hidden');

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

    // Check if this power would exceed the limit
    const slotsNeeded = power.starred ? 2 : 1;
    if (currentCharacter.powerDetails.current + slotsNeeded > effectivePowerLimit) {
        showAlertModal(`Cannot add this power: it costs ${slotsNeeded} slot(s) but you only have ${currentCharacter.powerDetails.max - currentCharacter.powerDetails.current} slot(s) remaining.`, 'Not Enough Slots');
        return;
    }

    // Add power to character
    addPowerToCharacter(power);
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
        html += `
            <div class="power-option" data-power-index="${index}">
                <div class="power-option-name">${power.name}${starredText}</div>
                <div class="power-option-details">${costText}</div>
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
            showAlertModal(`Cannot add this power: it costs ${slotsNeeded} slot(s) but you only have ${currentCharacter.powerDetails.max - currentCharacter.powerDetails.current} slot(s) remaining.`, 'Not Enough Slots');
            return;
        }

        // Roll rank for the power
        const rankResult = rollPowerRank();

        // Create power object
        const power = {
            name: modalState.selectedPower.name,
            category: modalState.selectedCategory,
            rank: rankResult.rank,
            value: rankResult.value,
            starred: modalState.selectedPower.starred,
            bonus: modalState.selectedPower.bonus
        };

        // Add to character
        addPowerToCharacter(power);
        closeModal();

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
}

/**
 * Remove a power from the character
 */
function removePowerFromCharacter(index) {
    showConfirmModal('Remove this power?', 'Remove Power', () => {
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

    let html = '';
    currentCharacter.powerDetails.list.forEach((power, index) => {
        const starredIndicator = power.starred ? ' <span class="power-starred">⭐⭐</span>' : '';
        const escapedName = power.name.replace(/'/g, "\\'");
        html += `
            <div class="power-card">
                <div class="power-info">
                    <div class="power-name">${power.name}${starredIndicator}</div>
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
