const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/mernEnable';

const run = async () => {
  try {
    await mongoose.connect(url);
    console.log('You have successfully connected to MongoDB!');
  } catch (error) {
    console.error(error);
  }
};
module.exports = run;
