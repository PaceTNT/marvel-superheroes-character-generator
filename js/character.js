// Character State Management
let currentCharacter = {
    origin: null,
    primaryAbilities: {
        fighting: null,
        agility: null,
        strength: null,
        endurance: null,
        reason: null,
        intuition: null,
        psyche: null
    },
    secondaryAbilities: {
        health: 0,
        karma: 0,
        resources: null,      // Current resources (after purchases)
        baseResources: null,  // Resources before purchasing deductions
        popularity: {
            base: 10,                // 10 for most, 0 for Mutant/Robot
            hasSecretId: false,
            hangsWithMutants: false,  // Only for non-Mutants
            generallyUnpopular: false, // Aliens default true
            heroPopularity: 10,
            secretPopularity: null    // null if no secret ID
        }
    },
    // Powers with detailed tracking
    powerDetails: {
        roll: null,           // Allocation roll result
        initial: 0,           // Initial power count (free from allocation)
        max: 0,               // Maximum power count
        purchased: 0,         // Additional slots purchased with Resources
        current: 0,           // Current slots consumed (accounting for starred powers)
        list: []              // Array of power objects: { name, category, rank, value, starred }
    },
    // Talents with count tracking
    talentDetails: {
        roll: null,           // Allocation roll result
        initial: 0,           // Initial talent count (free from allocation)
        max: 0,               // Maximum talent count
        purchased: 0,         // Additional slots purchased with Resources
        list: []              // Array of talent strings (free-form)
    },
    // Contacts with count tracking
    contactDetails: {
        roll: null,           // Allocation roll result
        initial: 0,           // Initial contact count (free from allocation)
        max: 0,               // Maximum contact count
        purchased: 0,         // Additional slots purchased with Resources
        list: []              // Array of contact strings (free-form)
    },
    // Battlesuit (Hi-Tech + Body Armor only)
    battlesuit: null, // null = not applicable, or { modifiers: { fighting, agility, strength, endurance }, originalAbilities: { ... } }
    // Legacy arrays (kept for backward compatibility)
    powers: [],
    talents: [],
    contacts: [],
    equipment: [],
    name: "",
    realName: "",
    backstory: "",
    genderAppearance: "Androgynous",
    primarySuitColor: "#ED1D24",
    secondarySuitColor: "#1E3A5F"
};

let currentStep = 1;

function showStartOverModal() {
    document.getElementById('startOverModal').classList.add('active');
}

function hideStartOverModal() {
    document.getElementById('startOverModal').classList.remove('active');
}

function showAlertModal(message, title) {
    document.getElementById('alertModalTitle').textContent = title || 'Notice';
    document.getElementById('alertModalMessage').textContent = message;
    document.getElementById('alertModal').classList.add('active');
}

function hideAlertModal() {
    document.getElementById('alertModal').classList.remove('active');
}

let confirmModalCallback = null;

function showConfirmModal(message, title, onConfirm) {
    document.getElementById('confirmModalTitle').textContent = title || 'Are you sure?';
    document.getElementById('confirmModalMessage').textContent = message;
    confirmModalCallback = onConfirm;
    document.getElementById('confirmModal').classList.add('active');
}

function hideConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
    confirmModalCallback = null;
}

function resetCharacter() {
    currentCharacter = {
        origin: null,
        primaryAbilities: {
            fighting: null,
            agility: null,
            strength: null,
            endurance: null,
            reason: null,
            intuition: null,
            psyche: null
        },
        secondaryAbilities: {
            health: 0,
            karma: 0,
            resources: null,
            baseResources: null,
            popularity: {
                base: 10,
                hasSecretId: false,
                hangsWithMutants: false,
                generallyUnpopular: false,
                heroPopularity: 10,
                secretPopularity: null
            }
        },
        powerDetails: {
            roll: null,
            initial: 0,
            max: 0,
            purchased: 0,
            current: 0,
            list: []
        },
        talentDetails: {
            roll: null,
            initial: 0,
            max: 0,
            purchased: 0,
            list: []
        },
        contactDetails: {
            roll: null,
            initial: 0,
            max: 0,
            purchased: 0,
            list: []
        },
        battlesuit: null,
        powers: [],
        talents: [],
        contacts: [],
        equipment: [],
        name: "",
        realName: "",
        backstory: "",
        genderAppearance: "Androgynous",
        primarySuitColor: "#ED1D24",
        secondarySuitColor: "#1E3A5F"
    };

    currentStep = 1;
    localStorage.removeItem('msrpg_character');

    // Reset all UI elements
    resetAllUI();
    showStep(1);
}

function resetAllUI() {
    // Reset origin selection
    document.querySelectorAll('.origin-card').forEach(card => card.classList.remove('selected'));
    document.getElementById('originResult').innerHTML = '';
    document.getElementById('originResult').classList.add('hidden');
    document.getElementById('confirmOrigin').classList.add('hidden');

    // Reset abilities table
    document.querySelectorAll('#abilitiesTable tbody tr').forEach(row => {
        row.querySelector('.roll-result').textContent = '-';
        row.querySelector('.rank-result').textContent = '-';
        row.querySelector('.value-result').textContent = '-';
    });
    document.getElementById('confirmAbilities').classList.add('hidden');
    document.getElementById('originModifier').classList.add('hidden');
    document.getElementById('originModifier').innerHTML = '';

    // Reset secondary abilities
    document.getElementById('healthValue').textContent = '0';
    document.getElementById('karmaValue').textContent = '0';
    document.getElementById('resourcesValue').textContent = '-';
    document.getElementById('popularityValue').textContent = '0';
    document.getElementById('popularityInfo').textContent = '';
    document.getElementById('popularityInfo').classList.add('hidden');

    // Reset popularity checkboxes
    const secretIdCheck = document.getElementById('secretIdCheck');
    const mutantAssocCheck = document.getElementById('mutantAssocCheck');
    const unpopularCheck = document.getElementById('unpopularCheck');
    if (secretIdCheck) secretIdCheck.checked = false;
    if (mutantAssocCheck) mutantAssocCheck.checked = false;
    if (unpopularCheck) unpopularCheck.checked = false;
    document.getElementById('popularityControls').classList.add('hidden');

    // Reset step 3 resource controls
    document.getElementById('normalResourceControls').classList.remove('hidden');
    document.getElementById('hiTechResourceControls').classList.add('hidden');
    document.getElementById('resourcesInfo').classList.add('hidden');
    document.getElementById('resourcesInfo').textContent = '';

    // Reset step 4 sections
    document.getElementById('allocationResult').classList.add('hidden');
    document.getElementById('purchaseSection').classList.add('hidden');
    document.getElementById('powersSection').classList.add('hidden');
    document.getElementById('talentsSection').classList.add('hidden');
    document.getElementById('contactsSection').classList.add('hidden');
    document.getElementById('equipmentSection').classList.add('hidden');
    document.getElementById('confirmSpecialAbilities').classList.add('hidden');
    document.getElementById('powersList').innerHTML =
        '<p class="empty-state">No powers added yet. Click "Roll Random Power" or "Choose Power" to begin.</p>';
    document.getElementById('talentsList').innerHTML =
        '<p class="empty-state">No talents added yet. Click "Roll Random Talent" or "Choose Talent" to begin.</p>';
    document.getElementById('contactsList').innerHTML =
        '<p class="empty-state">No contacts added yet. Click "Choose Contact" to begin.</p>';
    document.getElementById('equipmentInput').value = '';

    // Reset step 5 form inputs
    document.getElementById('characterName').value = '';
    document.getElementById('realName').value = '';
    document.getElementById('backstory').value = '';

    // Reset image prompt options
    document.getElementById('genderAppearance').value = 'Androgynous';
    document.getElementById('primarySuitColor').value = '#ED1D24';
    document.getElementById('secondarySuitColor').value = '#1E3A5F';
    document.getElementById('primaryColorLabel').textContent = '#ED1D24';
    document.getElementById('secondaryColorLabel').textContent = '#1E3A5F';
    document.getElementById('imagePromptSection').classList.add('hidden');
    document.getElementById('imagePromptOutput').value = '';

    // Reset export buttons and summary
    document.getElementById('exportButtons').classList.add('hidden');
    updateSummary();
}

function saveCharacterToLocalStorage() {
    localStorage.setItem('msrpg_character', JSON.stringify(currentCharacter));
}

function loadCharacterFromLocalStorage() {
    const saved = localStorage.getItem('msrpg_character');
    if (saved) {
        currentCharacter = JSON.parse(saved);

        // Migrate old format to new format
        migrateCharacterFormat();

        updateUI();
    }
}

/**
 * Migrate old character format to new format
 * Handles backward compatibility with characters created before power details were added
 */
function migrateCharacterFormat() {
    // Migrate powers if old format detected
    if (!currentCharacter.powerDetails) {
        currentCharacter.powerDetails = {
            roll: null,
            initial: currentCharacter.powers ? currentCharacter.powers.length : 0,
            max: currentCharacter.powers ? currentCharacter.powers.length : 0,
            purchased: 0,
            current: currentCharacter.powers ? currentCharacter.powers.length : 0,
            list: []
        };

        // Convert old power strings to new format
        if (Array.isArray(currentCharacter.powers)) {
            currentCharacter.powerDetails.list = currentCharacter.powers.map(name => ({
                name: name,
                category: "Unknown",
                rank: "Typical",
                value: 6,
                starred: false
            }));
        }
    }

    // Migrate talents if old format detected
    if (!currentCharacter.talentDetails) {
        const oldTalents = currentCharacter.talents || [];
        currentCharacter.talentDetails = {
            roll: null,
            initial: oldTalents.length,
            max: oldTalents.length,
            purchased: 0,
            list: oldTalents.map(t => typeof t === 'string'
                ? { name: t, category: "Unknown", rank: null, value: null }
                : t
            )
        };
    }

    // Migrate contacts if old format detected
    if (!currentCharacter.contactDetails) {
        const oldContacts = currentCharacter.contacts || [];
        currentCharacter.contactDetails = {
            roll: null,
            initial: oldContacts.length,
            max: oldContacts.length,
            purchased: 0,
            list: oldContacts.map(c => typeof c === 'string'
                ? { name: c, type: "Unknown", category: "Unknown" }
                : c
            )
        };
    }

    // Ensure purchased counts exist
    if (currentCharacter.powerDetails && currentCharacter.powerDetails.purchased === undefined) {
        currentCharacter.powerDetails.purchased = 0;
    }
    if (currentCharacter.talentDetails && currentCharacter.talentDetails.purchased === undefined) {
        currentCharacter.talentDetails.purchased = 0;
    }
    if (currentCharacter.contactDetails && currentCharacter.contactDetails.purchased === undefined) {
        currentCharacter.contactDetails.purchased = 0;
    }

    // Ensure baseResources exists
    if (currentCharacter.secondaryAbilities && !currentCharacter.secondaryAbilities.baseResources) {
        currentCharacter.secondaryAbilities.baseResources = currentCharacter.secondaryAbilities.resources
            ? { ...currentCharacter.secondaryAbilities.resources }
            : null;
    }

    // Migrate popularity from old number format to new object format
    if (currentCharacter.secondaryAbilities &&
        typeof currentCharacter.secondaryAbilities.popularity === 'number') {
        const oldPop = currentCharacter.secondaryAbilities.popularity;
        currentCharacter.secondaryAbilities.popularity = {
            base: oldPop,
            hasSecretId: false,
            hangsWithMutants: false,
            generallyUnpopular: false,
            heroPopularity: oldPop,
            secretPopularity: null
        };
    }

    // Ensure battlesuit field exists
    if (currentCharacter.battlesuit === undefined) {
        currentCharacter.battlesuit = null;
    }

    // Ensure legacy arrays exist for backward compatibility
    if (!currentCharacter.powers) currentCharacter.powers = [];
    if (!currentCharacter.talents) currentCharacter.talents = [];
    if (!currentCharacter.contacts) currentCharacter.contacts = [];
    if (!currentCharacter.equipment) currentCharacter.equipment = [];

    // Ensure image prompt fields exist
    if (!currentCharacter.genderAppearance) currentCharacter.genderAppearance = "Androgynous";
    if (!currentCharacter.primarySuitColor) currentCharacter.primarySuitColor = "#ED1D24";
    if (!currentCharacter.secondarySuitColor) currentCharacter.secondarySuitColor = "#1E3A5F";
}
