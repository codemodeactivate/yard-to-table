const TempUserData = require("../models/TempUserData");

async function clearTemporaryData(userId) {
    try {
      // Find and remove the temporary data for the given user
      await TempUserData.findOneAndRemove({ user: userId });
      console.log("Temporary data cleared for user:", userId);
    } catch (error) {
      console.error("Error clearing temporary data:", error);
      throw new Error("Failed to clear temporary data. Please try again.");
    }
  }

  module.exports = {
    clearTemporaryData,
  };
