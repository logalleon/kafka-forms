const { Ossuary } = require('./ossuary');
const { LibrumOfExperiences } = require('./LibrumOfExperiences');
const { randomIntR, randomInt, pluck } = require('./Random');
const { startCase, lowerCase, camelCase } = require('lodash');

const ROW_STYLES = '{normal^4|wrapped|inverse}';
const NUMBER_PER_ROW = '{1|2}';

class Kafka {

  constructor () {
    this.totalQuestions = 0;
    this.unreferenceQuestions = [];
    this.referencedQuestions = [];
    this.referenceThreshold = 100;
    this.minRadioOptions = 1;
    this.maxRadioOptions = 5;
    this.ossuary = new Ossuary(LibrumOfExperiences);
    this.changeThreshold = 2;
    this.newRowsGenerated = 0;
    
    let $form = $(`
      <form
        id="${this.generateFormId()}"
        action="${this.generateFormAction()}"
      ></form>
    `);
    
    let windowHeight = window.innerHeight;
    let totalHeight = 0;
    $('body').append($form);
    // Continue to generate elements until the total height of all
    // elements is greater than the initial window height
    while (totalHeight < windowHeight) {
      var $row = this.generateRow();
      $form.append($row);
      totalHeight = $form.height();
    }
    $form.append(this.generateSubmit());
    this.questionChanged = this.questionChanged.bind(this);
    $('input').on('change', this.questionChanged);
  }

  questionChanged () {
    const totalWithValues = this.getTotalWithValues();
    console.log(totalWithValues, Math.floor(totalWithValues / this.changeThreshold), this.newRowsGenerated);
    if (Math.floor(totalWithValues / this.changeThreshold) > this.newRowsGenerated) {
      this.newRowsGenerated++;
      const $submit = $('form input[type="submit"]').detach();
      $('form').append(this.generateRow()).append(this.generateRow()).append($submit);
      $('input').on('change', this.questionChanged);
    }
  }

  getTotalWithValues() {
    let radioTotal = 0;
    $.each($('.radio'), (i, el) => {
      $.each($(el).find('input[type="radio"]'), (i, el) => {
        radioTotal += $(el).is(':checked') ? 1 : 0;
      });
    });
    let textTotal = 0;
    $.each($('input[type="text"]'), (i, el) => {
      textTotal += $(el).val().trim().length ? 1 : 0;
    });
    let numberTotal = 0;
    $.each($('input[type="number"]'), (i, el) => {
      numberTotal += $(el).val() ? 1 : 0;
    });
    return radioTotal + textTotal + numberTotal;
  }

  generateRow () {
    const numberPerRow = Number(this.ossuary.parse(NUMBER_PER_ROW));
    const rowStyle = this.ossuary.parse(ROW_STYLES);
    const $row = $(`
      <div class="row ${rowStyle}"></div>
    `);
    for (let i = 0; i < numberPerRow; i++) {
      const $el = this.getInputElement();
      const ratio = this.getRatio(numberPerRow);
      $el.addClass(ratio);
      $row.append($el);
      this.totalQuestions++;
      this.unreferenceQuestions.push(this.totalQuestions);
    }
    return $row;
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
      case 'radio':
        return this.buildInputRadio(questionType);
      default:
        throw new Error('what');
    }
  }

  getInputType () {
    return this.recursiveslyParse('{text|number|radio}');
  }

  buildInputText (type) {
    const question = lowerCase(this.recursiveslyParse('[inputQuestions]'));
    let $el = $(`
      <div class="columns text">
        <input required type="text" placeholder="${this.recursiveslyParse('[placeholders]')}"/>
      </div>
    `);
    $el.prepend(this.getQuestionEl(question));
    return $el;
  }

  buildInputNumber (type) {
    const question = lowerCase(this.recursiveslyParse('[inputQuestions]'));
    let $el = $(`
      <div class="columns number">
        <input required type="number"/>
      </div>
    `);
    $el.prepend(this.getQuestionEl(question));
    return $el;
  }

  buildInputRadio (type) {

    const typeOfQuestion = this.ossuary.parse(`{General|YesNo^2}`);
    const question = lowerCase(this.recursiveslyParse(`[selectOrRadio${typeOfQuestion}Questions]`));
    const name = randomInt(0, 100000);
    let $el = $(`
      <div class="columns radio"></div>
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