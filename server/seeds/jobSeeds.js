const { Jobs } = require('../models/Jobs');
const mongoose = require('mongoose');
const db = require('../config/connection');

async function seedJobs() {
  // Connect to the Mongo DB
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yard-to-table', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  const users = Array.from({ length: 10 }, (_, i) => ({
    title: `Test Job ${i + 1}`,
    dateRequested: "2021-05-01",
    homeowner: `testUser${i + 1}`,
    gardener: `testGardener${i + 1}`,
    plot: `Plot ${i + 1}`,
    status: `pending ${i + 1}`
  }));

  try {
    await Jobs.deleteMany({});
    console.log("Deleted old jobs from database.");
    const insertedJobs = await Jobs.insertMany(Jobs);
    console.log(`${insertedJobs.length} jobs seeded!`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  mongoose.connection.close();
}

module.exports = seedJobs;
