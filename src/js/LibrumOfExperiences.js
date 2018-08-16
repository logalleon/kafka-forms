const questionTypes = [
  'surreal',
  'personal',
  'dark',
  'polticial',
  'judicial',
  'religious',
];

const questions = {
  surrealQuestions: [
    'What is the true purpose of [animals]?'
  ],
  personalQuestions: [
    'What did you remember before you were born?'
  ],
  darkQuestions: [
    'Have you witnessed the death of another human?'
  ],
  polticialQuestions: [
    'How futile is the revolution?'
  ],
  judicialQuestions: [
    'Have you committed illegal acts against [animals]?'
  ],
  religiousQuestions: [
    `Does the {complete absence|obvious implausability|shocking silence}
    of God make you {feel the looming shadow of oblivion|lull you into false security|uneasy|pain|terror}?`
  ],
}

const answers = {
  surrealAnswers: [
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

const LibrumOfExperiences = {
  questionTypes,
  questions,
  animals,
  answers
}
module.exports = { questionTypes, LibrumOfExperiences }