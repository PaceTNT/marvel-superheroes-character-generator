// Weapons Data for Marvel Superheroes RPG
// Combined from Marvel_superheroes_weapons.csv and Marvel_weapons_extra_information.txt reference files.
// Keyed by weapon category name.

const WEAPON_PRICE_LABELS = {
  "Fe": "Feeble",
  "Pr": "Poor",
  "Ty": "Typical",
  "Gd": "Good",
  "Ex": "Excellent",
  "Rm": "Remarkable",
  "In": "Incredible",
  "Am": "Amazing",
  "Mn": "Monstrous",
  "Un": "Unearthly"
};

const WEAPON_TYPE_LABELS = {
  "S": "Shooting",
  "F": "Force",
  "E": "Energy",
  "*": "Special/Variable"
};

const WEAPONS_DATA = {
  "Pistols": [
    { name: "Cheap Handgun", range: "2", price: "Fe", damage: "6", type: "S", rate: "1", shots: "6", material: "Pr", notes: "One-handed, no special ammo" },
    { name: "Handgun/Pistol", range: "3", price: "Ty", damage: "6", type: "S", rate: "1", shots: "6, 8, 9", material: "Ex", notes: "One-handed" },
    { name: "Target Pistol", range: "5", price: "Ty", damage: "6", type: "S", rate: "1", shots: "1", material: "Ex", notes: "" },
    { name: "Variable Pistol", range: "3", price: "Gd", damage: "6", type: "S", rate: "1", shots: "6, 8, 9", material: "Ex", notes: "One-handed, may change ammo type in field" },
    { name: "GyroJet Pistol", range: "5", price: "Ex", damage: "10", type: "S", rate: "1 per 2", shots: "3", material: "Gd", notes: "One-handed, fires gyro-jet ammo, illegal" },
    { name: "Laser Pistol", range: "10", price: "Rm", damage: "10", type: "E", rate: "1", shots: "10", material: "Pr", notes: "One-handed, power pack, illegal" },
    { name: "Stun Pistol", range: "2", price: "Rm", damage: "*", type: "*", rate: "1", shots: "10", material: "Pr", notes: "One-handed, power pack, Typical Intensity stunning" },
    { name: "Concussion Pistol", range: "4", price: "In", damage: "10", type: "F", rate: "1", shots: "5", material: "Ty", notes: "One-handed, power pack" },
    { name: "Plasma Beam", range: "7", price: "Am", damage: "20", type: "F", rate: "1", shots: "10", material: "Ex", notes: "Handgun, one-handed, power pack" },
    { name: "Machine Pistol", range: "3", price: "Ex", damage: "20", type: "S", rate: "1", shots: "6", material: "Ex", notes: "Bursts, one-handed, military" }
  ],
  "Rifles": [
    { name: "Rifle", range: "10", price: "Ty", damage: "10", type: "S", rate: "1", shots: "4", material: "Gd", notes: "" },
    { name: "Hunting Rifle", range: "10", price: "Gd", damage: "10", type: "S", rate: "1", shots: "6, 7, 8", material: "Gd", notes: "" },
    { name: "Sniper Rifle", range: "10", price: "Gd", damage: "15", type: "S", rate: "1", shots: "4", material: "Gd", notes: "" },
    { name: "Assault Rifle", range: "7", price: "Ex", damage: "10", type: "S", rate: "2", shots: "20", material: "Gd", notes: "Military" },
    { name: "Laser Rifle", range: "4", price: "Rm", damage: "20", type: "S", rate: "1", shots: "20", material: "Ty", notes: "Power pack, illegal" },
    { name: "Stun Rifle", range: "5", price: "Rm", damage: "*", type: "*", rate: "1", shots: "20", material: "Ty", notes: "Remarkable intensity stunning, power pack, illegal" },
    { name: "Concussion Rifle", range: "7", price: "Rm", damage: "10", type: "F", rate: "1", shots: "12", material: "Gd", notes: "Power pack, illegal" },
    { name: "Automatic Rifle", range: "5", price: "Ex", damage: "15", type: "S", rate: "1", shots: "20", material: "Gd", notes: "Military, bursts" }
  ],
  "Shotguns & Support Weapons": [
    { name: "Shotgun", range: "3", price: "Gd", damage: "20", type: "S", rate: "1, 2", shots: "2", material: "Gd", notes: "Bursts" },
    { name: "Riot Gun", range: "2", price: "Gd", damage: "15", type: "S", rate: "1", shots: "6", material: "Ex", notes: "Fire one-handed at -1CS" },
    { name: "Grenade Launcher", range: "4", price: "Ex", damage: "*", type: "1 per 2", rate: "1", shots: "1", material: "Gd", notes: "Military" },
    { name: "Sub-Machine Gun", range: "7", price: "Rm", damage: "25", type: "S", rate: "1", shots: "7", material: "Gd", notes: "Fire one-handed at -2CS, bursts, military" },
    { name: "Machine Gun", range: "10", price: "In", damage: "30", type: "S", rate: "1", shots: "20", material: "Gd", notes: "Bursts, military" },
    { name: "Flamethrower", range: "2", price: "In", damage: "30", type: "E", rate: "1", shots: "5", material: "Ty/Gd", notes: "Fire burns for 10 points damage/round, scatters, military" },
    { name: "Bazooka", range: "4", price: "In", damage: "40", type: "S", rate: "1 per 2", shots: "1", material: "Gd", notes: "Two men to fire, military" },
    { name: "LAW", range: "4", price: "Am", damage: "40", type: "S", rate: "1", shots: "6", material: "Gd", notes: "Military" }
  ],
  "Heavy & Artillery Weapons": [
    { name: "Light Artillery", range: "10", price: "Am", damage: "40", type: "S", rate: "1", shots: "20", material: "Ex", notes: "Two men to operate, military" },
    { name: "Stun Cannon", range: "10", price: "Am", damage: "*", type: "*", rate: "1", shots: "10", material: "Rm", notes: "Two men to fire, one-man firing at -1CS to hit, Incredible Intensity stunning, bursts, power pack" },
    { name: "Concussion Cannon", range: "15", price: "Am", damage: "40", type: "F", rate: "1", shots: "10", material: "Rm", notes: "Power pack" },
    { name: "Laser Cannon", range: "20", price: "Am", damage: "30", type: "E", rate: "1", shots: "10", material: "Ex", notes: "Power pack" },
    { name: "Heavy Artillery", range: "40", price: "Mn", damage: "50", type: "S", rate: "1", shots: "30", material: "Rm", notes: "Two men to fire, scatters, military" },
    { name: "Superheavy Artillery", range: "80", price: "Un", damage: "50", type: "S", rate: "1", shots: "30", material: "In", notes: "Stationary, two men to fire, military" },
    { name: "Missile Launcher", range: "*", price: "In", damage: "*", type: "*", rate: "1", shots: "10", material: "Rm", notes: "Fires missiles of various capabilities, military" }
  ],
  "Bows": [
    { name: "Regular Bow", range: "5", price: "Pr", damage: "6", type: "S", rate: "1", shots: "1", material: "Pr", notes: "Two-handed" },
    { name: "Long Bow", range: "6", price: "Ty", damage: "10", type: "S", rate: "1", shots: "1", material: "Ty", notes: "Two-handed" },
    { name: "Compound Bow", range: "7", price: "Ex", damage: "15", type: "S", rate: "1", shots: "1", material: "Gd", notes: "Two-handed" },
    { name: "Crossbow", range: "3", price: "Gd", damage: "10", type: "S", rate: "1 per 2", shots: "1", material: "Ty", notes: "Fire one-handed at -2CS" }
  ]
};

function getAllWeaponCategories() {
  return Object.keys(WEAPONS_DATA);
}

function getWeaponsInCategory(categoryName) {
  return WEAPONS_DATA[categoryName] || [];
}
