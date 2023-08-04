const mongoose = require('mongoose');
const db = require('../config/connection');
const Plot = require('../models/Plot');

async function seedPlots() {
  // Connect to the Mongo DB
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yard-to-table', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const plots = Array.from({ length: 10 }, (_, i) => ({
    address: `123 Test St ${i + 1}`,
    name: `Test Plot ${i + 1}`,
    sqft: `400${i + 1}`,
    category: i % 2 === 0 ? 'Vegetable' : 'Pollinator',
    image: `/../../client/public/assets/photos/front-yard-1.jpeg`
  }));

  try {
    await Plot.deleteMany({});
    const insertedPlots = await Plot.insertMany(plots);
    console.log(`${insertedPlots.length} plots seeded!`);
    return insertedPlots; // Return the inserted plots
  } catch (err) {
    console.error(err);
    process.exit(1);
  }


}

module.exports = seedPlots;
