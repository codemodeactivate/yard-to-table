const mongoose = require('mongoose');
const db = require('../config/connection');
const { User, GardenerProfile, HomeownerProfile } = require('../models/User');
const Plot = require('../models/Plot');
const axios = require('axios');


async function getRandomHeadshotUrl() {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    return response.data.results[0].picture.large;
  } catch (error) {
    console.error('Failed to fetch headshot:', error);
    return null; // Return null or a default image URL if the fetch fails
  }
}

async function seedUsers() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yard-to-table', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    const users = [];
    const plots = [];
    await User.deleteMany({});
    await GardenerProfile.deleteMany({});
    await HomeownerProfile.deleteMany({});
    await Plot.deleteMany({});

    for (let i = 0; i < 10; i++) {
      let gardenerProfileDocument = null;
      let homeownerProfileDocument = null;

      const profilePic = await getRandomHeadshotUrl(); // Get the random headshot URL

      const user = {
        firstName: `Test User ${i + 1}`,
        lastName: `Test Last ${i + 1}`,
        email: `testuser${i + 1}@example.com`,
        password: `password${i + 1}`,
        address: `123 Test St ${i + 1}`,
        isGardener: i % 2 === 0,
        isHomeowner: i % 2 !== 0,
        profilePic,
      };

      const userDocument = await User.create(user);

      if (i % 2 === 0) {
        let specialty;

      switch (i % 3) {
        case 0:
          specialty = ['vegetable'];
          break;
        case 1:
          specialty = ['pollinator'];
          break;
        case 2:
          specialty = ['vegetable', 'pollinator'];
          break;
        default:
          specialty = [];
          break;
      }
      //gardeners can have more than one specialty or none at all
        gardenerProfileDocument = await GardenerProfile.create({
          yearsExperience: i * 2,
          areaServed: [`Area ${i}`],
          specialty: specialty,  // Example logic,
          rating: i % 5,
          cost: (i * 10) + 50, // Example cost calculation
          bio: `This is a sample bio for gardener number ${i}. Add more specific details here.`, // Example bio
          // photo: headshotUrl || `path/to/default/photo.jpg`, // Example photo path
        });
      } else {
        const plot = await Plot.create({
          name: `Plot ${i}`,
          address: `123 Plot St ${i}`,
          sqft: i * 100,
          category: `Category ${i}`,
          userID: userDocument._id,
        });

        plots.push(plot); // Add the plot to the array

        homeownerProfileDocument = await HomeownerProfile.create({
          plots: [plot._id],
        });
      }

      const updatedUser = await User.findByIdAndUpdate(userDocument._id, {
        gardenerProfile: gardenerProfileDocument ? gardenerProfileDocument._id : undefined,
        homeownerProfile: homeownerProfileDocument ? homeownerProfileDocument._id : undefined,
      }, { new: true }); // Update the user and return it

      users.push(updatedUser); // Add the user to the array
    }

    console.log('Seed complete!');

    return { users, plots }; // Return the users and plots
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = seedUsers;
