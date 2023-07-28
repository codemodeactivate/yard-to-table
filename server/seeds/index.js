const mongoose = require('mongoose');
const seedUsers = require('./userSeeds');
const seedPlots = require('./plotSeeds');

async function seedDatabase() {
  try {
    // Open the connection
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/yard-to-table', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Perform seeding operations
    await seedUsers();
    await seedPlots();

  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
}

seedDatabase();
