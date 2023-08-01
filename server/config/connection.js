const mongoose = require('mongoose');
mongoose.set('debug', true);


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yard-to-table');
console.log(mongoose.connection.readyState);
module.exports = mongoose.connection;
