# Marvel Superheroes RPG Character Generator

A web-based application for generating Marvel Superheroes RPG characters following the official character creation rules.

## 📋 Project Overview

This project provides a complete design and implementation plan for building a character generator for the Marvel Superheroes Role-Playing Game. The generator follows the official 5-step character creation process and supports all character origins: Altered Humans, Mutants, Hi-Tech Heroes, Robots, and Aliens.

## 🎯 Features

### Core Functionality
- **5-Step Character Generation Process**
  1. Origin Selection (Random or Manual)
  2. Primary Abilities Rolling (F-A-S-E-R-I-P)
  3. Secondary Abilities Calculation (Health, Karma, Resources, Popularity)
  4. Special Abilities Generation (Powers, Talents, Contacts, Equipment)
  5. Character Details & Customization

- **Complete Rules Implementation**
  - All 5 origin types with proper modifiers
  - Random Ranks Tables (5 columns)
  - Ability Modifier Table
  - Origin-specific bonuses and penalties
  - Accurate ability calculations

- **Character Management**
  - Real-time character summary sidebar
  - Export to JSON for sharing
  - Print character sheet

### Enhanced Features (Planned)
- Finish the details (ex: Hi-Tech body armor stats mods)
- Generate a prompt for creating an image of your hero based on stats/powers
- Random name generator
- Better character sheet

## 🎲 Game Rules Reference

### Origins
1. **Altered Human** (01-30)
   - Column 1 for abilities
   - +1 rank to any ability
   - Standard resources

2. **Mutant** (31-60)
   - Column 1 for abilities
   - +1 Endurance rank
   - +1 Power (max 5)
   - Resources -1 rank
   - Popularity starts at 0

3. **Hi-Tech** (61-90)
   - Column 3 for abilities
   - +2 Reason ranks
   - Resources set to Good
   - Requires 1 Contact & 1 Scientific Talent

4. **Robot** (91-95)
   - Column 4 for abilities
   - Popularity starts at 0
   - Can heal normally
   - No Karma loss when destroyed

5. **Alien** (96-00)
   - Column 5 for abilities
   - -1 Power (min 2)
   - Resources set to Poor
   - Maximum 1 Contact

### Ability Ranks
| Rank | Value |
|------|-------|
| Feeble | 1 |
| Poor | 3 |
| Typical | 5 |
| Good | 8 |
| Excellent | 16 |
| Remarkable | 26 |
| Incredible | 36 |
| Amazing | 46 |
| Monstrous | 63 |

### Primary Abilities (F-A-S-E-R-I-P)
- **Fighting** - Combat ability
- **Agility** - Dexterity and reflexes
- **Strength** - Physical power
- **Endurance** - Stamina and durability
- **Reason** - Logic and intelligence
- **Intuition** - Awareness and intuition
- **Psyche** - Mental fortitude

### Secondary Abilities
- **Health** = F + A + S + E
- **Karma** = R + I + P
- **Resources** = Rolled or set by origin
- **Popularity** = Rolled or set by origin

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!!

## 📝 License

This project is for personal use and follows fair use guidelines for the Marvel Superheroes RPG rulebook.

🦸‍♂️ *"With great power comes great responsibility"* 🦸‍♀️
