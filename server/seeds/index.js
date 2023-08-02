const mongoose = require('mongoose');
const seedUsers = require('./userSeeds');
// const seedPlots = require('./plotSeeds');
const seedJobs = require('./jobSeeds');

// seedUsers();
// seedPlots();
// seedJobs();

async function seedAll() {
  try {
    // Connect to the Mongo DB


    // Run the seed functions sequentially
    await seedUsers();
    console.log("Users seeded!");
    // await seedPlots();
    // console.log("Plots seeded!");
    await seedJobs();
    console.log("Jobs seeded!");
    console.log("All data seeded!");
  } catch (err) {
    console.error(err);
  } finally {
    // Close the connection to the database
    mongoose.connection.close();
  }
}

seedAll();
