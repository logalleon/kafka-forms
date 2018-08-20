const { Ossuary } = require('./ossuary');
const $ = require('jquery');
const { LibrumOfExperiences } = require('./LibrumOfExperiences');
const { randomIntR, randomInt } = require('./Random');
const { startCase, lowerCase, camelCase } = require('lodash');

class Kafka {

  constructor () {
    this.ossuary = new Ossuary(LibrumOfExperiences);
    let numberPerRow = randomIntR({ low: 1, high: 4 });
    let currentRowItem = 0;
    let $form = $(`<form id="${this.generateFormId()}" action="${this.generateFormAction()}"></form>`);
    let $row = $('<div class="row"></div>');
    for (let i = 0; i < 10; i++) {
      const $el = this.getInputElement();
      const ratio = this.getRatio(numberPerRow);
      $el.addClass(ratio);
      $row.append($el);
      currentRowItem++;
      if (currentRowItem === numberPerRow || (i === (10 - 1))) {
        $form.append($row);
        numberPerRow = Number(this.ossuary.parse('{1|2|4}'));
        currentRowItem = 0;
        $row = $('<div class="row"></div>');
      }
    }
    $form.append(this.generateSubmit());
    $('body').append($form);
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
    switch (type) {
      case 'input-text':
        return this.buildInputText(type);
      case 'input-number':
        return this.buildInputNumber(type);
      case 'select':
        return this.buildInputSelect(type);
      case 'radio':
        return this.buildInputRadio(type);
    }
  }

  getInputType () {
    return this.ossuary.parse('{input-text^2|input-number^.6|select|radio}');
  }

  buildInputText (type) {
    const question = lowerCase(this.recursiveslyParse('[inputQuestions]'));
    let $el = $(`
      <div class="columns">
        <input required type="text" placeholder="${this.ossuary.parse('[placeholders]')}"/>
      </div>
    `);
    $el.prepend(this.getQuestionEl(question));
    return $el;
  }

  buildInputNumber (type) {
    const question = lowerCase(this.recursiveslyParse('[inputQuestions]'));
    let $el = $('<div class="columns"><input required type="number"/></div>');
    $el.prepend(this.getQuestionEl(question));
    return $el;
  }

  buildInputSelect (type) {
    const question = lowerCase(this.recursiveslyParse('[selectOrRadioQuestions]'));
    let $el = $('<div class="columns"><select required></select></div>');
    $el.prepend(this.getQuestionEl(question));
    let max = randomIntR({ low: 2, high: 10 });
    let answers = this.ossuary.parse(`[selectOrRadioAnswers.${type}:unique(${max})]`);
    answers = answers.split(' ');
    answers.forEach((answer) => {
      $el.find('select').append($(`<option>${answer}</option>`));
    });
    return $el;
  }

  buildInputRadio (type) {
    const question = lowerCase(this.recursiveslyParse('[selectOrRadioQuestions]'));
    const name = randomInt(0, 100000);
    let $el = $(`<div class="columns"></div>`);
    let max = randomIntR({ low: 2, high: 10 });
    let answers = this.ossuary.parse(`[selectOrRadioAnswers.${type}:unique(${max})]`);
    answers = answers.split(' ');
    answers.forEach((answer, i) => {
      $el.append($(`
      <div>
        <input type="radio" id="${name}-${i}" type="radio" name=${name}/>
        <label for="${name}-${i}">${answer}</label>
      </div>
      `));
    });
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

  generateFormAction () {
    return camelCase(this.ossuary.parse(`{lost causes|balefulness|the department of departments}`));
  }

  generateFormId () {
    return camelCase(this.ossuary.parse(`{the gate of the law|the penal colony|the process}`));
  }

  generateSubmit () {
    return $(`<input type="submit" value="${this.ossuary.parse(`{end|finish|complete|submit}`)}"/>`);
  }

}

module.exports = Kafka;