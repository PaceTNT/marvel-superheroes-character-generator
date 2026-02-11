// Contact Details Data for Marvel Superheroes RPG
// Combined from Contacts_details.txt reference file.
// Keyed by contact type name as used in TALENTS_DATA.contactTypes.

const CONTACT_DETAILS_DATA = {
  // ===== PROFESSIONAL CONTACTS =====
  "Medicine": {
    "description": "The hero with this Contact has a friend, ally or acquaintance with Medicine Talent, who will provide medical advice and services either for free or charge an affordable fee. The Contact may be a doctor at a local hospital or clinic, or a researcher familiar with the character's background.",
    "category": "Professional"
  },
  "Law": {
    "description": "The hero with this Contact has a friend, ally, or acquaintance with Law Talent, who will provide legal assistance for a reduced fee and legal advice to the hero for free. The Contact may be a lawyer whose firm has been on retainer with the family for years, is a personal friend, or who owes the hero for providing his big break into the profession.",
    "category": "Professional"
  },
  "Law-Enforcement": {
    "description": "The hero with this Contact has a friend, ally, or acquaintance with Law-enforcement Talent, who is in addition a member of the law-enforcement profession. This may include forces of local and state police and the national guard, and may vary in rank from knowing a patrolman (Excellent rank knowledge of the world at large, Remarkable of his beat), being on good terms with a Detective (Remarkable knowledge of criminal investigation, plus detective skills), or being well-known to a station captain or commissioner (Remarkable Resources, limited to that material which police forces normally have).",
    "category": "Professional",
    "notes": "The higher the Contact, the more likely the Contact will get in touch with the hero when he needs help."
  },
  "Military": {
    "description": "The character has a Contact in the armed forces, either of the United States or another nation. This may range from a low-level sergeant to the Joint Chiefs of Staff. Military Contacts may provide Amazing Resources, maximum.",
    "category": "Professional"
  },
  "Business World": {
    "description": "The character has a Contact in the world of business or finance. This may range from the accountant for the hero's group to a captain of industry who is trying to build fusion plants across the country. Resources available are at the Incredible level.",
    "category": "Professional"
  },
  "Journalism": {
    "description": "Journalist Contacts are Poor in Resources (unless you want to borrow the Mobile-Three Action-Camera van) but have Remarkable knowledge about their field of expertise. If your Contact is a city desk reporter, she may be aware of something going down on the streets. If the Contact is in entertainment, maybe he has free passes to the ballet.",
    "category": "Professional"
  },
  "Crime": {
    "description": "The character with this Contact has some connection with the criminal underworld. This ranges from having a snitch that passes on information about street action, such as Turk Barrett is for Daredevil, up to a Contact high in the hierarchy of the Maggia or independent gangs.",
    "category": "Professional",
    "notes": "WARNING: Having criminal Contacts may place the hero in Karma-losing or Contact-losing situations, with the hero having to choose between losing a criminal Contact or losing Karma by aiding the Contact. High-level criminal Contacts (Remarkable Resources or higher) may seek to manipulate the hero to their own ends (the best example of which is the Kingpin of Crime)."
  },
  "Engineering": {
    "description": "The character with this Contact has some connection with someone who builds, either independently or for a larger corporation. The character may aid in the construction of devices.",
    "category": "Professional"
  },
  "Psychiatry": {
    "description": "The character with this Contact has some connection with a character in the fields of psychiatry or psycho-analysis, including doctors devoted to the curing of the criminal mind.",
    "category": "Professional"
  },
  "Detective/Espionage": {
    "description": "The character with this Contact has connections with the world of espionage. This includes agencies such as the FBI, CIA, NSA, KGB, Interpol, MI5, S.H.I.E.L.D., and the criminal organization H.Y.D.R.A. Such Contacts provide information up to Remarkable level, though top-secret information will be harder to obtain. Equipment may be provided for up to Incredible rank, Amazing for S.H.I.E.L.D. and H.Y.D.R.A.",
    "category": "Professional",
    "notes": "All these agencies have no concern about using Contact heroes as agents to their own ends, and any hero that uses a Contact in this area will be guaranteed to receive a request for a return favor some time in the near future."
  },
  "Hero Group": {
    "description": "The character has some connection with, or was or is a member of or an ally of some existing group of super-powered heroes, and as such may enjoy the privileges thereof. This includes using their equipment, calling them in on an emergency, using their HQ, and benefiting from their training.",
    "category": "Professional",
    "notes": "The player running this hero may choose the group, subject to the approval of the Judge. Excessive liberties taken with the privileges (cracking up three Quinjets in a row) may result in the contact's revocation. The other disadvantage (in addition to being at the group's beck and call) is that enemies of the hero group are considered enemies of this hero as well. A hero who belongs to a group is always considered to have that group as a Contact (once an Avenger, always an Avenger).",
    "example": "The Mutant Dazzler, while not a member of the X-Men, maintains a good relationship with them and has benefited from training with them."
  },
  "Artist/Performer": {
    "description": "The character knows someone with artistic or performing skills. The Contact has the relevant Talent and can provide assistance related to their field of expertise.",
    "category": "Professional"
  },

  // ===== SCIENTIFIC CONTACTS =====
  "Chemistry": {
    "description": "The character is in touch with someone with Chemistry ability. The Contact has the Chemistry Talent and a Reason of no less than Excellent.",
    "category": "Scientific",
    "notes": "Resources vary from Good to Remarkable, determined by the Judge."
  },
  "Biology": {
    "description": "The character is in touch with someone with Biology ability. The Contact has the Biology Talent and a Reason of no less than Excellent.",
    "category": "Scientific",
    "notes": "Resources vary from Good to Remarkable, determined by the Judge."
  },
  "Geology": {
    "description": "The character is in touch with someone with Geology ability. The Contact has the Geology Talent and a Reason of no less than Excellent.",
    "category": "Scientific",
    "notes": "Resources vary from Good to Remarkable, determined by the Judge."
  },
  "Genetics": {
    "description": "The character is in touch with someone with Genetics ability. The Contact has the Genetics Talent and a Reason of no less than Excellent.",
    "category": "Scientific",
    "notes": "Resources vary from Good to Remarkable, determined by the Judge."
  },
  "Archeology": {
    "description": "The character is in touch with someone with Archeology ability. The Contact has the Archeology Talent and a Reason of no less than Excellent.",
    "category": "Scientific",
    "notes": "Resources vary from Good to Remarkable, determined by the Judge."
  },
  "Physics": {
    "description": "The character is in touch with someone with Physics ability. The Contact has the Physics Talent and a Reason of no less than Excellent.",
    "category": "Scientific",
    "notes": "Resources vary from Good to Remarkable, determined by the Judge."
  },
  "Computers": {
    "description": "The character is in touch with someone with Computers ability. The Contact has the Computers Talent and a Reason of no less than Excellent.",
    "category": "Scientific",
    "notes": "Resources vary from Good to Remarkable, determined by the Judge."
  },
  "Electronics": {
    "description": "The character is in touch with someone with Electronics ability. The Contact has the Electronics Talent and a Reason of no less than Excellent.",
    "category": "Scientific",
    "notes": "Resources vary from Good to Remarkable, determined by the Judge."
  },

  // ===== POLITICAL CONTACTS =====
  "Local": {
    "description": "The hero has an ally in the local political scene: alderman, mayor, or councilman. The Contact may provide information on what is going on in the neighborhood.",
    "category": "Political"
  },
  "State": {
    "description": "The hero has an ally in state government -- connected with the office of governor, a state representative, or someone in one of the state agencies. The Contact may provide Good services and information, as well as equipment of up to Remarkable Resource cost.",
    "category": "Political"
  },
  "National": {
    "description": "The hero has a Contact in national government -- a congressional aide, a congressman, representative, member of the Executive Branch or one of the myriad number of agencies that infest the capital. Resources of up to Monstrous in their field may be gained, but the more powerful the Contact, the more likely the favor will be called in.",
    "category": "Political"
  },
  "Other National": {
    "description": "The hero has a Contact in national government -- someone else's. The hero may be friendly with the leadership or government apparatus of any other nation, friend or foe. This Contact, if known to others, may create difficulties in dealing with other political Contacts. Resources available are as for National government, but the character must be able to communicate with the Contact to gain any materials.",
    "category": "Political"
  },
  "International": {
    "description": "The hero has Contacts in the UN or in a similar multi-national organization, such as the Common Market of Europe. This type of Contact can provide equipment of up to Monstrous Resource rank.",
    "category": "Political"
  },
  "Planetary": {
    "description": "This Contact is available to Alien characters only. The hero is well-known to the inhabitants and/or rulers of another planet, and may call on those Resources (up to Unearthly or higher) provided they can get in contact with those sources.",
    "category": "Political",
    "notes": "Available to Alien characters only."
  },

  // ===== MYSTIC CONTACTS =====
  "Religion": {
    "description": "The hero has a Contact with someone who is aware of extra-dimensional powers greater than our own.",
    "category": "Mystic"
  },
  "Occult Lore": {
    "description": "The hero knows someone who \"dabbles\" in the darker arts, and as such has at least a Remarkable Reason involving these matters. The Contact may provide advice on mystic writings, spells and their castings, and curses. The Contact is not necessarily someone of Doctor Strange's category (a true magic-wielder), but most likely a college professor who has done copious reading on the subject.",
    "category": "Mystic"
  },
  "Mythology": {
    "description": "Similar to Occult Lore, with the direction towards recognized mythology: actions of the extra-dimensional beings known as gods (Olympians, Asgardians, etc.). The Contact will specialize in one \"pantheon\" of deities.",
    "category": "Mystic"
  }
};
