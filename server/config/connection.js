const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yard-to-table');

module.exports = mongoose.connection;
