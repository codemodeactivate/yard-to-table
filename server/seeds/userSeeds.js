const mongoose = require('mongoose');
const db = require('../config/connection');
const { User, GardenerProfile, HomeownerProfile } = require('../models/User');

async function seedUsers() {
  // Connect to the Mongo DB
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yard-to-table', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await User.deleteMany({});
    await GardenerProfile.deleteMany({});
    await HomeownerProfile.deleteMany({});

    const users = [];

    for (let i = 0; i < 10; i++) {
      let gardenerProfile = null;
      let homeownerProfile = null;

      if (i % 2 === 0) {
        gardenerProfile = await GardenerProfile.create({
          experience: i * 2,
          areasServed: [`Area ${i}`],
          specialties: [`Specialty ${i}`],
          rating: i % 5,
        });
      } else {
        homeownerProfile = await HomeownerProfile.create({
          gardenType: `Type ${i}`,
        });
      }

      const user = {
        firstName: `Test User ${i + 1}`,
        lastName: `Test Last ${i + 1}`,
        username: `testuser${i + 1}`,
        email: `testuser${i + 1}@example.com`,
        password: `password${i + 1}`,
        address: `123 Test St ${i + 1}`,
        isGardener: i % 2 === 0,
        isHomeowner: i % 2 !== 0,
        gardenerProfile: gardenerProfile ? gardenerProfile._id : undefined,
        homeownerProfile: homeownerProfile ? homeownerProfile._id : undefined,
      };

      users.push(user);
    }

    const insertedUsers = await User.insertMany(users);
    console.log(`${insertedUsers.length} users seeded!`);
    return insertedUsers; // Return the inserted users 
  } catch (err) {
    console.error(err);
    throw err; // This ensures that the error propagates to the calling function
  }
}

module.exports = seedUsers;
