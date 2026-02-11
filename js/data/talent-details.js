// Talent Details Data for Marvel Superheroes RPG
// Combined from: Fighting Skills, Mystic and Mental Skills, Other Talents,
// Professional Skills, Scientific Skills, and Weapon Skills reference files.

const TALENT_DETAILS_DATA = {
  // ===== FIGHTING SKILLS =====
  "Martial Arts A": {
    "description": "This form of martial arts concentrates on using an opponent's strength against him, and is typical of oriental-American forms such as judo and karate. The practitioner of this type of martial arts can Stun or Slam an opponent regardless of their comparative Strengths and Endurances.",
    "category": "Fighting Skills",
    "effects": {
      "Stun/Slam": "Can Stun or Slam regardless of comparative Strengths and Endurances"
    }
  },
  "Martial Arts B": {
    "description": "This form of martial arts is keyed on offense and inflicting damage in short, quick bursts, and includes such disciplines as boxing. The practitioner of this form of martial arts gains a +1CS to Fighting ability when engaged in unarmed combat.",
    "category": "Fighting Skills",
    "effects": {
      "Fighting": "+1CS when engaged in unarmed combat"
    }
  },
  "Martial Arts C": {
    "description": "This form of martial arts concentrates on holds and escapes.",
    "category": "Fighting Skills",
    "effects": {
      "Strength (Grappling)": "+1CS for Grappling attacks (including damage)",
      "Strength (Escaping)": "+1CS for Escaping",
      "Agility (Dodging)": "+1CS for Dodging"
    }
  },
  "Martial Arts D": {
    "description": "This meditative form of martial arts searches out the weak spots of the opponent's defenses and strikes against them. The practitioner of this form of attack may ignore the effects of Body Armor (though not force fields) for determining Stun and Slam results. The attack by the character with this Talent does not have to inflict damage to force a check for possible Stun and Slam.",
    "category": "Fighting Skills",
    "notes": "The target of this attack must be studied for two rounds before the effects may be brought into play. The character does not have to attack the target, only watch him in battle for two rounds previous to attacking.",
    "effects": {
      "Body Armor": "Ignore Body Armor (not force fields) for Stun and Slam results",
      "Stun/Slam": "Does not need to inflict damage to force Stun/Slam check"
    }
  },
  "Martial Arts E": {
    "description": "This form of martial arts encourages quick striking to catch the opponent off-guard. Heroes with this form of Martial Arts are at a +1 to initiative rolls in unarmed combat.",
    "category": "Fighting Skills",
    "effects": {
      "Initiative": "+1 to initiative rolls in unarmed combat"
    }
  },
  "Wrestling": {
    "description": "The hero with this Talent is proficient in applying holds. It includes familiar types of wrestling as well as the sumo forms of the art. The hero with this Talent gains a +2CS when making Grappling attacks, but gains no benefit in damage.",
    "category": "Fighting Skills",
    "notes": "A hero with Martial Arts B and this Talent gains a +3CS to hit in a Grappling attack, and a +1CS for damage.",
    "effects": {
      "Grappling": "+2CS when making Grappling attacks (no damage benefit)"
    }
  },
  "Thrown Objects": {
    "description": "The hero with this Talent gains a +1CS with all Throwing attacks (both Edged and Blunt), and +1CS on Catching. This applies to both thrown weapons and normal items.",
    "category": "Fighting Skills",
    "notes": "If the hero has the Thrown Weapons Talent as well, the modification is +2CS when using thrown weapons.",
    "effects": {
      "Throwing": "+1CS with all Throwing attacks (Edged and Blunt)",
      "Catching": "+1CS on Catching"
    }
  },
  "Acrobatics": {
    "description": "The hero with this Talent is very limber and as such gains advantages when under attack. The hero has a +1CS when dodging, evading, and escaping.",
    "category": "Fighting Skills",
    "effects": {
      "Dodging": "+1CS",
      "Evading": "+1CS",
      "Escaping": "+1CS"
    }
  },
  "Tumbling": {
    "description": "The hero with this Talent knows how to fall and land without undue injury. Individuals with this Talent may make an Agility FEAT to land feet-first after any fall that does not inflict damage.",
    "category": "Fighting Skills",
    "effects": {
      "Falling": "Agility FEAT to land feet-first after non-damaging falls"
    }
  },

  // ===== MYSTIC AND MENTAL SKILLS =====
  "Trance": {
    "description": "The character may place himself into a trance. While in a trance the character slows his body functions to such a level that he may be assumed to be deceased (Intuition FEAT for the character checking). A character in a trance reduces needs for food and water to a minimal level, and may regain Endurance ranks at one rank per day.",
    "category": "Mystic and Mental Skills",
    "effects": {
      "Body Functions": "Slows to appear deceased (Intuition FEAT to detect)",
      "Sustenance": "Reduces food and water needs to minimal",
      "Endurance Recovery": "Regain Endurance ranks at one rank per day"
    }
  },
  "Mesmerism and Hypnosis": {
    "description": "This Talent is a primitive form of Mind Control at the Power rank number equal to the Reason of the character with this Talent. Information can be gained as per a Mental Probe, and post-hypnotic suggestions may be implanted within the victim's mind.",
    "category": "Mystic and Mental Skills",
    "notes": "Any attempt to force an individual to do something that he would not normally do, or divulge information that he would not normally reveal, will cause the hypnotism to break. A hypnotic command fades in 1-10 hours after it is given.",
    "effects": {
      "Mind Control": "Primitive form at Power rank equal to Reason",
      "Mental Probe": "Can gain information as per Mental Probe",
      "Post-Hypnotic Suggestions": "Can implant suggestions (fades in 1-10 hours)"
    }
  },
  "Sleight of Hand": {
    "description": "This is a Talent developed by stage magicians which causes items to appear and disappear by a combination of misdirection and swift, fluid gestures. The character with this Talent may palm small items, making them appear or disappear with Agility +1CS ability.",
    "category": "Mystic and Mental Skills",
    "effects": {
      "Agility": "+1CS for palming small items, making them appear or disappear"
    }
  },
  "Resist Domination": {
    "description": "This is a Psi-Screen that may be developed by the individuals without that Power. This permits the character to resist mental attacks as if the character had a mental power of Psyche +1CS. The Talent is passive in nature, and does not grant any other particular benefit.",
    "category": "Mystic and Mental Skills",
    "notes": "A character with Mental Probe may be able to discern where the character gained this Talent, but nothing else.",
    "effects": {
      "Psyche": "+1CS for resisting mental attacks (passive Psi-Screen)"
    }
  },
  "Occult Lore": {
    "description": "The character with this Talent has a knowledge of magical societies, antiquities, runes, and a general understanding of forgotten lore. The character gains a +1CS to Reason FEATs involving items of a magical nature.",
    "category": "Mystic and Mental Skills",
    "effects": {
      "Reason": "+1CS on FEATs involving items of a magical nature"
    }
  },
  "Mystic Origin": {
    "description": "In the Marvel Universe, all humankind has the potential for developing magical Powers. This \"Talent\" shows that the character has some background with magical forces. Heroes may have derived their powers from these forces if they choose this Talent.",
    "category": "Mystic and Mental Skills",
    "notes": "A character with this Talent may have Magical Powers, with the approval of the Judge. If the Judge allows magical player characters, then any of the initial Powers created may be spells, and should be noted as deriving from Personal, Universal, or Dimensional energies."
  },
  "Mystic Background": {
    "description": "In the Marvel Universe, all humankind has the potential for developing magical Powers. This \"Talent\" shows that the character has some background with magical forces. Heroes may have derived their powers from these forces if they choose this Talent.",
    "category": "Mystic and Mental Skills",
    "notes": "A character with this Talent may have Magical Powers, with the approval of the Judge. If the Judge allows magical player characters, then any of the initial Powers created may be spells, and should be noted as deriving from Personal, Universal, or Dimensional energies."
  },

  // ===== OTHER TALENTS =====
  "Artist": {
    "description": "The character with an artist background creates works of art, either for himself or for sale to others. This includes painting, sculpting, and writing. A single work takes 1-10 weeks, and upon completion grants the artist Karma points equal to 10 times the number of weeks. The character must allocate some time daily at his work.",
    "category": "Other Skills",
    "effects": {
      "Karma": "Gain 10 Karma per week spent on a work (1-10 weeks per work)"
    }
  },
  "Languages": {
    "description": "The character with this Talent has a natural understanding of languages. The character gains 1 additional language at start, and may add other languages at half the cost of a Talent (500 points regardless of who teaches it).",
    "category": "Other Skills",
    "notes": "Characters without Languages Talent must gain this Talent first to learn other languages. The gaining of additional languages assumes someone is available to teach these languages. A Player character with this Talent does not have to assign a language at start, but may fill one in later as need be.",
    "effects": {
      "Languages": "+1 additional language at start",
      "Learning Languages": "Half cost (500 Karma points) to learn new languages"
    }
  },
  "First Aid": {
    "description": "The Medicine Talent notes that the loss of Endurance ranks may be halted by someone checking on the dying character and administering some form of aid. The First Aid Talent grants the character this immediate halt to Endurance rank loss, the recovery of one rank immediately (one use only per situation), and in addition, the hero with this Talent can stabilize a dying character at Shift 0 Health up to 5 rounds after that character reaches that level.",
    "category": "Other Skills",
    "effects": {
      "Endurance Loss": "Immediate halt to Endurance rank loss",
      "Recovery": "Recovery of one Endurance rank immediately (once per situation)",
      "Stabilization": "Can stabilize dying character at Shift 0 Health up to 5 rounds after"
    }
  },
  "Repair/Tinkering": {
    "description": "The character with this Talent gains a +1CS to any Reason FEATs involving the repair and modification of existing items, but not the building of new items. This +1CS may be added to any other bonuses gained from other Talents, so that an Engineer with Tinkering Talent would gain a +2CS on repair.",
    "category": "Other Skills",
    "effects": {
      "Reason": "+1CS for repair and modification of existing items (not building new)"
    }
  },
  "Trivia": {
    "description": "This is a general category that covers any one subject desired by the character. On that subject, the character gains +1CS to all Reason FEATs.",
    "category": "Other Skills",
    "notes": "Trivia categories should be specific (old movies, military history, sports, rock music, comic books) as opposed to general (all knowledge) or covered by other Talents. Example: Trivia/Spores and Fungus.",
    "effects": {
      "Reason": "+1CS on all FEATs related to the chosen subject"
    }
  },
  "Performer": {
    "description": "The character is someone who acts, sings, dances, mimes, or otherwise uses his Talents to entertain. This is related to the Artist, the key difference being that the Artist may leave the scene of creation; the Performer is identified with that creation directly.",
    "category": "Other Skills",
    "effects": {
      "Karma": "10 Karma points for a week's worth of performance"
    }
  },
  "Animal Training": {
    "description": "The character with this Talent has the ability to train animals to perform certain stunts. The individual does not have Animal Empathy or Communications and Control, but may teach an animal a trick based on the Reason FEAT roll.",
    "category": "Other Skills",
    "notes": "If the hero with this Talent does have Animal Empathy or Animal Communications and Control as Powers, these Powers are raised by +1CS.",
    "effects": {
      "Animal Training": "Can teach animals tricks (Reason FEAT)",
      "Animal Powers": "+1CS to Animal Empathy or Animal Communications and Control if possessed"
    }
  },
  "Heir to Fortune": {
    "description": "This is not a Talent, but a situation which brings the character into a lot of money. The minimum Resources of a character with this Talent is Remarkable. This \"Talent\" may not be gained by a character after the generation process is finished, and may only be chosen by characters being generated.",
    "category": "Other Skills",
    "notes": "If your character is making Excellent Resources or less, do not take this Talent.",
    "effects": {
      "Resources": "Minimum Remarkable Resources"
    }
  },
  "Student": {
    "description": "Similar to Heir to Fortune, this Talent may only be chosen at the start of play, and may not be gained through experience. The Student character has no other initial Talents, but may gain other Talents at a discounted price.",
    "category": "Other Skills",
    "notes": "New Talents cost 1000 Karma points if learned from another player character, 800 if learned from outside. Students may maintain Advancement Totals for a Talent along with other forms of Advancement funds.",
    "effects": {
      "Talent Learning": "Discounted cost: 1000 Karma from PCs, 800 from outside"
    }
  },
  "Leadership": {
    "description": "The hero with this Talent has the brains and understanding of a cohesive group, such that he is a benefit to the team. Any Karma Pool to which the character belongs receives a 50-point bonus, provided the character with this Talent is recognized as the \"team leader.\"",
    "category": "Other Skills",
    "notes": "A Karma Pool may only have one recognized leader, though more than one character with Leadership may belong to one group. When the \"Leader\" of a group leaves, the 50 points are deducted from the Karma Pool, but the leader does not receive them for personal use (the bonus points only exist as a part of the pool).",
    "effects": {
      "Karma Pool": "+50 bonus points when recognized as team leader"
    }
  },

  // ===== PROFESSIONAL SKILLS =====
  "Medicine": {
    "description": "The hero with this Talent has extensive knowledge of medicine, and as such limited Talents in healing. In general, a character losing Endurance Ranks as the result of a lethal situation can have those losses stopped by any character checking on him. The individual with Medicine Talent may bring back characters that have reached the Shift 0 level up to 20 turns after they have reached that level.",
    "category": "Professional Skills",
    "effects": {
      "Endurance Recovery": "Restore one rank of Endurance to a wounded character per week (in addition to natural healing)",
      "Stabilization": "Bring back characters at Shift 0 up to 20 turns after reaching that level",
      "Reason": "+1CS on FEATs involving medical problems, medications, poisons, and surgery"
    }
  },
  "Law": {
    "description": "The character with this Talent has an extensive background in law (the assumption being US Law, but this may vary according to the Judge's campaign). The hero may be a lawyer or capable of applying to pass the bar (Reason FEAT of Good Intensity).",
    "category": "Professional Skills",
    "notes": "A character without Law gains no benefit to Reason FEATs, and in addition, will have to make Reason FEATs more often than a character with Law Talent.",
    "effects": {
      "Reason": "+1CS to all FEATs involving the law, including correct legal procedure"
    }
  },
  "Law-Enforcement": {
    "description": "The character with this Talent has a background with law-enforcement authorities. This Talent includes both Gun and Law Talents, and the character, if still a member of a law-enforcement agency, may legally carry a gun and make arrests.",
    "category": "Professional Skills",
    "effects": {
      "Included Talents": "Includes both Gun and Law Talents",
      "Legal Authority": "May legally carry a gun and make arrests (if active member)"
    }
  },
  "Pilot": {
    "description": "The character with this Talent has a working knowledge of most aircraft, and receives a +1CS for all FEAT rolls involving an aircraft that character is controlling (including Control FEATs, Agility FEATs, and Reason FEATs involving aircraft handling and design).",
    "category": "Professional Skills",
    "notes": "A character with a background that would permit it (a hero who is an alien) may extend this Talent to spacecraft as well.",
    "effects": {
      "Aircraft Control": "+1CS for all FEATs involving controlled aircraft",
      "Aircraft Design": "+1CS on Reason FEATs for aircraft handling and design"
    }
  },
  "Military": {
    "description": "The hero has had some dealings with one of the armed services. In military matters, the hero gets a +1CS to all FEAT rolls, and in addition may take a member of the armed services as a Contact.",
    "category": "Professional Skills",
    "effects": {
      "Military FEATs": "+1CS to all FEAT rolls in military matters",
      "Contacts": "May take a member of the armed services as a Contact"
    }
  },
  "Business/Finance": {
    "description": "The hero is familiar with the world of business, corporate finance, and how money works. Initial resources are a minimum of Good, and the hero gains a +1CS for FEAT rolls dealing with money. The hero gains a Contact in the Professional category.",
    "category": "Professional Skills",
    "effects": {
      "Resources": "Minimum Good initial Resources",
      "Money FEATs": "+1CS for FEAT rolls dealing with money",
      "Contacts": "Gains a Contact in the Professional category"
    }
  },
  "Journalism": {
    "description": "The hero with this Talent gains an additional 2 Contacts to those already generated. The Contacts should be connected with the media in some fashion, such as at local newspapers, radio or TV stations, or has sources in law enforcement, political circles, or snitches of the criminal underworld.",
    "category": "Professional Skills",
    "effects": {
      "Contacts": "+2 additional Contacts (media-connected)"
    }
  },
  "Engineering": {
    "description": "Engineering includes all the varied types of that profession dedicated to the design of functional items: civil, chemical, mechanical, etc. A character with Engineering Talent gains a +1CS to all FEATs involving building things, including the Resource FEAT to determine if an object can be built.",
    "category": "Professional Skills",
    "effects": {
      "Building": "+1CS to all FEATs involving building things",
      "Resources": "+1CS on Resource FEAT to determine if an object can be built"
    }
  },
  "Crime": {
    "description": "The hero with this Talent has an understanding of the criminal mind and behavior, either from studies or first-hand observation. The character with this Talent gains a +1CS on all Reason and Intuition FEATs involving criminal practices. The hero also gains a Contact in either the police or crime areas.",
    "category": "Professional Skills",
    "notes": "Also known as Criminology.",
    "effects": {
      "Reason": "+1CS on FEATs involving criminal practices",
      "Intuition": "+1CS on FEATs involving criminal practices",
      "Contacts": "Gains a Contact in police or crime areas"
    }
  },
  "Criminology": {
    "description": "The hero with this Talent has an understanding of the criminal mind and behavior, either from studies or first-hand observation. The character with this Talent gains a +1CS on all Reason and Intuition FEATs involving criminal practices. The hero also gains a Contact in either the police or crime areas.",
    "category": "Professional Skills",
    "effects": {
      "Reason": "+1CS on FEATs involving criminal practices",
      "Intuition": "+1CS on FEATs involving criminal practices",
      "Contacts": "Gains a Contact in police or crime areas"
    }
  },
  "Psychiatry": {
    "description": "The hero with this Talent has a background in studies of the mind, and as such gains a +1CS on all FEATs involving the mind. This is a popular Talent with those heroes and villains with Mental Powers, and the character with these Talents gains a +1CS on FEATs involving Mental Control, Domination, Hypnosis, Emotion Control, and Mental Probe Powers.",
    "category": "Professional Skills",
    "effects": {
      "Mind FEATs": "+1CS on all FEATs involving the mind",
      "Mental Powers": "+1CS on Mental Control, Domination, Hypnosis, Emotion Control, and Mental Probe"
    }
  },
  "Detective/Espionage": {
    "description": "The hero with this Talent has been trained to notice small clues in solving crimes. The character with this Talent gains a +1CS to discover clues to a crime, and in addition gains a Contact in either crime, law enforcement, law, or espionage.",
    "category": "Professional Skills",
    "effects": {
      "Clue Discovery": "+1CS to discover clues to a crime",
      "Contacts": "Gains a Contact in crime, law enforcement, law, or espionage"
    }
  },

  // ===== SCIENTIFIC SKILLS =====
  "Chemistry": {
    "description": "A +1CS on matters of chemistry, including developing new formulas, finding cures for inorganic poisons, and identifying chemicals by smell, touch, or taste.",
    "category": "Scientific Skills",
    "effects": {
      "Reason": "+1CS on chemistry matters (formulas, inorganic poisons, chemical identification)"
    }
  },
  "Biology": {
    "description": "A +1CS on matters of biology, including animal and plant identification, finding cures for organic poisons, and researching diseases and their cures.",
    "category": "Scientific Skills",
    "effects": {
      "Reason": "+1CS on biology matters (animal/plant ID, organic poisons, diseases)"
    }
  },
  "Geology": {
    "description": "A +1CS on matters involving the Earth, including volcanic activity, the geology of the surrounding land, types of rocks and their powers, and mineral identification.",
    "category": "Scientific Skills",
    "effects": {
      "Reason": "+1CS on earth/geology matters (volcanic activity, rocks, minerals)"
    }
  },
  "Genetics": {
    "description": "A +1CS on matters involving the genes, including creating new life forms, understanding mutants, and researching diseases.",
    "category": "Scientific Skills",
    "effects": {
      "Reason": "+1CS on genetics matters (new life forms, mutants, disease research)"
    }
  },
  "Archeology": {
    "description": "A +1CS on matters involving the past, including paleontology, historical records, and ancient myths and legends.",
    "category": "Scientific Skills",
    "effects": {
      "Reason": "+1CS on matters involving the past (paleontology, history, myths)"
    }
  },
  "Archaeology": {
    "description": "A +1CS on matters involving the past, including paleontology, historical records, and ancient myths and legends.",
    "category": "Scientific Skills",
    "effects": {
      "Reason": "+1CS on matters involving the past (paleontology, history, myths)"
    }
  },
  "Physics": {
    "description": "A +1CS on matters involving physics and astrophysics, including motion, flight, and the planets and stars.",
    "category": "Scientific Skills",
    "effects": {
      "Reason": "+1CS on physics/astrophysics matters (motion, flight, planets, stars)"
    }
  },
  "Computers": {
    "description": "A +1CS on matters involving computers, computer-controlled equipment, and artificial intelligences.",
    "category": "Scientific Skills",
    "effects": {
      "Reason": "+1CS on computer matters (computers, computer-controlled equipment, AIs)"
    }
  },
  "Electronics": {
    "description": "A +1CS on matters involving electronic devices, including their creation and repair.",
    "category": "Scientific Skills",
    "effects": {
      "Reason": "+1CS on electronic devices (creation and repair)"
    }
  },

  // ===== WEAPON SKILLS =====
  "Guns": {
    "description": "Individuals without this Talent fire guns (all handguns, rifles, and submachine guns, including laser, stun, and concussion varieties) at their Agility rank. Those with this Talent fire such weapons at +1CS.",
    "category": "Weapon Skills",
    "effects": {
      "Agility": "+1CS with all firearms (handguns, rifles, submachine guns, laser, stun, concussion)"
    }
  },
  "Thrown Weapons": {
    "description": "Characters with this Talent toss weapons designed to be thrown (including spears, daggers, Shuriken, disks, and snowballs) at +1CS to their Agility.",
    "category": "Weapon Skills",
    "effects": {
      "Agility": "+1CS with thrown weapons (spears, daggers, Shuriken, disks)"
    }
  },
  "Bows": {
    "description": "Bows are tricky items to operate, such that those who have not been trained fire them at -1CS to their Agility. Those with this Talent gain a +1CS to hit with all bows, including crossbows, and may fire and reload in a single round. They may fire multiple arrows on a successful Agility FEAT.",
    "category": "Weapon Skills",
    "notes": "Without this Talent, bows are fired at -1CS to Agility.",
    "effects": {
      "Agility": "+1CS to hit with all bows and crossbows",
      "Reload": "May fire and reload in a single round",
      "Multiple Arrows": "May fire multiple arrows on a successful Agility FEAT"
    }
  },
  "Blunt Weapons": {
    "description": "Characters with this Talent gain a +1CS to hit when attacking with a weapon that resolves attacks on the Blunt Attacks column of the Battle Effects Table.",
    "category": "Weapon Skills",
    "effects": {
      "Fighting": "+1CS to hit with blunt weapons (Blunt Attacks column)"
    }
  },
  "Sharp Weapons": {
    "description": "Characters with this Talent gain a +1CS to hit when attacking with a weapon that resolves attacks on the Edged Attack column of the Battle Effects Table. This includes swords, daggers (unless thrown), and spears, but excludes claws and other natural extensions that inflict this type of damage.",
    "category": "Weapon Skills",
    "effects": {
      "Fighting": "+1CS to hit with edged weapons (swords, daggers, spears; not claws/natural weapons)"
    }
  },
  "Oriental Weapons": {
    "description": "This is a special category that grants the character a +1CS to Fighting or Agility when using the following weapons: Shuriken, crossbows, sais (treat as swords), and oriental swords and daggers (including the katana and the kris).",
    "category": "Weapon Skills",
    "effects": {
      "Fighting/Agility": "+1CS when using Shuriken, crossbows, sais, katana, kris, and other oriental weapons"
    }
  },
  "Marksman": {
    "description": "The character with this Talent gains a +1CS to hit with any distance weapon that requires line of sight to hit (the character could benefit when firing heavy artillery, but not when controlling a tele-guided missile). Such a weapon in the hands of a marksman does not suffer penalties to hit from range.",
    "category": "Weapon Skills",
    "effects": {
      "Agility": "+1CS to hit with line-of-sight distance weapons",
      "Range": "No range penalties when using distance weapons"
    }
  },
  "Weapons Master": {
    "description": "The character with this Talent gains a +1CS to hit with any weapon that requires a Fighting FEAT to hit.",
    "category": "Weapon Skills",
    "effects": {
      "Fighting": "+1CS to hit with any weapon requiring a Fighting FEAT"
    }
  },
  "Weapons Specialist": {
    "description": "The character with this Talent gains a +2CS with a single weapon of choice. This may be any type of weapon, missile or melee. The character who is a weapon specialist will also increase his initiative when using this weapon by 1.",
    "category": "Weapon Skills",
    "effects": {
      "Chosen Weapon": "+2CS with a single weapon of choice (missile or melee)",
      "Initiative": "+1 to initiative when using the chosen weapon"
    }
  }
};
