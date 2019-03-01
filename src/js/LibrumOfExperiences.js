const questionTypes = [
  'surreal',
  'personal',
  'dark',
  'polticial',
  'judicial',
  'religious',
];

const inputQuestions = {
  surreal: [
    'test'
  ],
  personal: [
    'test'
  ],
  dark: [
    'test'
  ],
  polticial: [
    'test'
  ],
  judicial: [
    'test'
  ],
  religious: [
    'test'
  ]
};

const selectOrRadioYesNoQuestions = {
  surreal: [
    'Have you ever been witness to the collapse of dreams?',
    'Does the faltering of the stars remind you of the future?',
    'Can you recall the horrors of the past in great detail?',
    'What will remain when there is nothing but static?',
    'Has the future now become the past?',
    'Can you transcend it all or shall you be pulled into it?'
  ],
  personal: [
    'Do you think often of the now-vague memory of your [relatives]?',
    'Can you [recollection] life as a young and carefree youth?',
    'Can you account for the passage of years?',
    'Do you agree that you can {hasten|slow|stop} the passage of time?'
  ],
  dark: [
    'Do you think that the noises will cease?',
    'Do you agree with the slow, oozing liquids in the basement?',
    'Can you see the shadows between the rays of light?',
    'Can you hear the slow beating of the heart under the rose bush?',
    'Do you see the blood which pours from the eyes of the statue in the town square?',
    'Do you think that they will find you?'
  ],
  polticial: [
    'Do you believe that you are innocent?',
    'Do you believe that there is a will which drives the people?',
    'Do you agree with your contempories?'
  ],
  judicial: [
    'Do you believe you can stand against the law?'
  ],
  religious: [
    'Do you hear the sound of the dead through the walls?',
    'Do you believe the priests with masks upon their faces?',
    'Have you see what waits in the bands of the ocean waves?'
  ]
};

const recollection = [
  'recall',
  'recollect',
  'remember',
  'bring up the memory of'
];

const selectOrRadioGeneralQuestions = {
  surreal: [
    '[choiceWords] this list of recent dreams or nightmares.',
    '[choiceWords] the option which is least likely to be resisted by your [relatives].'
  ],
  personal: [
    '[request] [choiceWords] that which you remember before you were born.',
    '[request] recall the past, the present, the future, simultaneously'
  ],
  dark: [
    'Have you witnessed the death of another human?',
    'How do the screams make you feel?',
    'Who have you seen in the shadows?',
    'What arises during the slow fade into dusk?'
  ],
  polticial: [
    'How futile is the revolution?',
    'Where are you hiding the {plans of the revolutionaries|papers on removing the monarchy}?',
    'Do you feel the presence of the eyes that watch you?'
  ],
  judicial: [
    'Have you committed illegal acts against {a} [animals]?',
    'Have you ever slandered a judge?',
    'Can you speak the names of any of the judges who know your name?',
    'What is the absolute truth of the law?',
    'Have you committed crimes against the [formOfGovernment]?',
    'Were were you [numbers] years ago on this very day?',
    'When will you give in?'
  ],
  religious: [
    `Does the {complete absence|obvious implausability|shocking silence}
    of God make you feel {the looming shadow of oblivion|uneasy|pain|terror}?`,
    'Do you see the priests that follow?',
    'What follows in the hallowed halls?',
    'Where is the voice of the lost deity coming from?',
    'When will you repent?',
    'Please explain why you haven\'t been to confession in [numbers] years.'
  ],
}

const request = [
  'Please',
  'Do kindly',
  'Will you',
  'Would you',
  'You must now',
  'For the [gloryish] of our [formOfGovernment]'
]

const choiceWords = [
  'Select',
  'Make a selection from',
  'Choose [ominousChoices] from',
  'Mark with [writingTool] [ominousChoices] from',
  'Choose at least [numbers] but no more than one from',
  'Choose [numbers] amount of answers at random',
  'Decide',
  'Select unwisely',
  'Select with great trepidation',
  'Make a selection without reason from',
  'Select without belief from'
];

const writingTool = [
  '[colors] pen only',
  '[colors] whittled pencil',
  'quill pen',
  'a [colors] crayon from your childhood',
  'a scrap of charcoal',
  'ink upon your fingertips',
  'a quill pen crafted from the femur of your [relatives]'
];

const colors = [
  'beige',
  'pale blue',
  'indigo',
  'red',
  'black',
  'bread-crust brown',
  'rust',
  'infinite grey',
  'funeral-day grey',
  'white',
  'tea-stained-paper-colored',
  'crow\' foot grey',
  'unyielding grey',
  'a shadow of blue',
  'hexed black',
  'void black',
  'aubergine',
  'the color of a frozen river',
  'the color of the flag of your home country'
];

const relatives = [
  'mother',
  'father',
  'sister',
  'brother',
  'aunt',
  'uncle',
  'grandmother',
  'grandfather',
  'great aunt',
  'great uncle',
  'great-grandmother',
  'great-grandfather'
]

const numbers = [
  'twelve or thirteen',
  'the number of your offspring',
  'the year of your death minus the current year',
  `the year of your birth plus the year of your paternal [relatives]'s year of birth`,
  'how long our prosperity will last, in days',
  'the number of flecks of dust cast upon your bathroom tile',
  'the number of hours lost',
  'the number of sunsets you will see for the rest of your life',
  'the number of threads in your childhood blanket',
  'ten times ten',
  'sevenfold seven',
  'six-hundred and sixty-six',
  'one thousand and five',
  'three',
  'exactly one and only one',
  'fourteen at most',
  'less than five hundred'
];

const ominousStates = [
  'blindly',
  'with great fear',
  'with much deliberation',
  'listlessly',
  'under duress',
  'with best intentions and worst outcomes',
  'as a groping shadow in the darkness',
  'with the menace of the panopticon',
  'under the gaze of unseens eyes'
];

const placeholders = {
  surreal: [
    '[suchas] dreams or fears',
    'ominous silence',
    'broken childhood dolls',
    '[fruit] remains',
    'the slow fading of time',
    'seeds of [tree|flower]'
  ],
  personal: [
    'a memory of [relatives]',
    'a childhood bedroom',
    'a lost thought of a now-dead friend',
    'a brief encounter with glory'
  ],
  dark: [
    'the growing, ominous silence',
    'the gaze of the raven'
  ],
  polticial: [
    'the monarchy',
    'the silent kings'
  ],
  judicial: [
    'the law',
    'fealty to [formOfGovernment]'
  ],
  religious: [
    'the clergy',
    'the masks of white and gold',
    'the lost gods'
  ]
}

const selectOrRadioGeneralAnswers = {
  surreal: [
    'a brittle arc of lightning cascading across the bleak night',
    'the tooth of a long-forgotten beast',
    'a quill made of hawk feathers',
    'a locket which hums in the dark',
    'a raw of light which cascades upon the dusty floor',
    'a remembrance etched upon the branches of a yew',
    'an ancient, dusty tomb',
    'a alembic, cracked and useless',
    'a torrid dream'
  ],
  personalAnswers: [
    'the last days of summer',
    'a childhood friend',
    'a doll which speaks softly when no one is looking',
    'scraps of paper',
    'what remains of your childhood'
  ],
  darkAnswers: [
    'a crushed mote of glass',
    'the brittle bones of time',
    'layers upon layers of flesh',
    '[numbers] years of sorrow',
    'a rain-soaked cemetery',
    'a mansion which rests gloomily upon a hill in the distance',
    'a cry which echoes across a moor'
  ],
  polticialAnswers: [
    'the gate of the Law',
    'all things good and loyal',
    'the [formOfGovernment]',
    'fielty to a faraway emperor',
    'taxation',
    'laws regarding libel and slander',
    'the all-powerful bureaucracy',
    'the department of departments',
    'the royalty in its infinite wisdom',
    'the department of time'
  ],
  judicialAnswers: [
    'the law and power',
    'the will of the judges',
    'the sound of the gavel sealing your fate',
    'a thousand documents without names',
    'citations for crimes not yet written',
    'timeless forms dressed in the robes of judges',
    'locked doors in a maze of judicial buildings',
    'silent orders passed down from higher powers',
    'mouthed words of your sentence',
    'crimes you will commit in the future',
    'the will of the judiciary and the loss of the right of appeal'
  ],
  religiousAnswers: [
    'a golden ray peaking through a crack in the attic',
    'a prayer bead cast upon the kitchen floor',
    'a card with a hymn written in a language lost to time',
    'a locket with the crossed out face of the Virgin Mary',
    'a timeless whisper from an unseen god'
  ]
}

const animals = [
  'horse',
  'goat',
  'llama',
  'a field mouse',
  'a hawk upon an {oak|yew|ash} tree',
  'cat',
  'dog',
]

const gloryish = [
  'glory',
  'supremacy',
  'supiority',
  'continued success',
  'eternal salvation',
  '{glorious|inevitable|predestined} victory',
];

const formOfGovernment = [
  'republic',
  'democracy',
  'monarchy',
  'oligarchy',
  'plutocracy',
  'dictatorship',
  'cabal',
  'coven',
];

const suchas = [
  'including',
  'such as',
  'i.e.',
  'e.g.',
  'perchance',
  'perhaps',
  'possibly',
  'maybe'
];

const selectOrRadioYesNoAnswers = [
  'yes',
  'no',
  'absolutely',
  '{I beg you|please|I ask you to} stop',
  'I cannot continue, but I must continue',
  'of course',
  'I cannot {lie|say|agree}',
  'never',
  'possibly so',
  'I can no longer recall',
  'why do you ask this of me?',
  'there is no denying this truth',
  'no, and I cannot say why',
  'no, even though my arrest will follow for me saying no',
  'nothing can be said of this',
  'I refuse to answer',
  'I will refuse to answer in the future',
  'there is nothing that can be said of this',
];

const LibrumOfExperiences = {
  questionTypes,
  selectOrRadioGeneralQuestions,
  selectOrRadioGeneralAnswers,
  inputQuestions,
  placeholders,
  animals,
  choiceWords,
  ominousStates,
  numbers,
  writingTool,
  request,
  relatives,
  gloryish,
  formOfGovernment,
  suchas,
  selectOrRadioYesNoAnswers,
  selectOrRadioYesNoQuestions,
  recollection
}
module.exports = { questionTypes, LibrumOfExperiences }