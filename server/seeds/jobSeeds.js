const seedUsers = require('./userSeeds');
const seedPlots = require('./plotSeeds');
const Jobs = require('../models/Jobs');
const mongoose = require('mongoose');
const db = require('../config/connection');

async function seedJobs() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yard-to-table', {
    //...rest of the options...
  });

  try {
    const users = await seedUsers();
    const plots = await seedPlots();

    const jobs = Array.from({ length: 10 }, (_, i) => ({
      title: `Test Job ${i + 1}`,
      dateRequested: "2021-05-01",
      homeowner: users[i]._id, // Use ObjectId from users
      gardener: users[(i + 1) % 10]._id, // Use ObjectId from users
      plot: plots[i]._id, // Use ObjectId from plots
      status: 'pending'
    }));

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