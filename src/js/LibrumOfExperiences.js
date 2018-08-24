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
    'Can you [recollection] life as a young and carefree youth?'
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

const recollection = [
  'recall',
  'recollect',
  'remember',
  'bring up the memory of'
];

const selectOrRadioGeneralQuestions = {
  surreal: [
    '[choiceWords] this list of recent dreams or nightmares.',
    '[choiceWords] the option which is least likely to be performed by your [relative].'
  ],
  personal: [
    '[request] [choiceWords] that which you remember before you were born.'
  ],
  dark: [
    'Have you witnessed the death of another human?'
  ],
  polticial: [
    'How futile is the revolution?'
  ],
  judicial: [
    'Have you committed illegal acts against [animals]?'
  ],
  religious: [
    `Does the {complete absence|obvious implausability|shocking silence}
    of God make you feel {the looming shadow of oblivion|uneasy|pain|terror}?`
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
  'Choose at least [numbers] but no more than one from'
];

const writingTool = [
  '[colors] pen only',
  '[colors] whittled pencil',
  'quill pen',
  'a [colors] crayon from your childhood'
];

const colors = [
  'beige',
  'pale blue',
  'indigo',
  'red',
  'black',
  'bread-crust brown',
  'rust',
  'infinite gray',
  'funeral-day gray',
  'white',
  'tea-stained-paper-colored'
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
  'the number of flecks of dust cast upon your bathroom tile'
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
    'seeds of [tree|flower]'
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
}

const selectOrRadioGeneralAnswers = {
  surreal: [
    'Okay',
    'Sure'
  ],
  personalAnswers: [
    'Something',
    'Another'
  ],
  darkAnswers: [
    'That',
    'What'
  ],
  polticialAnswers: [
    'Pl',
    'ok'
  ],
  judicialAnswers: [
    'AKDF',
    'dfal'
  ],
  religiousAnswers: [
    'Animals!',
    'asdflkj'
  ]
}

const animals = [
  'horse',
  'goat'
]

const gloryish = [
  'glory',
  'supremity',
  'supiority',
  'continued success'
];

const formOfGovernment = [
  'republic',
  'democracy',
  'monarchy',
  'oligarchy',
  'plutocracy',
  'dictatorship'
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
  'Yes',
  'No',
  '{I beg you|Please|I ask you to} stop',
  'I cannot continue, but I must continue',
  'Of course',
  'I cannot {lie|say|agree}',
  'Never'
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