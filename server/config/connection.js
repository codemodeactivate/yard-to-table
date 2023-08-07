const mongoose = require('mongoose');
mongoose.set('debug', true);


mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/yard-to-table');;
console.log(mongoose.connection.readyState);
module.exports = mongoose.connection;
