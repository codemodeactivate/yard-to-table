const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yard-to-table');
console.log(mongoose.connection.readyState);
module.exports = mongoose.connection;
