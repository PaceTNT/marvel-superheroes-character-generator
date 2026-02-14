// Power Details Data for Marvel Superheroes RPG
// Auto-generated from power-details-*.json files
// Contains detailed descriptions, examples, notes, and special rules for each power

const POWER_DETAILS_DATA = {
  "Body Armor": {
    "description": "A hero with Body Armor has a natural resistance to physical damage and, to a lesser extent, energy attacks. Body Armor does not affect attacks which have an intensity that must be checked against a FEAT roll, unless to require that FEAT the attack passes through the Body Armor. Body Armor absorbs an amount of damage from any physical attack equal to the Power rank number of the Body Armor. If an attack does not equal or better the amount of Body Armor, then none of the effects of the attack take place.",
    "example": "A dagger hurled at the Thing will not hurt him, even if a 'Kill' result is called for, if the damage from the dagger does not get through his hide. A Sonic attack ignores Body Armor, as it does not need to pass through the Body Armor. A poison-tipped dagger must get through the Body Armor in order to affect the hero with the poison.",
    "notes": "Body Armor is proof against physical attacks, including Blunt and Edged attacks, Shooting, Throwing attacks, Force, Grappling, and Charging attacks. It is less effective against Energy attacks, and its Power rank number is 20 points less than listed for any Energy attack. Body Armor may be natural (inborn) or artificial material. Certain types of attack are more effective against one type than the other (e.g., Claws vs artificial, Rotting Touch vs natural). Artificial Body Armor has the advantage that it can be removed. Body Armor may be increased by one rank by accepting a -1CS to Agility (Agility may never be dropped below Feeble).",
    "battleSuit": "High technology heroes who choose Body Armor may choose to have a battle-suit. All of the hero's other Powers are included in the suit, and the suit is considered artificial Body Armor. The high technology hero receives potential bonuses to his physical abilities (FASE) when wearing the suit."
  },
  "Water Breathing": {
    "description": "This Power allows the hero to breathe water (fresh or salt) as if air. No Power rank is needed for this Power. In addition, this Power allows the hero to see underwater as if on land (vision is reduced in the underwater realm), and survive at great depths. The hero's next Power may be either Swimming or Animal Communication and Control (Sea life). The hero may choose both, but then only breathes water, and will 'drown' on dry land (reverse of characters drowning in water).",
    "example": null,
    "notes": null,
    "bonusPower": "Swimming or Animal Communication and Control (Sea life)"
  },
  "Absorption Power": {
    "description": "The hero with this Power may absorb a certain specific type of damage (for example, fire-based damage, energy damage, or kinetic/physical damage). Any attacks made in the specified mode inflict no damage; rather the damage is absorbed, healing existing damage and even temporarily raising the individual's Health by the Power rank involved. Damage above the rank number of the Power does inflict damage, but the points of such damage may be redirected towards opponents in the next round. Any such absorbed energy dissipates 10 rounds after it has been absorbed, and must be discharged before then or it is lost.",
    "example": "A hero with Health of 100 and Amazing (48) Electrical Absorption may be hit with a lightning bolt and have his Health raised to 148. If that character later takes 30 points of damage, these points are removed from the 48 extra points initially. If the effects of the energy wear off, the character still has 100 points of Health.",
    "notes": "Health loss is taken from the absorbed Power first, then from the actual Health of the hero."
  },
  "Regeneration": {
    "description": "The hero with this Power heals faster than the normal rate of Endurance Rank per day. A hero with Regeneration recovers the Endurance Rank every 10 turns (one minute), providing the hero does not take additional damage in that time and is able to rest. A hero resting cannot engage in any other actions while healing himself; if that rest is interrupted, the hero must start again to recover.",
    "example": null,
    "notes": null
  },
  "Solar Regeneration": {
    "description": "The hero with this Power heals as per Regeneration, but only heals the Power rank in Health every ten minutes he is in the sunshine. In darkness, inside buildings, and in other similar situations, the character heals normally.",
    "example": null,
    "notes": null,
    "minimumRank": "Endurance +1CS"
  },
  "Recovery": {
    "description": "The hero with this Power recovers from losses of Endurance ranks at a rate of 1 rank per day, and makes a Power rank FEAT to regain the lost rank.",
    "example": null,
    "notes": null,
    "bonusPower": "Any Resistance"
  },
  "Life Support": {
    "description": "The hero with this Power has the potential to survive under hostile conditions for longer than normal amounts of time. The Power rank number is the amount of time in turns the hero may survive in a hostile environment (deep space, deep underwater, in lava) before any Endurance FEATs must be made. At Shift Z or higher, the individual may survive in hostile environments indefinitely without requiring food, water, or air.",
    "example": null,
    "notes": null
  },
  "Pheromones": {
    "description": "Pheromones are a specialized form of Emotion Control that affect the pleasure centers of the opposite sex. When this Power is in operation, female individuals (if the hero is male) or male individuals (if the hero is female) must make a Psyche FEAT against the Power rank number of this Power as Intensity or be considered Friendly to the character. Robots, aliens, and those unable to smell or be affected by the pheromones (behind a force field, for example) are not affected.",
    "example": null,
    "notes": "Characters that are Hostile will still be attracted to the character, but that attraction will not stop them from putting the hero in a deathtrap, from which the only release is for the hero to profess his love for the Hostile character and join her in crime."
  },
  "Damage Transfer": {
    "description": "This Power is a relative of the Health-Drain Touch, except Health may be transferred between two separate targets on touch, in effect healing one while reducing the Health of the other. The hero may not regain any Health in this Damage Transfer.",
    "example": null,
    "notes": null
  },
  "Healing": {
    "description": "This Power allows the hero to restore lost Health and Endurance ranks to others (but not the hero himself). The Power rank indicates the maximum amount of Health that may be restored to one hero maximum, on any one day. For each attempt at healing, the hero must make an Endurance FEAT -- failure indicates the loss of Karma equal to the amount of Health being healed. A character without Karma may not Heal.",
    "example": null,
    "notes": "Endurance ranks may be similarly restored at a rate of one rank per day per hero. An Endurance FEAT is required for the healing hero, with the result of a failure being the loss of one Endurance Rank for the hero (the Endurance for the other is healed). This Endurance may only be healed naturally. If the Endurance drops below Feeble, the healer will perish."
  },
  "Immortality": {
    "description": "The character with this Power does not age or die in a normal fashion. The hero can still suffer loss of Endurance ranks as the result of wounds, poisons, and damages, but if the results call for perishing, then the character is left at Shift 0 Endurance but does not die. The character cannot move or act until Endurance reaches Feeble. An immortal character's body will slowly regenerate lost parts and heal, so that short of atomizing the remains and spreading that collection of atoms through a large portion of space, the immortal character will return at some point in the future.",
    "example": "Throwing an Immortal character into an active volcano will keep him out of the way for a while (he cannot heal while taking damage).",
    "notes": "This Power does not have a Power rank. It counts as two Powers for any hero who takes it, unless the character is alien in origin, in which case the cost is normal (this reflects that a large number of extra-dimensional aliens are effectively immortal). If Endurance reaches Shift 0, or the character otherwise dies, the immortal character loses all Karma, including that set aside for advancement. Immortality is applicable to the Earth Dimension only (including all planets of this dimension). An immortal character in another dimension (such as Asgard or Olympus, but excluding variant or divergent earths) does not age, but may be killed normally while in that dimension."
  },
  "Extra Body Parts - Offensive": {
    "description": "The hero who gains this Power when the character is generated may choose the type and number of body parts. Some of these parts may provide Bonus Powers. These Powers are then placed in the next available slot in Power generation, if there is one.",
    "example": null,
    "notes": null,
    "subtypes": [
      {
        "name": "Additional Arms",
        "bonusPower": "Extra Attacks"
      },
      {
        "name": "Additional Legs (including centaur-like form)",
        "bonusPower": "Lightning Speed"
      },
      {
        "name": "Prehensile Tail",
        "bonusPower": "Climbing",
        "notes": "Hero may use the tail as a limb with normal Agility"
      },
      {
        "name": "Wings",
        "bonusPower": "Flight",
        "notes": "Flight at +1CS"
      },
      {
        "name": "Combat Tail",
        "bonusPower": null,
        "notes": "Not usable for climbing, but may attack in slugfest for Strength +1CS damage"
      },
      {
        "name": "Additional Eyes or Sensory Organs",
        "bonusPower": "Enhanced Senses or any detection Power"
      },
      {
        "name": "Claws",
        "bonusPower": "Claws",
        "notes": "+1CS to their material strength"
      },
      {
        "name": "Spines",
        "bonusPower": "Projectile Missile",
        "notes": "Quill-like spines that may be shot. Projectile Missile at +1CS"
      }
    ]
  },
  "Extra Attacks": {
    "description": "This Power is always +1CS better than the starting Fighting ability. Use this Power instead of Fighting to make multiple attacks. There is no penalty for failing with this roll, but the individual may make only one effective attack in that round.",
    "example": null,
    "notes": null,
    "minimumRank": "Fighting +1CS"
  },
  "Claws": {
    "description": "Claws are sharp pointy items that inflict damage on the Edged Attack column of the battle effects table. As with most sharp things, they inflict the listed amount and effect, and cannot be reduced in damage or effect. The Power rank lists both the damage inflicted by the claws and the material strength. The damage cannot be increased from its initial roll except by raising the experience, but the initial material strength can be increased by accepting limitations. Grant a +2CS to the material strength of the claws when the hero accepts any limitations, including limitations required by other Powers.",
    "example": "Wolverine goes up against a Sentinel with his Unearthly material strength claws which inflict Good damage. If he attacks the Sentinel directly he won't get too far; the robot's Body Armor is too thick. If he concentrates on the armor, however, he can shred it with a Red FEAT roll. This trick would not operate on Iron Man (personal Force Field) or the Thing (natural Body Armor).",
    "notes": "Against living creatures, claw attacks are resolved on the Edged Attack column for Power rank damage. Against non-living materials, compare the material strength of the claws against the material strength of the object. Make a Strength FEAT roll to determine if the object holds up to the attack. This applies to Body Armor that is not natural (inborn) as well as doors, walls, and other inanimate objects. This does not apply to Body Armor that is a natural part of the character, or to energy constructs such as force fields."
  },
  "Paralyzing Touch": {
    "description": "Those touched by an individual with this Power must make an Endurance FEAT against this Power rank, or be knocked out for 1-10 rounds. This Power is always in operation, and the user may be knocked out himself by such a touch.",
    "example": null,
    "notes": null
  },
  "Energy Touch": {
    "description": "The hero with this Power may inflict damage and effects from the Energy column of the Battle Effects table, with a Bullseye regarded as a possible Stun. The hero may always choose to inflict less damage than is rolled, or to reduce the effects of the damage. The touch can be carried through conductive material, and may affect multiple targets in this fashion.",
    "example": "If the hero is standing on a steel girder facing off three goons from HYDRA, and uses the Energy Touch on the girder (a conductive material), all three get shocked.",
    "notes": null,
    "bonusPower": "Resistance to Electricity"
  },
  "Rotting Touch": {
    "description": "This touch causes organic material to decay. The character inflicts Power rank damage on those he touches. In addition, this touch acts on organic material (wood, rope, cloth) as if an attempt to break the item with Power rank Strength. Resistance to Corrosives will offset the effects. This Power can be directed against organic (natural) Body Armor in order to weaken it, similar to the effect claws have on inorganic Body Armor.",
    "example": null,
    "notes": null
  },
  "Corrosive Touch": {
    "description": "Similar to Rotting Touch, but affects inorganic materials instead. The character inflicts Power rank -3CS damage to living targets, affects organic materials with greatly reduced damage (as for living targets), and acts on inorganic material as if breaking it with Power rank Strength. Resistance to Corrosives will offset these effects. Similar to Claws, this may chew through inorganic Body Armor to affect the individual beneath.",
    "example": null,
    "notes": null
  },
  "Health-Drain Touch": {
    "description": "The touch of a character with this Power transfers a Power rank amount of Health from the target to the hero. Previous damage is healed in an equal amount, up to the maximum Health of the character. Drained Health above that point is lost. Characters drained to 0 Health must make an Endurance FEAT to avoid dying. If they do so, the attack has no further effect.",
    "example": null,
    "notes": null,
    "powerStunts": [
      "Reversing this process, directing one's own Health into others"
    ]
  },
  "Blinding Touch": {
    "description": "The touch of this character can blind the unprotected target for 1-10 rounds. The hero with this Power must make a Stun or Slam result to blind. The target receives no attempt to avoid this touch, unless the target possesses Protected Senses or something similar to prevent the touch (such as a helmet with covered eye slits).",
    "example": null,
    "notes": null
  },
  "Growth": {
    "description": "The hero with this Power can grow taller at will. The limit of growth is determined by the Power rank, as noted on the table below. The hero may use his Power rank instead of Strength when performing Feats of Strength, including wrestling combat. Charging, slugfest, and missile attacks on an enlarged character all receive positive column shifts to hit.",
    "example": null,
    "notes": "Characters that experience growth usually but not always draw their additional mass from an unknown source. Characters with growth are not slowed or impaired by their added mass. For Unearthly+ individuals, a strength of at least Monstrous is required to support the body or else 30 feet is the maximum the hero may assume on Earth. The hero may choose (as a limitation) to have the Power always in effect, raising the Power one rank initially but fixing the hero at that size permanently.",
    "table": {
      "title": "Growth Table",
      "columns": [
        "Rank",
        "Height (feet)",
        "Plus to be Hit"
      ],
      "rows": [
        [
          "Feeble",
          "8",
          "+1 CS"
        ],
        [
          "Poor",
          "10",
          "+1 CS"
        ],
        [
          "Typical",
          "12",
          "+1 CS"
        ],
        [
          "Good",
          "14",
          "+1 CS"
        ],
        [
          "Excellent",
          "16",
          "+1 CS"
        ],
        [
          "Remarkable",
          "18",
          "+2 CS"
        ],
        [
          "Incredible",
          "20",
          "+2 CS"
        ],
        [
          "Amazing",
          "22",
          "+2 CS"
        ],
        [
          "Monstrous",
          "25",
          "+3 CS"
        ],
        [
          "Unearthly",
          "30",
          "+3 CS"
        ],
        [
          "Shift X",
          "40",
          "+3 CS"
        ],
        [
          "Shift Y",
          "50",
          "+3 CS"
        ],
        [
          "Shift Z",
          "100",
          "+3 CS"
        ]
      ]
    }
  },
  "Shrinking": {
    "description": "The hero with this Power can make himself smaller, while retaining the original strength and abilities. The hero's Strength is unaffected by the shrinking. In addition, the hero may have a column shift modifier that reflects the increase in attacks against larger (normal-sized) foes and the reduction suffered by such foes attacking the hero.",
    "example": null,
    "notes": "Shrinking Power at Shift X capability, or multiple shifts that reduce the individual's size below one ten-thousandth of original size, cross the Pym barrier and throw the individual into a subatomic 'Microverse'. Further reductions are apparently not possible once in the Microverse.",
    "table": {
      "title": "Shrinking Table",
      "columns": [
        "Rank",
        "Height (inches)",
        "Column Shift"
      ],
      "rows": [
        [
          "Feeble",
          "48",
          "0"
        ],
        [
          "Poor",
          "24",
          "0"
        ],
        [
          "Typical",
          "12",
          "0"
        ],
        [
          "Good",
          "6",
          "1"
        ],
        [
          "Excellent",
          "3",
          "1"
        ],
        [
          "Remarkable",
          "1",
          "2"
        ],
        [
          "Incredible",
          "0.5",
          "2"
        ],
        [
          "Amazing",
          "0.25",
          "2"
        ],
        [
          "Monstrous",
          "0.1",
          "3"
        ],
        [
          "Unearthly",
          "0.01",
          "3"
        ],
        [
          "Shift X+",
          "Special",
          "Special"
        ]
      ]
    }
  },
  "Density Manipulation - Self": {
    "description": "The hero with this Power can alter his mass at will. Density may range from Shift 0 (almost intangible) to the Power rank of the ability. The hero who has altered mass weighs as much as a character with that strength could lift. An individual gains Body Armor equal to his current Power rank. The character may inflict charging damage using the Power rank instead of Strength, and may affect materials of lesser material strength than the current Power rank.",
    "example": "A hero with Feeble Density would weigh 50 lbs, while one with Shift 0 would be effectively weightless.",
    "notes": "In the Shift 0 state the hero may not initially pass through solid items (Phasing), but is immune to physical attacks (though not energy or force attacks). If the density of the character is higher than the individual's Endurance, both Fighting and Agility suffer a -1CS penalty.",
    "powerStunts": [
      "Solidify inside a target (not available initially, must be developed). Solidifying inside a non-living object: treat the character's Power rank as Strength to determine the FEAT needed against the material strength. Disrupting the material results in damage to the hero equal to the material strength of the target.",
      "Solidify inside a living target: make a FEAT against the Endurance of the target. If the target makes a successful FEAT, no damage is inflicted. If the target fails, the target takes damage equal to the Power rank and must make a second Endurance FEAT to avoid losing consciousness."
    ]
  },
  "Phasing": {
    "description": "This is similar to Density Manipulation, save that it pulls the molecules of a body out of phase with those of the surrounding area, allowing the hero to 'phase' through solid items. While phased, the hero is immune to physical and most energy attacks, but is still subject to the effects of mental attacks and magic. The hero may pass through other objects if the Power rank exceeds the material strength of the object, and may pass through force fields of lower material strength by making a green FEAT roll.",
    "example": null,
    "notes": "The phasing individual may not pass through materials of greater material strength, or force fields of equal or greater material strength than the hero's Power rank. While phased, the hero may not make physical attacks. Phasing has a detrimental effect on electronic devices. Unless the hero does not require air, the duration of any given phase is that of the hero's ability to hold his breath.",
    "powerStunts": [
      "Disrupting electronic devices by phasing through them (use Endurance for robots, Reason for equipment; failure results in loss of Health equal to Power rank)",
      "Affecting another being in contact",
      "Walking on air at normal speed",
      "Phasing inside an ally, granting that ally the phasing abilities",
      "Phasing in, striking, and phasing back out in a single round (only attacks made at the instant of the phaser's attack will affect the hero)",
      "Phasing in part of the body, allowing the remainder to remain out of phase or vice versa (always a red Power FEAT)"
    ]
  },
  "Invisibility": {
    "description": "The hero with this Power can make his body invisible to normal sight. This Power does not negate location by other senses, nor does it initially negate location by heat or ultraviolet sources. The hero still has mass and substance (coating the hero with dust or paint reveals the true form, as does fog or rain). The hero may remain invisible as long as desired, and the Power rank has no effect on whether the hero becomes invisible under normal circumstances.",
    "example": null,
    "notes": "The Power rank is used in connection with various Power Stunts that may be developed.",
    "powerStunts": [
      "Making others invisible on touch",
      "Making others invisible over Power rank range (must first master invisibility on touch)",
      "Making invisible objects visible (FEAT roll determined by the Intensity of the opponent's invisibility; if there is no stated rank, consider it to be Good rank invisibility)",
      "Making a specific part of the body invisible (clothing, a mask, a hand, etc.)",
      "Extending invisibility to more than the physical body, thereby effectively becoming undetectable by heat vision, ultraviolet, and so forth"
    ]
  },
  "Plasticity": {
    "description": "The body of the hero with this Power is slightly elastic and malleable, and the hero manipulates his body as he sees fit. The hero with this Power may also choose Elongation as a bonus Power, placing that Power in the next slot without a random roll. The plasticity of the body serves as Power rank Body Armor.",
    "example": null,
    "notes": null,
    "bonusPower": "Elongation",
    "powerStunts": [
      "Using the Power rank instead of Agility for catching falling items and individuals (the character takes no damage from a falling character landing on him)",
      "Limited imitation and disguise abilities at -2CS for detection (Plasticity will alter appearance, but not skin color or voice)",
      "Bouncing: similar to the Leaping Power, with the hero able to fall a number of floors equal to his Power rank number without damage, and to leap as if possessing that Power at -1CS"
    ]
  },
  "Elongation": {
    "description": "Elongation is similar to the Power of Plasticity, but differs primarily in that it allows the character to extend his body and limbs over a number of areas. The character with this Power may attack non-adjacent foes in close combat types of attacks (slugfest, grappling, etc.). The target of these attacks may only make close attacks against the part of the opponent that is attacking, and as such may not benefit from Kill, Stun, and Slam results.",
    "example": "Doctor Octopus and Machine Man both have Elongation without Plasticity, while Mr. Fantastic has both these Powers and can elongate any part of himself.",
    "notes": "A character with this Power may extend a number of yards equal to his Power rank number.",
    "table": {
      "title": "Elongation Range Table",
      "columns": [
        "Rank Number",
        "Number of Yards",
        "Areas"
      ],
      "rows": [
        [
          "Up to 22",
          "Up to 22",
          "0.5"
        ],
        [
          "Up to 44",
          "Up to 44",
          "1"
        ],
        [
          "Up to 66",
          "Up to 66",
          "1.5"
        ],
        [
          "Up to 88",
          "Up to 88",
          "2"
        ],
        [
          "Up to 100",
          "Up to 100",
          "3"
        ],
        [
          "Over 100",
          "Over 100",
          "5"
        ]
      ]
    }
  },
  "Shape-Shifting": {
    "description": "This Power allows the hero to radically modify his shape to resemble other objects or beings, to the point of being that object to all appearances (touch, taste, etc.). The degree of success of the shape change is determined by a Power rank FEAT against the investigating creature's Reason, Intuition, or Psyche, whichever is higher. A character may not gain more than half his height or shrink to half his original size. Only obvious, visible physical Powers may be gained by shifting shape (claws, gliding membranes, etc.). True super powers may not be gained in this fashion.",
    "example": null,
    "notes": null,
    "powerStunts": [
      "Develop claws and/or teeth, allowing the shape-shifting character to inflict Edged Attack damage",
      "Develop Gliding Power (but not true flight) at -2 Power rank ability",
      "Duplicate material strength to the point of providing Body Armor of the material strength of the object imitated -1CS or the Power rank -2CS, whichever is less"
    ]
  },
  "Imitation": {
    "description": "A specialized form of Shape-shifting that allows the hero to duplicate the appearance of other humanoid forms, up to the limits of Shape-shifting (half-again or half of original size). The character with Imitation may duplicate the appearance, voice, and mannerisms (but not Powers, Talents, or abilities) of a specific individual. The hero must have seen the individual previously for a sufficient period to duplicate him. The success of the imitation is determined by a Power rank FEAT, against the Reason, Intuition, or Psyche of the person being fooled, whichever is lower.",
    "example": null,
    "notes": "A hero with imitative Powers may attempt to duplicate a character with high Popularity and/or powerful Contacts. If successful, the character may be treated as if he has that Popularity, and his actions would be ascribed to the character he is imitating."
  },
  "Body Transformation - Self": {
    "description": "Similar to Body Transformation - Other, with the added advantage of normal mobility and cognizance while in the transformed state. The character gains Body Armor equal to the material strength of the material, or the Power rank, whichever is lower. In addition, the character gains any special functions of that material.",
    "example": null,
    "notes": "A hero who is damaged while in transformed state takes damage as normal but if destroyed in this form may reintegrate if any Health remains. If dropped to 0 Health, the character could not reintegrate until some of the damage healed naturally or from outside influence. The pieces may integrate only if within one area. The hero gains +1CS if he confines his body transformation to one state (solid, liquid, gas, or energy), and +2CS if he limits himself to a particular type of matter or energy.",
    "examples": [
      "Becoming water or another liquid allows the character to move as a liquid through tight spaces, pipes, etc.",
      "Lodestone makes the character magnetically attractive at a Strength equal to his Power rank.",
      "Becoming Vibranium bestows the Powers of that substance. Becoming Adamantium only grants the Power rank Body Armor, unless the Power rank was above Class 1000.",
      "Becoming a vapor or gas allows the character to fly at Power rank speed, but makes him particularly vulnerable to wind and air control attacks (+2CS for effect). The Intensity of concealment or knockout/poison abilities of the gas is equal to the Power rank.",
      "Becoming an energy state grants the Powers of that energy state at Power rank -2CS. Energy states include fire, cold, X-rays, radio waves, or other radiation."
    ]
  },
  "Animal Transformation - Self": {
    "description": "This Power allows the hero to assume the form of a normal animal with all applicable Powers of that animal. Weight and height are that of a normal version of that particular animal. The animal's Reason, Intuition, and Psyche may be that of either the character or the animal, but if any are of the animal, then a Power rank FEAT must be made.",
    "example": "Wolfsbane only becomes a wolf, and as such makes no transformation check.",
    "notes": "It requires a Power rank FEAT to make the transformation from hero to animal, but it may be made without such a roll if a single animal type is chosen. Any other super-human Powers are lost while in animal form."
  },
  "Raise Lowest Ability": {
    "description": "Not really a Power by any means, but a method of immediate self-improvement for a character that may be suffering from terminally low stats in a critical area. Only one of the seven abilities may be modified in this fashion, and then only the lowest one (if two are lowest, the hero gets to choose which one is modified). The ability is raised 20 points. The hero may then choose his next Power from the complete list.",
    "example": "A character with Feeble Strength who carries a mystic sword and has Body Armor could raise that Strength by 20 points.",
    "notes": null
  },
  "Blending": {
    "description": "The hero has the ability to change his shade to blend in with his surroundings, and has in effect a specialized form of Invisibility. The hero (and his uniform, if made of unstable molecules) are hidden with Power rank ability, and will not be detected until the character moves or acts.",
    "example": null,
    "notes": "Should a hero choose a limitation (such as the Power only works at night, or only in forests), the Power is raised +2CS, as opposed to the standard +1CS."
  },
  "Power Absorption": {
    "description": "The acquiring of other individuals' super-human Powers and abilities. Only those naturally occurring powers and abilities may be absorbed, though Robot PCs with this Power may duplicate items of technology as well. The character must touch the target in order to gain those abilities, and the target may make a Psyche or Endurance FEAT to avoid the effect. The type of FEAT is determined by the player when the character is created.",
    "example": null,
    "notes": "The maximum of any ability so acquired is limited to the Power rank of the Power Absorption. If a Power or ability is of a higher rank, the hero making the attempt must make a successful Psyche FEAT or be knocked out by the backlash for 1-10 rounds, and would only gain the Power at the hero's Power Absorption rank. A character starting with this Power may only acquire one Power or ability per attack. While the Power-absorbing hero has the Power of another, the character from whom he took it cannot use it. Characters with basic abilities reduced to below Feeble are unconscious for 1-10 rounds.",
    "limitations": [
      "Only functions on Powers",
      "Only functions on Talents",
      "Only functions on Abilities",
      "Takes memories as well, but if target's Psyche is higher than the hero's, the hero must make a Psyche FEAT to determine who controls the hero's mind",
      "Transfer may be permanent (Karma reduced to 0, and effects of memories regardless of target's Psyche level)"
    ]
  },
  "Alter Ego": {
    "description": "The hero can transform into a 'normal' individual, which often allows a hero to escape a trap that would confound his super-human self. An alter ego is not the same thing as a secret ID (such as possessed by Spider-Man). It is a separate persona, also controlled by the player. Abilities for this character are rolled as for Normal Folks (column 2).",
    "example": null,
    "notes": "An alter ego has no super Powers, and the hero who creates him must decide if the Contacts are enjoyed by the hero, the alter ego, or both. Talents remain the same for hero and alter ego. Popularity is split as for a secret ID. Karma is gained and lost separately by the hero and the alter ego; they cannot spend Karma from each other's Karma pools. Transformation from alter ego to hero is immediate. If the hero chooses a limitation (such as the transformation takes 1-10 rounds, requires a specific item, or Talents are not shared by the two personas), then one of the hero's Abilities may be raised one rank (Unearthly maximum)."
  },
  "Projectile Missile": {
    "description": "A projectile missile represents a specially designed weapon that inflicts damage according to the Shooting column. This is usually some form of technological device, but not always. This weapon is specialty designed for the character, and the hero suffers no penalty for range when firing it (other individuals that may get their hands on it would suffer such a penalty). The hero uses his Agility to determine if the attack hits. The weapon or device has Power rank range and damage, and any increase in its abilities through advancement is considered to be from tinkering and improvement (the device is not affected by the rules for building and inventing items).",
    "example": "Examples of this type of weapon are specialized handguns, needle guns, wrist-rockets, and portable artillery.",
    "notes": null
  },
  "Ensnaring Missile": {
    "description": "An ensnaring missile is a device that makes a form of grappling attack. The hero making the attack rolls an Agility FEAT to hit, and any hit is considered to have entangled the opponent. This entangling is the equivalent of a grappling attack of Power rank Strength, and the ensnarement is considered to have Power rank material strength. This Power may be increased in Power rank by accepting any one of a number of limitations.",
    "example": null,
    "notes": null,
    "limitations": [
      "Ensnarement only affects one target",
      "Ensnarement wears off after 1-10 rounds",
      "Ensnarement weakens by one material strength rank each turn",
      "Ensnarement has a limited number of charges"
    ]
  },
  "Ice Generation": {
    "description": "The hero may draw water from the ambient atmosphere (nearby area) and convert it to ice, which the hero may then use initially as a missile weapon. The ice missiles have Power rank range, inflict up to Power rank damage (the hero may throw less-lethal snowballs), and use Agility to hit either on the Blunt Throwing or Edged Throwing battle effect column. The hero may gain one additional Power Stunt at start, and develop others as play progresses.",
    "example": null,
    "notes": null,
    "powerStunts": [
      "Entrap others in ice of Power rank material strength, up to 2 areas away",
      "Give the hero Body Armor of Power rank -1CS Strength. The armor is a thin casing of ice, and as such is vulnerable to fire (fire attacks are +1CS to hit and damage)",
      "Create columns, walls, and other shapes of Power rank -1CS material strength",
      "Create ramps of ice that allow the hero to 'skate' at Power rank -1CS speed. This does not give the hero the effects of Lightning Speed, but properly supported, a ramp can rise two floors per round. These ice ramps are not permanent, and their melting may result in damage to the surrounding area",
      "Create slick spots of Power rank -1CS slipperiness",
      "Project waves of cold as opposed to ice. The cold has Power rank range and intensity, and reduces the opponent's FEATs by -2CS if the intensity is higher than Endurance, -1CS otherwise. This cold may also be used to offset heat damage",
      "Absorb cold and ice (effectively melting the latter) with Power rank ability and capacity"
    ]
  },
  "Fire Generation": {
    "description": "The hero with this Power may project flame with Power rank range and damage, using Agility to hit. Damage is taken on the Energy table. Like Ice Generation, creation of large amounts of flame may damage the surrounding area in a fashion that leads to loss of Karma. The hero may choose to inflict less damage with his flame, or have a lesser effect than rolled on the Universal table. The hero begins play with the ability to use flame as a missile weapon (fire balls or a jet of fire), plus one Power Stunt.",
    "example": null,
    "notes": null,
    "powerStunts": [
      "Create a flaming shield surrounding up to one area. Anyone passing through it takes Power rank damage from fire",
      "Body transformation into fire at -2CS. This body transformation grants Body Armor at the lower rank, as well as Flight at that rank",
      "Create flaming images at Power rank -1CS. These images include duplicates of the flaming form, as well as fire-writing in the sky",
      "Control other forms of fire at -2CS",
      "Absorb fire and heat at Power rank level and range",
      "Project heat at Power rank -1CS. The heat projected causes discomfort and a -1CS on all FEATs in the area of effect"
    ]
  },
  "Energy Generation": {
    "description": "The hero with this Power can fire bolts of force that inflict Energy-type damage, Force-type damage, or either (determined before attack). One type is gained initially, and the other may be developed as a Power Stunt at full effect. The bolts hit for Power rank range and damage, and use Agility to determine if they hit the target. The hero with Energy Generation may choose to inflict less damage than determined, whether in amount of Health lost, or effects of the attack.",
    "example": null,
    "notes": "The character may 'pull his punch' and choose to inflict less damage or lesser effects."
  },
  "Sound Generation": {
    "description": "The hero with this Power can make sonic attacks of up to Power rank range and damage. Sonic attacks are made on the force column, and can initially affect only one target at a time.",
    "example": null,
    "notes": null,
    "powerStunts": [
      "A wide-band attack that affects all in a given area at -1CS Power rank damage",
      "A Stunning attack that affects a single target (or, if possessed, multiple targets), of -1CS intensity. The target must make an Endurance FEAT or become unconscious for 1-10 rounds",
      "Flight at -2CS (-1CS if some form of control such as glider wings or a cape is used to control the glide)",
      "Creation of sonic walls of Power rank -1CS material strength",
      "Absorbing sound of -1CS Power rank, reducing other sonic attacks by that amount",
      "Creating holographic illusions at -2CS Power rank. These creations are semi-real, and can inflict up to Power rank -3CS damage"
    ]
  },
  "Stunning Missile": {
    "description": "The hero possesses a weapon, energy bolt, or Power that either inflicts damage on the Force column, or inflicts a Stunning attack of Power rank Intensity. One of the two types must be chosen at start, though the other may be developed as a Power Stunt. Range and damage are determined by the Power rank, though damage and effects may be voluntarily reduced.",
    "example": null,
    "notes": null
  },
  "Corrosive Missile": {
    "description": "The hero has some form of corrosive, acidic, or matter-hostile attack that inflicts damage over a long period of time. A corrosive attack inflicts Power rank damage the first round, Power rank -2CS damage the second, and Power rank -4CS damage the third. Damage may be halted by washing the exposed material or area. The character with this attack may never choose to inflict less damage. Corrosive attacks may also affect materials and Body Armor. Make a FEAT roll as if the Power rank of the corrosive was an attempt to break the material. Success indicates the attack has burned through or weakened the material such that it is no longer useful or provides no further protection. This FEAT may be made only on materials of lesser material strength than this Power rank.",
    "example": null,
    "notes": "Corrosive attacks must hit the target, and as such have no effect on Force Fields and the like."
  },
  "Slashing Missile": {
    "description": "The hero with this form of weapon makes attacks on the Throwing, Edged column, and may not reduce the effect of the attack. The slashing missile has damage and range equal to this Power rank.",
    "example": null,
    "notes": null,
    "powerStunts": [
      "Develop an attack with a result on the Blunt Throwing column"
    ]
  },
  "Nullifier Missile": {
    "description": "The hero with this type of attack inflicts no damage, but may nullify inborn or technological Powers (one or the other) with Power rank Intensity. The effects of this nullification last for only as long as the hero concentrates. He can concentrate on only a single target within Power rank range at a time. Each round, the target may make a Psyche FEAT (for inborn) or Reason FEAT (for hi-tech) against the intensity of this Power to evade its effects.",
    "example": null,
    "notes": null
  },
  "Darkforce Generation": {
    "description": "The character with this Power may summon the effects of the Darkforce for use as a weapon and for developing Power Stunts. The Darkforce inflicts either up to Power rank damage or has the effect of a Power rank Intensity Stunning attack, affecting the targets for 1-10 rounds. In addition, the character with this Power can develop all the Power Stunts listed for Darkforce Manipulation, except teleportation.",
    "example": null,
    "notes": null,
    "powerStunts": [
      "Create Darkness: By allowing the Darkforce into this dimension, the hero can block out up to 3 areas simultaneously with Power rank darkness. Normal vision is reduced to less than a foot, and those with infravision, special senses that permit seeing in the dark, or light-Powers must make a FEAT against the Intensity of the darkness to use those Powers"
    ],
    "relatedPower": "Darkforce Manipulation"
  },
  "Earth Control": {
    "description": "The hero with this Power can manipulate natural or semi-natural mineral items. The range and ability of these modifications are determined by the hero's Power rank. This Power is limited to naturally occurring materials (dirt, rock, stone), or semi-natural materials that are of consistent nature (concrete, asphalt, and glass). Radically altered items such as steel alloys and artificially constructed mechanisms (including computers, guns, and vehicles), and living or once living things (rubber, wood, or flesh) are beyond the scope of this Power.",
    "example": null,
    "notes": "The Earth Control Power allows the hero to manipulate an amount of material up to the hero's Power rank taken as Strength in every round. The material may be used as a weapon (inflicting material strength damage), or shield (of material strength). The hero starts with no stunts other than the mere manipulation of materials.",
    "powerStunts": [
      "Digging (moving earth out of the way)",
      "Earthquake-type attack (all targets in a given area, damage equal to hero's Power rank)",
      "Create 'earth beings' of stone or rock, with physical abilities whose rank number sum does not exceed the Power rank number, with Body Armor of material strength rank",
      "Transportation (creating a wave of earth that moves, carrying the hero along) of Power rank Speed",
      "Levitation (building a pillar of earth beneath the hero)",
      "Entrapment (opening the earth beneath an opponent's feet, or wrapping stone around them)"
    ]
  },
  "Air Control": {
    "description": "The hero with this Power has the ability to manipulate air, winds, and (potentially) weather. The hero can create shields of wind up to Power rank damage that are effective against all physical missile attacks of that rank or lower. The hero can also use air as a distance weapon, inflicting up to the Power rank of damage, but repelled by any form of Force Field, including shields made of air. The hero can also generate winds of Power rank Intensity.",
    "example": null,
    "notes": "A character with Air Control begins with one Power stunt.",
    "powerStunts": [
      "Flight at Power rank speed",
      "Limited Weather Control: Tornadoes of Power rank Intensity and damage, controlled by Power rank FEAT",
      "Limited Weather Control: Summon Storm",
      "Limited Weather Control: Summon Fog",
      "Lightning of Power rank range and damage",
      "Reducing existing Weather Conditions with Power rank ability, as for each type of weather"
    ]
  },
  "Fire Control": {
    "description": "The hero with this Power can control existing fire sources. He can intensify the fire up to the levels of his Power rank, or may reduce the Intensity of the fire by the same amount, reducing fire damage by the rank number. The hero with this Power can manipulate flame, so as to form a fiery shield that will inflict the Power rank number of damage on those who cross it, but cannot initially use Fire Control to affect targets at a distance (that requires the power Distance Attacks - Fire Generation).",
    "example": null,
    "notes": null,
    "powerStunts": [
      "Using existing flame as a missile weapon",
      "Creating shapes from flame of Power rank number Health and damage",
      "Writing words with flame in the sky",
      "Creating entrapment devices of Power rank damage",
      "Controlling heat to a Power rank degree",
      "Absorbing heat and flame within an area as if Fire Resistance of that Power rank number"
    ]
  },
  "Water Control": {
    "description": "The hero with Water Control Powers can use available liquid water for specific effects. The water can be used as a missile weapon, inflicting Power rank damage at 1 area range. The water can also be used as a shield, having no effect on physical weapons, but reducing energy, force, and fire attacks by the rank number of the Power.",
    "example": null,
    "notes": null,
    "powerStunts": [
      "Creation of watery 'servants' of Power rank Health and Abilities",
      "Using water to speed ships and water vehicles, at Power rank Speed",
      "Creating bubbles of air to allow others to survive underwater",
      "Limited Weather Control: create fog of Power rank Intensity",
      "Limited Weather Control: create storms of Power rank Intensity",
      "Melting solid ice as if Water Control Power was Fire Generation of Power rank Intensity"
    ]
  },
  "Weather Control": {
    "description": "The hero with this Power has the ability to manipulate the forces of weather. Using this Power, the hero can duplicate several Power stunts of other control abilities, and in addition create new stunts as well. Weather Control Power stunts cost only 50 Karma points, not the normal 100 points. The hero does not begin with any Power stunts; all Power stunts must be developed, and use the hero's Power rank to determine if they are successful.",
    "example": null,
    "notes": "Power stunts cost only 50 Karma (half the normal 100).",
    "powerStunts": [
      "Create Fog of Power rank Intensity",
      "Summon storms of Power rank Intensity",
      "Generate winds of Power rank Intensity, including tornadoes capable of inflicting Power rank number damage",
      "Summon Lightning, given stormy conditions, of Power rank damage, hitting its target using the Power rank as Agility",
      "Lower Temperature, causing those in one area to be -1CS on FEATs, and materials to be reduced by one rank in material strength",
      "Raise Temperature, causing those in one area to be -1CS on FEATs. If Power rank is higher than Endurance, target must make an Endurance FEAT to avoid heat prostration (unconscious 1-10 rounds)",
      "Detect Weather at Power rank ability (character may determine changes in the weather up to three days in advance)",
      "Reduce Weather Effects by Power rank ability"
    ]
  },
  "Animate Objects": {
    "description": "The hero with this Power may cause inanimate objects to move and attack at mental command. Animated objects retain their material strength as Strength and Endurance, but have the Agility and Fighting abilities of the Power rank of the animator. Health is considered to be the material strength. The movement and types of attack vary according to the object animated.",
    "example": null,
    "notes": "The hero is unable to animate an object of greater material strength than his Power rank, or of greater weight than he can lift (using physical Strength or other Powers). An item that is in possession of another is not normally able to be animated.",
    "examples": [
      "Stone Statue: May move as character of material strength Endurance. Has Body Armor equal to the material strength.",
      "Furniture: May move up to 2 areas per round, made of Typical material, may perform charging or slugfest attacks.",
      "Swords and other weapons: May be animated and fight as if the animator were wielding them. Such items have a Health equal to their material strength, and may be knocked out of the animator's control by a catching, blocking, or grabbing attack.",
      "A rope that is animated may make a grappling attack of the animator's Power rank, but is made of Poor material strength.",
      "Buttons, levers, and other devices may be activated at a distance by this Power (range determined by Power rank number). Devices which require keys, codes, or have special safety locks may not be activated."
    ]
  },
  "Density Manipulation - Others": {
    "description": "The hero can alter the density of other individuals on touch, either increasing the density (and thereby mass) or reducing the density (take less damage, etc.). The hero must touch his target, and an unwilling target may make a Psyche or Endurance FEAT (target's choice) to avoid the effects. Type of FEAT roll required is determined by the Power rank.",
    "example": null,
    "notes": "Effects last for 1-10 rounds after being applied.",
    "effects": {
      "Density Reduction": "The target becomes vaguely transparent, and as such will become both less vulnerable to attacks and less effective in attacking. All physical attacks on the individual in this state are reduced by this Power rank, and similarly all physical attacks by the affected character are reduced by this Power rank. The affected individual may not phase, but may be affected by winds of Good Intensity or greater.",
      "Density Increase": "The affected individual increases in density (and therefore mass) without the increased strength required to move that mass. Each round, make an Endurance FEAT (type determined by Power rank as Intensity) or the character becomes unconscious. Upon becoming unconscious, make a second Endurance FEAT or the affected individual begins to lose Endurance ranks at a rate of one rank per round, until another Endurance FEAT halts the process. Performing any physical action while under the effects requires an Endurance FEAT."
    }
  },
  "Body Transformation - Others": {
    "description": "The hero with this Power can convert living tissues to other substances. The hero chooses one material and the transformation duration (up to one hour). A target of this Power must be touched, and may make a Psyche or Endurance FEAT (target's choice) to avoid being converted into that substance. While in that form the target has no recollection of what has occurred, and has the material strength of that substance. Flesh-to-flesh contact must be made; a foe in a full body-suit would be immune to this Power.",
    "example": "Warlock turns his opponents to crystal circuitry, Grey Gargoyle turns his to stone.",
    "notes": "Heroes who accept a -2CS shift in initial Power may affect non-living tissue as well, allowing the suit of a body-suited foe to be converted. Materials of a higher material strength than the Power rank are unaffected. The target regains his normal form following the transformation, even if pieces are broken off or dispersed."
  },
  "Animal Transformation - Others": {
    "description": "The hero with this Power can transform human targets into animals and reverse the process. The target must be touched, and must fail a Psyche or Endurance FEAT (target's choice, color of FEAT determined by the Intensity of the power). The target then has the physical attributes (FASE) of the animal, but retains the mental attributes (RIP) of the original form. The touch must be flesh-to-flesh.",
    "example": "Transform Cyclops into a puppy and you have a puppy with Excellent Strength optic blasts.",
    "notes": "Heroes with inborn Powers retain those Powers in their new form."
  },
  "Magnetic Manipulation": {
    "description": "The hero can manipulate magnetic lines of force. Initially, this gives the hero the ability to move and control metallic objects of up to Power rank size at Power rank range with Power rank ability.",
    "example": null,
    "notes": null,
    "powerStunts": [
      "Flight at Power rank Speed -3CS",
      "Shocking Touch at Power rank -1CS",
      "Affecting non-ferrous metals (like bullets), through manipulation of Earth's magnetic field",
      "Affecting non-metallic objects through manipulation of Earth's magnetic field (must first be able to manipulate non-ferrous metals)",
      "Scrambling non-sentient machinery at Power rank level",
      "Affecting sentient robots as shocking touch, but at Power rank +1CS (no benefit if robot is non-ferrous)",
      "Magnetic Field Detection at Power rank -1CS"
    ]
  },
  "Electrical Manipulation": {
    "description": "The hero can manipulate and control electricity. Initially, this gives the hero a resistance to electrical attacks equal to this Power rank (raise one of the two Powers if Electrical Resistance is also chosen).",
    "example": null,
    "notes": null,
    "powerStunts": [
      "Healing damage through absorption of electricity, up to Power rank amount per round",
      "Absorbing electrical damage as if possessing Resistance to Electricity of -2CS",
      "Acting as a conductor between a Power source and a target, as if possessing Resistance to Electricity of -2CS",
      "Moving at Power rank speed by riding the lines of electrical potential, along power lines and through building wiring",
      "Storing energy within self and delivering a shocking touch of Power rank damage"
    ]
  },
  "Light Manipulation": {
    "description": "The hero can generate light and manipulate existing light energy. Such light is of Power rank Intensity and may either be cast in a burst, affecting all targets in the same area, or in a line, affecting a single target. Light used in this fashion inflicts no damage, but may blind the targets with Power rank Intensity.",
    "example": null,
    "notes": null,
    "powerStunts": [
      "Darken or intensify existing light energies by +/-1CS per round, with Power rank ability",
      "Create illusions at -3CS (these illusions have no aural or tactile components)",
      "Hypnosis at -2CS against a single target or group",
      "Create a concentrated, modulated blast of light (laser) at -2CS Power rank range and damage"
    ]
  },
  "Sound Manipulation": {
    "description": "The hero can manipulate existing sonic energies, dampening existing noise by the Power rank number in Intensity, or increasing that noise by one level of Intensity if a successful Power rank FEAT is made. The individual with this Power may reduce all sonic-based attacks on his form by the Power rank number.",
    "example": null,
    "notes": null,
    "bonusPower": "Sound Generation"
  },
  "Darkforce Manipulation": {
    "description": "The hero with this Power can manipulate the extra-dimensional energy known as the Darkforce to perform specific actions. The hero may have one Power Stunt when the character is created; all other Power Stunts must be developed in the campaign.",
    "example": null,
    "notes": "Darkforce as used by Cloak is an unknown extra-dimensional energy, and may either have a sentience of its own, be home to a hostile sentience, or both. The Judge may choose to use this potentially hostile nature of the Darkforce against those who wield the Power by applying limitations.",
    "powerStunts": [
      "Flight at Power rank -1CS Speed",
      "Darkforce Distance Weapon at -1CS range and damage",
      "Creation of specific shapes of Darkforce (one Power Stunt per shape created) of Power rank material strength",
      "Teleportation, by moving through the Darkforce dimension, at -2CS Power rank",
      "Create Darkness of Power rank Intensity in three areas (hero must concentrate; breaking concentration results in immediate dissipation)"
    ]
  },
  "Gravity Manipulation": {
    "description": "The hero with this Power can alter the attractive forces of gravity. This grants the hero one of the Power Stunts, and gives him the potential to develop others as the campaign continues.",
    "example": null,
    "notes": "This Power lasts as long as the hero concentrates (if the Power is inborn) or 5 rounds (if Power is result of technology or spell). Any break in concentration results in immediate negation of the effect.",
    "powerStunts": [
      "Flight at Power rank -2CS speed",
      "Levitation at Power rank -1CS speed",
      "Levitation of others (other targets roll an Agility FEAT to avoid the effects) at -1CS speed",
      "Reduction of weight (not mass) by Power rank (will offset gain in mass from Density manipulation, and target may be slammed on any hit)",
      "Increase of weight, acting as an added load of Power rank weight on the target (Strength FEAT rolls to move)"
    ]
  },
  "Probability Manipulation": {
    "description": "This is a very potent Power with strict limits. The hero has the ability to alter the chance element affected by the die. A hero with manipulation Powers must roll a second time to determine the type of luck manipulation.",
    "example": "Individuals with this Power include the luck-manipulators Black Cat, Shamrock, Roulette, and Longshot, but not the hex-manipulator Scarlet Witch (though her Power is related).",
    "notes": "An individual with Bad Luck Power may call it into play for any roll. On that roll, the order of the dice is changed - the low die is always considered the 'tens', the high die 'ones' (a nine and a one are not 91, but rather 19). Similarly, one with Good Luck Powers will read the high number first. Good Luck may only affect the hero with the Power. Bad Luck affects those that are attacking the hero or performing actions that would result in damage to the hero. Allies, friends, and relatives of the hero do not benefit from this Power, and in fact may be damaged by its limitations.",
    "table": {
      "title": "Probability Type Table",
      "columns": [
        "Roll",
        "Result"
      ],
      "rows": [
        [
          "01-50",
          "Bad Luck"
        ],
        [
          "51-90",
          "Good Luck"
        ],
        [
          "91-100",
          "May manipulate both types"
        ]
      ]
    },
    "limitations": [
      "Affects all targets in same area (Good or Bad)",
      "Only operates on FEAT rolls involving non-living things",
      "No Karma may be gained in any encounter using this Power",
      "All associates of the individual (teammates, etc.) suffer the effects of Bad Luck (check with a Psyche FEAT rolled every week or so, secretly; effect disappears if individuals stay away for about a week)",
      "The Judge keeps track of every Good and Bad affected roll and may ask for any critical die roll to be Good or Bad to balance things up (no more than once per hour)"
    ]
  },
  "Nullifying Power": {
    "description": "The hero with this extremely potent Power can negate the inborn super-human Powers of other individuals with Power rank ability. Technological or Magical abilities are unaffected. Those affected must make an Endurance FEAT against the Power rank Intensity or lose those inborn abilities as long as the hero is in range, or for 1-10 rounds.",
    "example": null,
    "notes": "This Power will affect all within the range of the Power, and the individual may use no other inborn superhuman Powers while using this Power."
  },
  "Energy Reflection": {
    "description": "This Power grants the hero a limited form of Invulnerability to a specific form of energy. Any attack of that energy up to Unearthly damage or Intensity inflicts no damage on the character. The attack may be reflected in the round it occurs against the attacker or another target within Power rank range. The damage of the attack is as for the original attacker.",
    "example": null,
    "notes": "The hero reflecting the attack makes an Agility FEAT to determine if the reflection hits its target. A hero does not lose Karma from the results of a reflected attack. If the hero is attacked with more than Unearthly damage, the hero will reflect 100 points of that damage elsewhere, and take the remainder."
  },
  "Time Control": {
    "description": "Time Control is a powerful Power. Should the hero choose it, it will count as two Powers, and the hero will receive an automatic limitation from the Judge. Time Control allows the character to perform Power Stunts involving time, as limited by the laws of the Marvel Universe. Each Power Stunt must be gained separately, and the hero starts with no Power Stunts initially.",
    "example": null,
    "notes": "Costs 2 power slots. The Judge is encouraged to be fiendish with the automatic limitation.",
    "powerStunts": [
      "Speeding up time surrounding the hero, permitting him Lightning Speed of this Power rank",
      "Slowing down time for all within one area, allowing the hero Multiple Attacks of this Power rank",
      "Slowing down the time for an injured, dying, or poisoned character (one turn passes for the affected character as the Power rank number of turns pass for others; if used in combat, treat as Multiple Attacks)",
      "Traveling in Time: The past is immutable in the Marvel Universe. Traveling back in time shunts the character to an alternate dimension. 'Changing the past' creates a divergent reality but does not change the original timeline. Travel into the future puts the character into an alternate future dimension.",
      "Summoning Duplicates from the past, future, or alternate dimensions. Duplicates have identical stats and abilities but may not use Time Control abilities of their own. Initial use creates up to 2 duplicates; new Power Stunts may increase that number by one. Death of a duplicate is considered death of a character, and Karma is lost."
    ]
  },
  "Ultimate Skill": {
    "description": "Ultimate Skill is a special Power possessed by the hero, making him literally the 'best at what he does.' The hero picks any one Talent on the following list. His ability in that Talent is considered Unearthly, as opposed to modifying the existing ability by a +1 or +2CS. The Judge has final ruling on whether a Talent is available for ultimate skill. As Powers are generated before Talents, there is a chance that no applicable Talent will appear if the character chooses this Power. If this is the case, the hero may choose another mental Power.",
    "example": null,
    "notes": null,
    "eligibleTalents": [
      "Weapon Skills: All skills",
      "Fighting Skills: All skills",
      "Professional Skills: None",
      "Scientific Skills: All skills",
      "Mystic and Mental Skills: None",
      "Other Skills: All except Student, Heir to Fortune, and Leadership"
    ]
  },
  "Telepathy": {
    "description": "The hero with Telepathic Power may establish mind-to-mind communication between himself and other individuals. The telepath only reads surface thoughts, but does so without visible or audible signs. The hero attempting to make telepathic contact must make a Power rank FEAT. Contact is automatic with willing targets and unwilling targets who have a lower Psyche than the hero's. Targets of equal Psyche require a yellow FEAT, and those with mental Powers or some form of psionic screening a red FEAT. Individuals with a higher Psyche who are unwilling to be contacted telepathically are impossible FEATs.",
    "example": null,
    "notes": null,
    "powerStunts": [
      "Using the telepathic 'push' as a bolt of mental force of Power rank range and damage, using the Energy attack column",
      "Linking the minds of a team sharing a Karma pool, so that all team members are aware of each other's actions. Range for this is half that listed for Powers. Non-verbal orders may be passed, and all characters are considered to have the Intuition of the telepath",
      "Performing a mental probe at -2CS Power rank ability"
    ]
  },
  "Image Generation": {
    "description": "The hero with this Power may create vivid mental images. These images do not register on cameras, film, or in the minds of non-sentient robots. Heroes with Image Generation may cast their illusions within the Power rank range, but must be in line of sight of these illusions. Targets must make an Intuition FEAT against the intensity of the illusion (the Power rank of the caster). Targets only gain a FEAT roll if the players running those characters decide that the images are false.",
    "example": null,
    "notes": "Illusions will last as long as the hero concentrates on them. Illusions inflict no intrinsic damage, but if they are believed, the characters that believe them will take imaginary damage, with apparent 'death' resulting in unconsciousness for 1-10 rounds. Illusions fool characters but do not fool nature. If a hero creates a brick wall, the opponent will not move through it because he believes it to be real. If the hero creates the illusion of a bridge over a chasm, and the character believes in it, the character will still fall into the chasm."
  },
  "Telekinesis": {
    "description": "This Power allows the hero to lift objects and perform other FEATs of Strength as if the character had a Strength of the Power rank. The Power rank determines the maximum range of this Power as well. Items that are wielded telekinetically attack as if wielded or thrown by someone with Strength equivalent to that Power rank.",
    "example": null,
    "notes": null,
    "powerStunts": [
      "Flight for self and others within one area at -1CS Power rank, providing the character can lift that amount of weight",
      "A Telekinetic Force Field (really a stiffening of the air) of -2CS Power rank",
      "Telekinetic Force Bolts at -1CS Power rank and range. These bolts attack on the Force column of the battle effects table, and use Agility to hit"
    ]
  },
  "Mind Control": {
    "description": "Mind Control is the total overriding of the conscious mind. The character's personality remains, but his actions are controlled by the character with this Power. The target may make a Psyche FEAT to avoid this effect against the Intensity of the Mind Control Power rank. If that FEAT fails, the conscious actions of the character are controlled. The target has no memory of the period he is under control. The attacker and target must be within 1 area initially to effect Mind Control, though the target and attacker may be separated by miles afterwards.",
    "example": "You mind-control the Vulture to bump off Electro. You lose all Karma for slaying Electro, even though Vulture, being a villain, would not normally lose Karma for doing so.",
    "notes": "The victim of a successful Mind Control gains an additional Psyche FEAT roll each time he is placed in a Karma-losing situation. An additional Psyche FEAT is gained if the victim is placed in a life-threatening situation. Controlling another mind is the psychic equivalent of breaking and entering. The hero loses 10 Karma points whenever this Power is used. If Karma is gained or lost as a result of the actions of a mind-controlled character, that gain or loss is ascribed to the hero."
  },
  "Emotion Control": {
    "description": "Emotion Control is a related form of Mind Control that acts upon the subconscious fears and attractions to produce the required results. Targets of an Emotion Control attack must be in the same area as the character with this Power, and may make an Intuition FEAT to avoid the effects, which have a duration of 10-100 turns after the initial attack. Only one type of emotion may be instilled in a target at a time. The character with this Power may modify any emotions, but gains a +2CS if he chooses to modify one emotion exclusively. Robots and non-human alien beings are immune to the effects of Emotion Control.",
    "example": null,
    "notes": "A character under Emotion Control may gain additional chances to break the control if placed in a Karma-losing situation, similar to breaking the Mind Control Power.",
    "emotionTypes": [
      "Respect: The target treats an individual as a Friendly Contact",
      "Love: The target is devoted to the individual, to the point of endangering his own life in the other's behalf",
      "Fear: The target is filled with fear. The target will flee as quickly as possible, and only attack if backed into a corner",
      "Hatred: The target is instilled with a great hatred, particularly for former friends and allies. The target will attack his former friends",
      "Loyalty: The target will follow the individual's orders without question, cheerfully providing all necessary information and aid",
      "Doubt: The target is unsure of his actions. Intuition is considered to be a 10 (Good) for purposes of actions",
      "Pleasure: The target feels incredibly good and non-hostile. The character cannot do anything but sit contentedly for 1-10 rounds, and for the remainder of the duration is Friendly to the hero"
    ]
  },
  "Force Field Generation": {
    "description": "The hero with this Power can create force fields that will protect himself and possibly other allies. The hero can generate a force field that covers an area equal to the 'tens' place of the rank number. For every area covered beyond the first, the strength of the force field is reduced by one rank. A hero may choose to have a personal force field at +1CS instead of being able to project force fields. This choice is made at the start of play and cannot be changed.",
    "example": "A character with a rank number of 70 may cover 7 areas. A force field encompassing 7 areas would reduce the effects by -6CS.",
    "notes": "A force field operates as a form of Body Armor. If the amount of damage incurred in a round from all forms of attack is less than the rank number, then that damage is absorbed. A force field is most effective against energy attacks; treat the amount of protection against other types of attack at ten points less than the listed rank number. A personal force field shuts off when breached and excess damage is taken. A projected force field coming down leaves those inside unharmed but the wielder must make a Psyche FEAT or become unconscious for 1-10 rounds.",
    "powerStunts": [
      "Force missiles of -1CS range and damage, attacking on the Force column. Forming a 'cushion' of invisible force resilient enough to absorb up to Power rank damage from a fall or crash",
      "Enhanced movement by means of forming a column of force. May rise a number of floors per round equal to Power rank -2CS as Levitation, or Fly at a maximum of Typical speed",
      "Entrap others in the force field, up to the limitations of the Power",
      "Make a Grabbing attack up to Power rank range away (use Power rank as Strength for determining success)",
      "Create a bubble of force inside a small opening and expand it to inflict up to Power rank damage, avoiding the effects of Body Armor resulting from battle suits"
    ]
  },
  "Animal Communication and Control": {
    "description": "A hero with this Power can talk to animals and influence their actions. The hero gains a +1CS if she chooses to influence only a particular type (or class), such as sea life or birds. This is increased to +2CS if she narrows it further to a particular class or family such as bony-skeletoned fishes or falcons. Choosing to influence a specific animal gives the hero a +3CS; in that case the animal is a companion of the hero at the start of the campaign.",
    "example": null,
    "notes": "Communication with animals is considered automatic with these Powers, and the types which benefit from a +2CS modifier are considered Contacts (always Friendly). Otherwise animal reactions are Neutral to Hostile. The Power rank reflects the ability of the hero to control the actions of the animal in question. Make a Popularity FEAT for any requests, using Power rank instead of Popularity. Failure indicates the animal may turn on the controller. Animals which are Contacts never turn on the controller."
  },
  "Mechanical Intuition": {
    "description": "This is a specific form of Ultimate Skill that affects repairs, inventing, and building things. The character with this Power has a strong intuitive knowledge of machinery. Regardless of Reason, any rolls for determining whether an invention works or not are at Unearthly Rank. No modifiers may be added to this roll. The character with this Power must still provide Resources for these inventions in the standard fashion.",
    "example": null,
    "notes": null
  },
  "Empathy": {
    "description": "Empathy is similar to Telepathy, but registers the surface emotions as opposed to the surface thoughts of the opponent, and no emotions may be transmitted back to the target. The character with this Power must make the FEAT roll to determine its success (indeed, the target may never know). Success is determined in a similar manner to Telepathy, but Empathy and Emotion Control Powers will block its success.",
    "example": null,
    "notes": null
  },
  "Animal Empathy": {
    "description": "This specialized form of Empathy extends to all animals in a primitive form of Animal Communication. The hero with this Power may detect and influence the surface emotions of the animal involved, and instill in it fear, hunger, affection, exhaustion, or other emotions on a successful Power rank FEAT.",
    "example": null,
    "notes": null
  },
  "Psi-Screen": {
    "description": "This form of Psi-Screen is an inborn Power that resists mental scans and domination. All characters with any of the mental Powers have this Power at an equal level to their Psyche. A character with this Power will have a Psi-Screen at +1CS higher than his Psyche at start, and may increase it through experience to higher levels. A character with Psi-Screen may use this value instead of the Psyche to resist the effects of any Mental Power that requires a Psyche FEAT roll.",
    "example": null,
    "notes": "This Power differs from the Talent of the same name in that it may be extended over a number of targets to attempt to protect others from attacks. Each target protected requires a Power rank FEAT, with failure indicating all such Powers are lost for 1-10 turns. Also, the attacker will be aware of the protector's mental presence.",
    "minimumRank": "Psyche +1CS"
  },
  "Mental Probe": {
    "description": "This Power is a specific form of Telepathy. A Mental Probe is a search for a specific image in the mind of the target. The hero with this Power must state what she is looking for before beginning the scan. The target makes a Psyche FEAT to resist the effects of a Mental Probe. If successful, the mind may not be probed again for 24 hours. In either case, the target must make a second Psyche FEAT to determine if the Psyche is at -1CS for the next 24 hours as well.",
    "example": "Probing a guard of a scientific installation may not reveal what the installation is working on, only that it is 'hush-hush,' they have a number of scientists, and they have been shipping a large number of crocodiles into the plant.",
    "notes": "Psychic interrogators may try again just at the 24-hour mark, when the mind is capable of being probed but before the Psyche returns to normal."
  },
  "Animate Drawings": {
    "description": "The hero with this Power may animate flat drawings and other representations, causing them to become fully operational items. A character may attempt to animate any drawing, even one of his own creation, or animate a specific type or class of object. In the latter case, a +1CS to Power rank is initially given, though the character loses the ability to animate other drawings. The animated drawings will have abilities and Powers according to their nature, but no Power or ability can exceed the Power rank number of the hero. No additional Powers can be given to the animation unless the card shows those Powers in operation.",
    "example": "Tarot of the Hellions draws her animated figures from a Tarot deck.",
    "notes": "Animated figures last for 1-10 rounds, the actual amount of time determined secretly by the Judge. They dissipate at that time, return to their original location, and may not be animated again for 24 hours. The figures also dissipate if they are destroyed or reduced to 0 Health."
  },
  "Possession": {
    "description": "This Power is a specific form of Mind Control in which all actions of the character are assumed by the controller. The controller is in effect 'inside' the mind of the character and as such controls all actions without having to give commands. Possession is only possible against targets with no greater Psyche than the hero's Power rank. The target may make a Psyche FEAT to avoid the Possession.",
    "example": null,
    "notes": "A character who is possessed neither gains nor loses Karma when being possessed, though she may suffer from losses of Popularity while her body performs actions that are not heroic in nature. The character may make a Psyche FEAT to escape if placed in a life-threatening situation. The character possessing another may spend her own Karma (but not the Karma of the possessed character) to influence actions."
  },
  "Transferral": {
    "description": "Transferral is the ultimate form of Possession, in that it allows the complete transferral of consciousness with a target within one area. The target's consciousness is not put away in the back of the character's mind, but rather moved into the body of the character with the Transferral Power. Transferral always needs a red Power rank FEAT to succeed, and may be performed against creatures with higher Psyches, those with Mental Powers, and alien beings or robots. If the transfer fails, the attacker is unconscious for 1-10 rounds and may not attempt again for one day.",
    "example": "If Doctor Doom conducts a transferral with Reed Richards, Doom enters Reed's body and vice versa. Doom/Richards gains Richards' appearance, Contacts, Popularity, Resources, Karma, physical abilities (FASE), and Powers (stretching). Doom retains his own Talents, knowledge, mental abilities (RIP), and Mental Powers.",
    "notes": "When characters transfer consciousness, they also trade the mental abilities, Powers, and Talents. They do not trade physical abilities or Powers, nor do they trade Popularity, Contacts, or Resources. The character performing the transferral also trades Karma amounts with the target."
  },
  "Astral Projection": {
    "description": "The hero with this Power may cause his or her astral form to leave the body and travel elsewhere, either in this dimension, or entering other dimensions. The range of astral travel is determined by the Power rank of the ability. The character in astral form may observe actions in the 'normal' world, but may not be detected by normal means (Astral Detection and Telepathy will reveal the presence of the astral intruder). The character may not use his other abilities in the Astral form against non-astral targets. An astral character is not affected by non-telepathic objects or forms of attack, but may be affected by Mental Powers (including Force Fields). The astral character may phase through solid objects without damaging either character or object.",
    "example": null,
    "notes": "While the astral form is separate, the body is immobile, in a trance. Damage to the body will be known to the astral traveler if it is in this dimension, and it is possible for the body to perish while the astral form is away. Characters whose bodies have perished are trapped in astral form. Further separation, or the removal of the astral form from the body for more rounds than the Power rank of this ability, results in Endurance FEATs for the body as if it were suffering a lethal (kill result) attack.",
    "powerStunts": [
      "Detect the astral forms of other characters"
    ]
  },
  "Psionic Attack": {
    "description": "This Power gives the hero the ability to project psionic force blasts at Power rank range and Intensity. The target of this attack must make a successful Psyche FEAT or be knocked unconscious for 1-10 rounds. Characters with Mental Powers may use their Power ranks instead of Psyche, and those with Psi-Screen should use that Power rank before any other. Force Fields operate against psionic attack.",
    "example": null,
    "notes": null
  },
  "Precognition": {
    "description": "The character with this Power can scan alternative futures up to a week in advance and choose from them an image that may or may not come true, and use that information to form his own decisions. An accurate divining of the future is impossible due to the nature of the Marvel Universe. There are a large variety of possible alternate futures diverging at any one point. The future is also mutable, such that the actions of today may bypass the future of the timeline that is viewed. Precognition may not be used more than once a day.",
    "example": "If a precog sees a Quinjet crash in the near future, and no one takes the Quinjets, thereby avoiding the crashes, that 'future' is not totally negated; it occurs in another divergent future.",
    "notes": "The character must choose a limitation to this Power. When the Precog uses his Powers, the Judge secretly rolls a die against the character's Power rank. White: Judge gives a false image. Green: Judge is partially truthful. Yellow: Judge should be fairly honest. Red: Judge gives something honestly useful.",
    "limitations": [
      "Power is intermittent - the Judge chooses when the images appear and what they say",
      "Power only works on people, and the person must be in contact with the precog",
      "Power only works on objects, and the hero must be holding or using the object",
      "Power is extremely realistic in its manifestation (the hero physically reacts to the vision)",
      "Power only manifests itself in dreams",
      "Power only operates once per image. Until that image comes true or the time passes, no other precognition may be used"
    ],
    "powerStunts": [
      "Combat Precog: At the start of the turn the precog makes a Power rank FEAT. On a yellow or better result, the Judge must tell the precog what he plans for his characters to do. If the side with the precog gains initiative, the player may share the information with the others"
    ]
  },
  "Postcognition": {
    "description": "The reverse of Precognition, but easier to handle, in that the past is fairly immutable. Postcognition only works on items the character handles. The Postcog makes a Power rank FEAT, the color required determined by the length of time scanned. If the FEAT is successful, a second FEAT is made to determine what is picked up, as for Precognition.",
    "example": null,
    "notes": null,
    "table": {
      "title": "Postcognition Time Table",
      "columns": [
        "Time Period",
        "FEAT Required"
      ],
      "rows": [
        [
          "Within one day",
          "Green"
        ],
        [
          "Within one week",
          "Yellow"
        ],
        [
          "Within one year",
          "Red"
        ],
        [
          "Further back",
          "No accurate scan possible, but a red FEAT will give a 'feeling' as to the general past of the item"
        ]
      ]
    }
  },
  "Plant Control": {
    "description": "The hero with this Power can command the actions of plants, granting them temporary Powers of their own, including movement, growth, and a rudimentary intelligence. These abilities only exist as long as the hero concentrates. The hero cannot control plants with a higher material strength than his Power rank. Plant-like creatures with intelligence receive a Reason FEAT against the hero's Power rank as Intensity to avoid being controlled.",
    "example": null,
    "notes": "By mere control, the hero cannot have the plants perform any actions that would not be normally possible by the plants. The hero may develop Power Stunts using the plants in abnormal fashion.",
    "powerStunts": [
      "Forcing vines to animate with Power rank Agility, and act as entangling ropes with Power rank material strength",
      "Creating plant-images that duplicate living humans with Power rank ability",
      "Commanding trees to move and attack as creatures of Power rank number Health and Power rank material strength Body Armor",
      "Command the actions of mushrooms and fungi, which are not proper plants",
      "Gather information from plants as to recent passers-by, within 1 day, in a primitive form of communication"
    ]
  },
  "Flight": {
    "description": "The hero with this Power can move through the air under his own power. The method of flight (wings, rockets, unconscious graviton manipulation, etc.) is left for the player to define, though it should be defined before play begins. The character's speed is determined by the Power rank of the individual. Agility is used to determine actions while flying, including changing course and dodging.",
    "example": "A hero who can fly 10 areas may climb 30 stories in a single round.",
    "notes": "Winds (including wind Powers) of greater Intensity than the hero's Power rank will cause the hero to lose altitude. The hero may gain one additional area (44 yards) for each 15 feet (1 story) dropped, and is slowed by one area of speed for each 30 feet (two stories) climbed."
  },
  "Gliding": {
    "description": "The hero has the ability to glide, dropping 1 story (15 feet) for every turn in the air. The distance covered per turn is set by the Power rank as for flying. The Gliding hero cannot climb, but can maintain level flight by making an Agility FEAT (failure indicates loss of 2 stories / 30 feet).",
    "example": null,
    "notes": "The method of gliding is set by the Judge and player. The gliding Power may be severely affected by winds, and winds of greater Intensity than the glider's speed may halt, down, or move backward the hero who glides, and will at least reduce the hero's speed by as many ranks as the Intensity is above Feeble."
  },
  "Leaping": {
    "description": "The hero with this Power can leap great distances. Use the Leaping table in Chapter 2, replacing Strength with this Power rank.",
    "example": null,
    "notes": null,
    "minimumRank": "Strength +1CS"
  },
  "Wall-Crawling": {
    "description": "The hero can move along vertical and upside-down surfaces as if they were normal surfaces. This Power rank indicates how strong the adhesion is (the mechanism - suction cups, atomic field suppressors, etc. - is left to the player). The hero will use the Power rank to determine the ability to stick, according to the Intensity of the slipperiness of the surface.",
    "example": null,
    "notes": null,
    "table": {
      "title": "Surface Slipperiness Table",
      "columns": [
        "Material",
        "Rank Required"
      ],
      "rows": [
        [
          "Ordinary Concrete",
          "Feeble"
        ],
        [
          "Ordinary Brickwork",
          "Feeble"
        ],
        [
          "Glass and Steel",
          "Typical"
        ],
        [
          "Steel Alloys",
          "Good"
        ],
        [
          "Surface Coated with Oil",
          "Remarkable"
        ],
        [
          "Non-stick Surfaces",
          "Incredible"
        ],
        [
          "Frictionless Surfaces",
          "Class 1000"
        ]
      ]
    }
  },
  "Lightning Speed": {
    "description": "The hero with this Power can move as a vehicle with a speed equal to the Power rank, as opposed to his distance per round being limited by Endurance. Lightning Speed is assumed to apply to ground movement, but may be applied to any of the following Powers if the hero has them: Flight, Gliding, Wall-crawling, or Digging.",
    "example": null,
    "notes": "Characters with Lightning Speed can turn at maximum speed without penalty, and Agility FEATs may be made either with the Agility ability or with this Power rank. Characters with Lightning Speed can accelerate to full speed in a single round, and decelerate from full speed to full stop in the space of one area.",
    "minimumRank": "Endurance +1CS"
  },
  "Teleportation": {
    "description": "The hero with Teleportation Power can move instantaneously from point to point without physically crossing the distance between. The exact method generally consists of the character entering another dimension, moving through that dimension, and returning to another location. Each time the hero teleports, make a Power rank FEAT roll. Failure indicates the hero arrives but is disoriented and may take no action in the following round.",
    "example": "Nightcrawler, Magik, Sidewinder, and Cloak all have different methods of teleportation, but all operate by this mechanism.",
    "notes": "The teleporting hero may carry either all individuals in his area or someone the hero is touching up to his Strength limitations (this decision must be made when the character is created). Those carried by a teleporter must make a green Endurance FEAT or be disoriented for 1-10 rounds. Those teleported from an area must make a yellow Endurance FEAT or be disoriented for 1-10 rounds. If the hero teleports into a solid object, make an Endurance FEAT. Failure results in damage equal to twice the material strength of the object. Success indicates another random 'port, with the hero unconscious for 1-10 rounds. Costs 2 power slots.",
    "powerStunts": [
      "Multiple attacks by teleporting quickly from place to place: the hero is considered to be Dodging for purposes of attacks upon them, and may deliver up to twice their normal number of attacks (note: 'area-teleporters' may not try this trick)"
    ]
  },
  "Levitation": {
    "description": "This Power allows the hero to move vertically unaided, and usually has a magical or mental origin. It does not allow true flight, but is immune to the effects of wind or air control Powers, unless the hero with the Power so chooses. The hero moves vertically a number of stories determined by the Power rank as speed.",
    "example": "A hero with Incredible levitation can move 20 areas vertically in a round.",
    "notes": "Horizontal movement is possible by pushing off from other surfaces, or levitating while moving."
  },
  "Swimming": {
    "description": "All heroes are assumed to be capable of swimming if free of impediments. The Swimming Power shows that the hero can move through the water at high speeds, as in the Lightning Speed Power applied to water. This Power does not negate the need to breathe.",
    "example": null,
    "notes": null,
    "bonusPower": "Water Breathing"
  },
  "Climbing": {
    "description": "The hero with this Power can scale vertical (but not upside-down) surfaces as if possessing the Wall-Crawling Power with Lightning Speed. The speed of the climbing is determined by the Power rank, and the surface must have sufficient handholds or cracks (even those of mortared bricks will do). In addition, the hero can move through tangled pipes, vines, and other areas that require manual dexterity using this Power instead of the hero's Agility.",
    "example": null,
    "notes": null
  },
  "Digging": {
    "description": "The hero can move below ground by digging a tunnel. Normal movement is as for normal ground vehicle speed, half if the hero is digging a tunnel well-supported enough to allow others to follow (otherwise the tunnel collapses behind the hero as she digs). The hero may dig through materials of lower material strength rank than his Power rank, but not those of equal or greater rank.",
    "example": null,
    "notes": null,
    "bonusPower": "Claws"
  },
  "Dimensional Travel": {
    "description": "This Power allows the character to break through into other dimensions. The hero does this automatically, but must make a Power rank FEAT if under pressing conditions. A Power rank FEAT is always required if the hero is heading for a particular alternate dimension or universe.",
    "example": "2000 rabid barbarian rabbits are bearing down on the hero - a Power rank FEAT is required.",
    "notes": "Dimensional destinations are created as for Power stunts. If a hero has developed the ability to reach Limbo through a Power stunt, reaching the dread dominion of Dormammu is a separate stunt. At start, the hero has one dimension or alternate universe to where he can travel. Ability to reach a specific location in a given dimension is a red Power rank FEAT. Returning to a familiar location of the native plane is a yellow Power rank FEAT. Karma may be added to these FEAT rolls."
  },
  "Resistance to Fire and Heat": {
    "description": "All damage from fire and heat-based attacks is reduced by the Power rank number. Further, any fire of less than this Power rank has no effect on the hero.",
    "example": "A hero with a Resistance to Fire/Heat of Amazing (50) rank could walk through super-heated steam of Incredible (40) Intensity without ill effect.",
    "notes": null
  },
  "Resistance to Cold": {
    "description": "All damage from cold-based attacks is reduced by the Power rank number. Further, ice and cold of less than this Power rank may be ignored. Physical items made of ice may still affect the hero.",
    "example": "A hero with Resistance to Cold would not be easily frozen by Iceman, but could still be hit with a club made of ice.",
    "notes": null
  },
  "Resistance to Electricity": {
    "description": "All damage resulting from electrical-based attacks is reduced by the Power rank number. Further, electricity of less than this Power rank is ignored by the hero. The hero must decide if this Power is conductive or non-conductive in nature.",
    "example": null,
    "notes": "Conductive resistance allows energy to pass through the hero into those the hero is touching (like a copper wire). Non-conductive resistance stops the energy at the contact point, allowing those being touched or held to be unharmed (like rubber insulation)."
  },
  "Resistance to Radiation": {
    "description": "All damage resulting from radiation-based attacks, including but not limited to X-rays, alpha and beta particles, and gamma rays, is reduced by the Power rank number. Most non-concussive energy rays used by super-powered individuals may be so reduced. Any radiation of a lower Intensity than the hero's Power rank has no effect on the hero.",
    "example": "This resistance would provide protection from Captain Marvel in X-ray form, but not from Radioactive Man's force-based attacks.",
    "notes": null
  },
  "Resistance to Toxins": {
    "description": "This Power rank is always a minimum of one rank greater than the hero's Endurance rank (if the random roll sets this Power as less than this stated minimum, it is raised to Endurance rank +1CS). This rank is used instead of Endurance for all FEATs involving poison, and is not reduced by damage or effects of poison.",
    "example": null,
    "notes": "Failing a FEAT with this Power will mean Endurance drops by one rank, but this Power rank does not drop. It will be used next turn at its normal level for determining further effects.",
    "minimumRank": "Endurance +1CS"
  },
  "Resistance to Corrosives": {
    "description": "This resistance reduces the amount of damage from acids and other caustic agents, including but not limited to rust, rot, acids, salt deterioration, and destructive microbes. The hero with this Power may ignore acids and corrosives of less than this resistance's Power rank number in Intensity, and may reduce damage from higher level acids by the Power rank number.",
    "example": null,
    "notes": null
  },
  "Resistance to Emotion Attacks": {
    "description": "This Power rank will be no less than one rank higher than the character's initial Intuition, and should be raised to that rank +1CS if a lower rank is rolled. Any emotion-related attacks that affect the Intuition, including illusions, emotion-control, and dominance must overcome this rank as opposed to the Intuition of the individual.",
    "example": null,
    "notes": null,
    "minimumRank": "Intuition +1CS"
  },
  "Resistance to Mental Attacks": {
    "description": "This resistance is similar to that of Resistance to Emotion Attacks, but is used against attacks that affect the Psyche from psionic (but not magical) sources. This Power rank will be no less than one rank higher than the individual's Psyche, and should be raised to that rank +1CS if a lower rank is rolled.",
    "example": null,
    "notes": null,
    "minimumRank": "Psyche +1CS"
  },
  "Resistance to Magical Attacks": {
    "description": "This resistance is similar to that of Resistance to Emotion Attacks, but is used against attacks that affect the Psyche from magical and extra-dimensional sources. Further, all magical damage-inflicting attacks are reduced by this Power rank number.",
    "example": null,
    "notes": "Unlike the Resistances to Mental Attacks and Emotion Attacks, this Power rank may be lower than the Psyche initially, making the individual more vulnerable to certain types of magical attack (but less vulnerable to damage-inflicting magical attacks).",
    "minimumRank": null
  },
  "Resistance to Disease": {
    "description": "The individual with this resistance is less susceptible to disease than other heroes with the same Endurance. Included are common diseases, as well as the effects of biological warfare and vampirism. The individual's rank in this Power is no less than one rank above the individual's Endurance.",
    "example": null,
    "notes": "Any roll of less than Endurance +1CS should be raised to that rank.",
    "minimumRank": "Endurance +1CS"
  },
  "Invulnerability": {
    "description": "The hero with this Power is totally unaffected by one or more of the attack forms listed in the Resistances category. The initial choosing of Invulnerability counts as two choices, but every additional choice in Resistances may be changed to an Invulnerability. Invulnerability means that the hero in question has a Class 1000 resistance to that attack form.",
    "example": "A hero picks up Invulnerability to Fire, counting it as two slots. She then gets another resistance, and chooses Resistance to Cold. She may then choose to be Invulnerable to Cold instead at no additional cost.",
    "notes": "Costs 2 power slots. Subsequent resistances can be upgraded to Invulnerability at no additional cost.",
    "effectiveRank": "Class 1000"
  },
  "Protected Senses": {
    "description": "One or more of the hero's basic senses are protected from attack. The hero ignores potentially damaging attacks of less than the Power rank in Intensity level. In many cases, this considers the effects of specially polarized goggles that prevent being suddenly blinded by high Intensity light, or earplugs or headgear that reduce the effects of sonic attacks.",
    "example": null,
    "notes": null
  },
  "Enhanced Senses": {
    "description": "One or more of the hero's five normal senses (hearing, sight, smell, touch, taste) is increased to the Power rank level. Use this rank instead of Intuition to discover clues, spot items, and determine initiative (in the case of Hearing). These extra-ordinary senses are more vulnerable to attack, such that attacks against them are at +1CS.",
    "example": null,
    "notes": "Examples of attacks that exploit enhanced senses include bright lights for sight, sonic attacks for hearing, traps activated by touch, or knock-out gases for smell."
  },
  "Infravision": {
    "description": "The individual with this ability can see in the dark. In most normal darkness, this sight range is 5 areas. This Power has a rank because there are potentially high-Intensity darknesses that may foil this Power (for example, the Darkforce). If the Intensity of the darkness is higher than the rank of the infravision, sight is limited to only the immediate area (within 2 feet).",
    "example": null,
    "notes": null
  },
  "Cosmic Awareness": {
    "description": "The hero possessing this Power is in tune with the universe to some degree, allowing him to perceive other powerful entities and to detect weaknesses in opponents. Individuals with Class 1000 primary abilities or better within 10 miles of the hero will always be noticed by the hero. In addition, making a Power rank FEAT with this Power allows the user to gain a +1CS on FEATs against an opponent by finding the weak point in an opponent or structure.",
    "example": null,
    "notes": "Costs 2 power slots."
  },
  "Combat Sense": {
    "description": "This Power rank may be used instead of Intuition for determining surprise, instead of Fighting for blocking, instead of Agility for dodging, and instead of Strength for escaping. The minimum level of this Power is the Intuition rank of the character.",
    "example": null,
    "notes": "Costs 2 power slots.",
    "minimumRank": "Intuition"
  },
  "Computer Links": {
    "description": "The character with this Power may communicate with and retrieve information from computer systems with Power rank ability. The hero must be able to access the computer in some way; usually this is by means of an implant relayed to a predetermined computer. If attempting to break into a new computer, compare this Power rank with the Reason of the computer or mechanical being. This Power also allows the reprogramming of simple robots (but not Player Character robots under normal circumstances).",
    "example": null,
    "notes": null
  },
  "Emotion Detection": {
    "description": "The hero can detect emotion in others with Power rank ability. This Power may be a limited form of Empathy, or merely the ability to catch the subtle physiological clues that indicate a person is under stress, lying, or worried. Success with this FEAT roll indicates the hero detects only the target's emotional state, not the cause of it. Targets trying to conceal their emotional state use their Intuition as an Intensity rank to determine the type of FEAT required.",
    "example": "The target may be lying, but the hero with this Power is able to detect only that the individual is worried, the heartbeat pattern is up, etc.",
    "notes": "Detecting non-human emotions - those of robots and aliens, for instance - should be done at a higher shift."
  },
  "Energy Detection": {
    "description": "The hero with this Power is able to identify specific types of energy and track energy trails. The hero can identify the general 'type' of energy (particles, x-rays, light, exhaust of a nuclear engine, etc.) with Power rank ability, and can track the energy trail of that specific type with Power rank ability per hour. Faint trails or common types of energy with confusing patterns may require yellow or red FEATs at the Judge's option.",
    "example": null,
    "notes": null
  },
  "Magic Detection": {
    "description": "The hero with this Power can detect magic. When magic is in force around the hero, make a Power rank FEAT roll. White means failure; check again next round. A green result indicates recognition that there is magic in the area, a yellow result the individual or individuals involved in the magic, and a red result the type of spell or magic involved. Spells that mask or mislead the spell-casting may reduce these chances at the Judge's option.",
    "example": null,
    "notes": null
  },
  "Magnetic Detection": {
    "description": "The hero with this Power can detect the magnetic field of Earth (and likely other planets as well), as well as aberrations of that field (created by large iron deposits, huge electro-magnetic doomsday devices, etc.) with Power rank ability. It is difficult for a hero with this Power to become lost.",
    "example": null,
    "notes": null
  },
  "Mutant Detection": {
    "description": "The hero with this Power is attuned to the specific mental radiation given out by mutants. The range is dependent on the Power rank of the individual (see the Power Rank Range Table). This Power reflects the conscious will to detect mutants.",
    "example": null,
    "notes": null
  },
  "Psionic Detection": {
    "description": "The hero with this Power is attuned to exceptional mental radiation in general, and as such can detect the use of paranormal abilities including mindreading, thought-casting, mental control and attacks, whether by technological or of mutant origin (but not those of magical origin). The hero can detect these abilities only when they are in use, by making a Power rank FEAT roll. Make a check each round the hero is in range of psionic activity until the hero makes the FEAT or psionic activity ceases.",
    "example": null,
    "notes": "The FEAT is green if the hero is specifically checking for psionic activity, yellow if not paying specific attention."
  },
  "Astral Detection": {
    "description": "The hero with this Power can see the forms of creatures operating in the astral plane, including ectoplasm of those adepts who can astrally project. This is an automatic ability: the individual can always recognize that an astral form is nearby. Use the Power rank FEAT to determine if the individual can note the features of the astral individual, such that the individual can be recognized or later identified.",
    "example": null,
    "notes": null
  },
  "Tracking Ability": {
    "description": "Through use of heightened senses, learned abilities, or mutant Powers the hero with this Power can track another individual's path. Make a Power rank FEAT to catch the track, but once on the trail, FEAT rolls should only be required when there is a chance of losing the track. This will depend on the nature of the tracking ability.",
    "example": "A hero who tracks by scent may have to make another FEAT (perhaps yellow or red) if the trail leads through a stockyard or perfume plant, while one who tracks by the heat left from his prey's footsteps must check when the individual passes through a stream.",
    "notes": null
  }
};
