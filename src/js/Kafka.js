const { Ossuary } = require('./ossuary');
const $ = require('jquery');
const { LibrumOfExperiences } = require('./LibrumOfExperiences');

class Kafka {

  constructor () {
    this.ossuary = new Ossuary(LibrumOfExperiences);
    for (let i = 0; i < 10; i++) {
      const $el = this.getInputElement();
      $('body').append($el);
    }
  }

  getInputElement (options) {
    const type = this.getInputType();
    const questionType = this.ossuary.parse('[questionTypes]');
    const question = this.recursiveslyParse(this.ossuary.parse(`[questions.${questionType}]`));
    switch (type) {
      case 'input-text':
        return this.buildInputText(question);
      case 'input-number':
        return this.buildInputNumber(question);
      case 'select':
        return this.buildInputSelect(question);
      case 'radio':
        return this.buildInputRadio(question);
    }
  }

  getInputType () {
    return this.ossuary.parse('{input-text^2|input-number^.6|select|radio}');
  }

  buildInputText (question) {
    let $el = $('<div><input required type="text"/></div>');
    $el.prepend(this.getQuestionEl(question));
    return $el;
  }

  buildInputNumber (question) {
    let $el = $('<div><input required type="number"/></div>');
    $el.prepend(this.getQuestionEl(question));
    return $el;
  }

  buildInputSelect (question) {
    let $el = $('<div><select required></select></div>');
    $el.prepend(this.getQuestionEl(question));
    return $el;
  }

  buildInputRadio (question) {
    let $el = $('<div><input required type="radio"/></div>');
    $el.prepend(this.getQuestionEl(question));
    return $el;
  }

  recursiveslyParse (str) {
    console.log(str);
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