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

  async function mapCostToTier(cost) {
    const numericCost = Number(cost);
    console.log(`Mapping cost: ${cost} (numeric: ${numericCost})`);
    if (cost >= 10 && cost <= 30) return 'TIER1';
    if (cost >=31 && cost <= 60) return 'TIER2';
    if (cost >=61 && cost <= 100) return 'TIER3';
    if (cost >=101) return 'TIER4';
    throw new Error('Invalid cost');
  }

  module.exports = {
    clearTemporaryData,
    mapCostToTier,
  };
