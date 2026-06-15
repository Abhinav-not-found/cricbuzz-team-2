const mongoose = require("mongoose");
const env = require("../config/env");
const TeamModel = require("../models/team.model");
const logger = require("../config/logger");

const iccTeams = [
  {
    name: "India",
    shortName: "IND",
    logo: "https://cricketimg.sportico.com/teamlogos/IND.png",
    primaryColor: "#1F76A5",
  },
  {
    name: "Pakistan",
    shortName: "PAK",
    logo: "https://cricketimg.sportico.com/teamlogos/PAK.png",
    primaryColor: "#0A8B3E",
  },
  {
    name: "Australia",
    shortName: "AUS",
    logo: "https://cricketimg.sportico.com/teamlogos/AUS.png",
    primaryColor: "#0D1E5E",
  },
  {
    name: "England",
    shortName: "ENG",
    logo: "https://cricketimg.sportico.com/teamlogos/ENG.png",
    primaryColor: "#003D6B",
  },
  {
    name: "South Africa",
    shortName: "SA",
    logo: "https://cricketimg.sportico.com/teamlogos/SA.png",
    primaryColor: "#1A7F3E",
  },
  {
    name: "West Indies",
    shortName: "WI",
    logo: "https://cricketimg.sportico.com/teamlogos/WI.png",
    primaryColor: "#7B0000",
  },
  {
    name: "Sri Lanka",
    shortName: "SL",
    logo: "https://cricketimg.sportico.com/teamlogos/SL.png",
    primaryColor: "#1B4E8A",
  },
  {
    name: "Bangladesh",
    shortName: "BD",
    logo: "https://cricketimg.sportico.com/teamlogos/BD.png",
    primaryColor: "#0D5E4E",
  },
  {
    name: "New Zealand",
    shortName: "NZ",
    logo: "https://cricketimg.sportico.com/teamlogos/NZ.png",
    primaryColor: "#000000",
  },
  {
    name: "Afghanistan",
    shortName: "AFG",
    logo: "https://cricketimg.sportico.com/teamlogos/AFG.png",
    primaryColor: "#C60C30",
  },
];

const seedTeams = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info("Database connected for seeding");

    // Check existing teams
    const existingCount = await TeamModel.countDocuments();
    if (existingCount > 0) {
      logger.info(`${existingCount} teams already exist. Skipping seed.`);
      process.exit(0);
    }

    // Insert teams
    const result = await TeamModel.insertMany(iccTeams);
    logger.info(`Successfully seeded ${result.length} ICC teams`);

    process.exit(0);
  } catch (error) {
    logger.error("Error seeding teams:", error.message);
    process.exit(1);
  }
};

seedTeams();
