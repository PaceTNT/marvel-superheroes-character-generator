// Name Generator Data for Marvel Superheroes RPG

const NAMES_DATA = {
    // Superhero name generator word lists (adjective + noun, "The X Y" pattern)
    superheroAdjectives: [
        "Purple", "Vague", "Insightful", "Crimson", "Reluctant", "Sinister",
        "Mysterious", "Unstoppable", "Peculiar", "Radiant", "Grumpy", "Silent",
        "Electric", "Cosmic", "Feral", "Gilded", "Nocturnal", "Rampant",
        "Whimsical", "Wandering"
    ],
    superheroNouns: [
        "Threat", "Lightning", "Blemish", "Falcon", "Hammer", "Shadow",
        "Comet", "Vortex", "Wraith", "Panther", "Nebula", "Sentinel",
        "Cobra", "Fury", "Echo", "Talon", "Ember", "Specter",
        "Gauntlet", "Tempest"
    ],

    // Mundane name generator word lists (ordinary first/last names for secret IDs and Contacts)
    firstNames: [
        "John", "Fred", "Mary", "James", "Susan", "Robert", "Linda", "Michael",
        "Karen", "David", "Patricia", "William", "Barbara", "Richard", "Nancy",
        "Thomas", "Betty", "Charles", "Sandra", "Joseph"
    ],
    lastNames: [
        "Smith", "Duncan", "Johnson", "Williams", "Brown", "Jones", "Miller",
        "Davis", "Garcia", "Wilson", "Anderson", "Taylor", "Thomas", "Moore",
        "Clark", "Lewis", "Walker", "Young", "Hall", "Allen"
    ]
};

function getRandomSuperheroAdjective() {
    return NAMES_DATA.superheroAdjectives[Math.floor(Math.random() * NAMES_DATA.superheroAdjectives.length)];
}

function getRandomSuperheroNoun() {
    return NAMES_DATA.superheroNouns[Math.floor(Math.random() * NAMES_DATA.superheroNouns.length)];
}

function getRandomFirstName() {
    return NAMES_DATA.firstNames[Math.floor(Math.random() * NAMES_DATA.firstNames.length)];
}

function getRandomLastName() {
    return NAMES_DATA.lastNames[Math.floor(Math.random() * NAMES_DATA.lastNames.length)];
}
