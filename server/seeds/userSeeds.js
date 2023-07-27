const mongoose = require('mongoose');
const db = require('../config/connection');
const { User } = require('../models/User');

async function seedUsers() {
  // Connect to the Mongo DB
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yard-to-table', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  const users = Array.from({ length: 10 }, (_, i) => ({
    name: `Test User ${i + 1}`,
    username: `testuser${i + 1}`,
    email: `testuser${i + 1}@example.com`,
    password: `password${i + 1}`,
    address: `123 Test St ${i + 1}`,
    isGardener: i % 2 === 0,
    isHomeowner: i % 2 !== 0,
  }));

  try {
    await User.deleteMany({});
    const insertedUsers = await User.insertMany(users);
    console.log(`${insertedUsers.length} users seeded!`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  mongoose.connection.close();
}

module.exports = seedUsers;
