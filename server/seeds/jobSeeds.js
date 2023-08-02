const seedUsers = require('./userSeeds');
const seedPlots = require('./plotSeeds');
const Jobs = require('../models/Jobs');
const mongoose = require('mongoose');
const db = require('../config/connection');

async function seedJobs() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yard-to-table', {
    //...rest of the options...
  });
  const { users, plots } = await seedUsers();
  try {
    // const { users, plots } = await seedUsers(); // Destructure users and plots
    // const users = await seedUsers();
    // const plots = await seedPlots();

    let plotIndex = 0;
const jobs = users.reduce((acc, user, i) => {
  if (user.isHomeowner && plotIndex < plots.length) {
    const homeownerId = user._id;
    const gardenerId = users[(i + 1) % 10]._id;
    const plotId = plots[plotIndex]._id;

    acc.push({
      title: `Test Job ${i + 1}`,
      dateRequested: "2021-05-01",
      homeowner: homeownerId,
      gardener: gardenerId,
      plot: plotId,
      status: 'pending'
    });

    plotIndex++;
  }
  return acc;
}, []);

    await Jobs.deleteMany({});
    console.log("Deleted old jobs from database.");
    const insertedJobs = await Jobs.insertMany(jobs);
    console.log(`${insertedJobs.length} jobs seeded!`);
  } catch (err) {
    console.error("Error in seedJobs:", err);
    process.exit(1);
  }

  mongoose.connection.close();
}

module.exports = seedJobs;
