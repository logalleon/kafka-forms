const { Ossuary } = require('./ossuary');
const LibrumOfExperiences = require('./LibrumOfExperiences');

class Kafka {

  constructor () {
    this.ossuary = new Ossuary(LibrumOfExperiences);
  }

}

module.exports = Kafka;