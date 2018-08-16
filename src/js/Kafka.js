const { Ossuary } = require('./ossuary');
const $ = require('jquery');
const { LibrumOfExperiences } = require('./LibrumOfExperiences');
const { randomIntR } = require('./Random');

class Kafka {

  constructor () {
    this.ossuary = new Ossuary(LibrumOfExperiences);
    let numberPerRow = randomIntR({ low: 1, high: 4 });
    let currentRowItem = 0;
    let $row = $('<div class="row"></div>');
    for (let i = 0; i < 10; i++) {
      const $el = this.getInputElement();
      const ratio = this.getRatio(numberPerRow);
      console.log(ratio);
      $el.addClass(ratio);
      $row.append($el);
      currentRowItem++;
      console.log(currentRowItem, numberPerRow);
      if (currentRowItem === numberPerRow || (i === (10 - 1))) {
        $('body').append($row);
        numberPerRow = Number(this.ossuary.parse('{1|2|4}'));
        currentRowItem = 0;
        $row = $('<div class="row"></div>');
      }
    }
  }

  getRatio (number) {
    switch (number) {
      case 1:
        return 'twelve';
      case 2:
        return 'six';
      case 3:
        return 'four';
      case 4:
        return 'three';
    }
  }

  getInputElement (options) {
    const type = this.getInputType();
    const questionType = this.ossuary.parse('[questionTypes]');
    const question = this.recursiveslyParse(this.ossuary.parse(`[questions.${questionType}]`));
    switch (type) {
      case 'input-text':
        return this.buildInputText(question, type);
      case 'input-number':
        return this.buildInputNumber(question, type);
      case 'select':
        return this.buildInputSelect(question, type);
      case 'radio':
        return this.buildInputRadio(question, type);
    }
  }

  getInputType () {
    return this.ossuary.parse('{input-text^2|input-number^.6|select|radio}');
  }

  buildInputText (question, type) {
    let $el = $('<div class="columns"><input required type="text"/></div>');
    $el.prepend(this.getQuestionEl(question));
    return $el;
  }

  buildInputNumber (question, type) {
    let $el = $('<div class="columns"><input required type="number"/></div>');
    $el.prepend(this.getQuestionEl(question));
    return $el;
  }

  buildInputSelect (question, type) {
    let $el = $('<div class="columns"><select required></select></div>');
    $el.prepend(this.getQuestionEl(question));
    let max = randomIntR({ low: 2, high: 10 });
    let answers = this.ossuary.parse(`[answers.${type}Answers:unique(${max})]`);
    answers = answers.split(' ');
    answers.forEach((answer) => {
      $el.find('select').append($(`<option>${answer}</option>`));
    });
    return $el;
  }

  buildInputRadio (question) {
    let $el = $('<div class="columns"><input required type="radio"/></div>');
    $el.prepend(this.getQuestionEl(question));
    return $el;
  }

  recursiveslyParse (str) {
    let parsed = this.ossuary.parse(str);
    if (str === parsed) {
      return parsed;
    } else {
      return this.recursiveslyParse(parsed);
    }
  }

  getQuestionEl (question) {
    return `<label>${question}</label>`;
  }

}

module.exports = Kafka;