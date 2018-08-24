const { Ossuary } = require('./ossuary');
const $ = require('jquery');
const { LibrumOfExperiences } = require('./LibrumOfExperiences');
const { randomIntR, randomInt, pluck } = require('./Random');
const { startCase, lowerCase, camelCase } = require('lodash');

class Kafka {

  constructor () {
    this.totalQuestions = 0;
    this.unreferenceQuestions = [];
    this.referencedQuestions = [];
    this.referenceThreshold = 100;
    this.minRadioOptions = 2;
    this.maxRadioOptions = 5;
    this.minSelectOptions = 2;
    this.maxSelectOptions = 10;
    this.ossuary = new Ossuary(LibrumOfExperiences);
    let numberPerRow = Number(this.ossuary.parse('{1|2|4}'));
    let currentRowItem = 0;
    let $form = $(`
      <form
        id="${this.generateFormId()}"
        action="${this.generateFormAction()}"
      ></form>
    `);
    let $row = $(`
      <div class="row"></div>
    `);
    let windowHeight = window.innerHeight;
    let totalHeight = 0;
    $('body').append($form);
    // Continue to generate elements until the total height of all
    // elements is greater than the initial window height
    while (totalHeight < windowHeight) {
      const $el = this.getInputElement();
      const ratio = this.getRatio(numberPerRow);
      $el.addClass(ratio);
      $row.append($el);
      currentRowItem++;
      this.totalQuestions++;
      this.unreferenceQuestions.push(this.totalQuestions);
      if (currentRowItem === numberPerRow) {
        $form.append($row);
        numberPerRow = Number(this.ossuary.parse('{1|2|4}'));
        currentRowItem = 0;
        $row = $(`
          <div class="row"></div>
        `);
      }
      totalHeight = $form.height();
    }
    $form.append(this.generateSubmit());
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
      case 'text':
        return this.buildInputText(questionType);
      case 'number':
        return this.buildInputNumber(questionType);
      case 'select':
        return this.buildInputSelect(questionType);
      case 'radio':
        return this.buildInputRadio(questionType);
      default:
        throw new Error('what');
    }
  }

  getInputType () {
    return this.recursiveslyParse('{text|number|select|radio}');
  }

  buildInputText (type) {
    const question = lowerCase(this.recursiveslyParse('[inputQuestions]'));
    let $el = $(`
      <div class="columns">
        <input required type="text" placeholder="${this.recursiveslyParse('[placeholders]')}"/>
      </div>
    `);
    $el.prepend(this.getQuestionEl(question));
    return $el;
  }

  buildInputNumber (type) {
    const question = lowerCase(this.recursiveslyParse('[inputQuestions]'));
    let $el = $(`
      <div class="columns">
        <input required type="number"/>
      </div>
    `);
    $el.prepend(this.getQuestionEl(question));
    return $el;
  }

  buildInputSelect (type) {

    const typeOfQuestion = this.ossuary.parse(`{General|YesNo^2}`);
    const question = lowerCase(this.recursiveslyParse(`[selectOrRadio${typeOfQuestion}Questions]`));
    let $el = $(`
      <div class="columns">
        <select required></select>
      </div>
    `);
    let max = randomIntR({
      low: this.minSelectOptions,
      high: this.maxSelectOptions
    });
    let answers = this.recursiveslyParse(`[selectOrRadio${typeOfQuestion}Answers.${type}:unique(${max})]`);
    answers = answers.split('%');
    if (this.shouldAddReference()) {
      // Either append or prepend the referenced question
      $el[this.ossuary.parse('{prepend|append}')](this.getQuestionReference(answers));
    }
    $el.prepend(this.getQuestionEl(question));
    answers.forEach((answer) => {
      $el.find('select').append(
        $(`
          <option>${answer}</option>
        `)
      );
    });
    return $el;
  }

  buildInputRadio (type) {

    const typeOfQuestion = this.ossuary.parse(`{General|YesNo^2}`);
    const question = lowerCase(this.recursiveslyParse(`[selectOrRadio${typeOfQuestion}Questions]`));
    const name = randomInt(0, 100000);
    let $el = $(`
      <div class="columns"></div>
    `);
    let max = randomIntR({
      low: this.minRadioOptions,
      high: this.maxRadioOptions
    });
    let answers = this.recursiveslyParse(`[selectOrRadio${typeOfQuestion}Answers.${type}:unique(${max})]`);
    answers = answers.split('%');
    answers.forEach((answer, i) => {
      $el.append(
        $(`
          <div>
            <input type="radio" id="${name}-${i}" type="radio" name=${name}/>
            <label
              style="display: inline"
              for="${name}-${i}"
            >${answer}</label>
          </div>
        `)
      );
    });
    console.log(question);
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

  shouldAddReference () {
    return randomInt(1, 100) <= this.referenceThreshold;
  }

  getQuestionReference (answers) {
    const number = pluck(this.unreferenceQuestions);
    const index = this.unreferenceQuestions.indexOf(number);
    // Remove the now-referenced question
    this.unreferenceQuestions = [].concat(
      this.unreferenceQuestions.slice(0, index),
      this.unreferenceQuestions.slice(index + 1)
    );
    this.referencedQuestions.push(number);
    const $el = $(`
      <p></p>
    `);
    const answer = pluck(answers);
    let text = `If you answer ${answer} for this question, please ${this.ossuary.parse('{skip|immediately answer}')} question ${number}.`;
    $el.text(text);
    return $el;
  }

}

module.exports = Kafka;