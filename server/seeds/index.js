const mongoose = require('mongoose');
const seedUsers = require('./userSeeds');
const seedPlots = require('./plotSeeds');
const seedJobs = require('./jobSeeds');

seedUsers();
seedPlots();
seedJobs();
