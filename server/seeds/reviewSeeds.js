const mongoose = require('mongoose');
const db = require('../config/connection');
const Plot = require('../models/Plot');

async function seedPlots() {
  // Connect to the Mongo DB
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yard-to-table', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  const plots = Array.from({ length: 10 }, (_, i) => ({
    number: `123 Test St ${i + 1}`,
    user: `testSeedID${i + 1}`,
  }));

  try {
    await Plot.deleteMany({});
    const insertedPlots = await Plot.insertMany(plots);
    console.log(`${insertedPlots.length} plots seeded!`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  mongoose.connection.close();
}

module.exports = seedPlots;
