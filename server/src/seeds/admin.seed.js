const mongoose = require("mongoose");
const env = require("../config/env");
const UserModel = require("../models/user.model");
const logger = require("../config/logger");
const { hashPassword } = require("../shared/utils/bcrypt");

const setupAdminUser = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info("Database connected for admin setup");

    // Check if any ADMIN user exists
    const adminExists = await UserModel.findOne({
      role: "ADMIN",
      isDeleted: false,
    });

    if (adminExists) {
      logger.info(`Admin user already exists: ${adminExists.email}`);
      process.exit(0);
    }

    // Check if any user exists
    const firstUser = await UserModel.findOne({ isDeleted: false }).sort({
      createdAt: 1,
    });

    if (firstUser) {
      // Promote first user to ADMIN
      firstUser.role = "ADMIN";
      await firstUser.save();
      logger.info(`✓ Promoted existing user to ADMIN: ${firstUser.email}`);
    } else {
      // Create a new ADMIN user
      const adminUser = await UserModel.create({
        name: "Admin User",
        email: "admin@cricbuzz.com",
        password: await hashPassword("admin@123"),
        role: "ADMIN",
      });
      logger.info(`✓ Created new ADMIN user: ${adminUser.email}`);
      logger.info(`  Email: admin@cricbuzz.com`);
      logger.info(`  Password: admin@123`);
    }

    process.exit(0);
  } catch (error) {
    logger.error("Error setting up admin user:", error.message);
    process.exit(1);
  }
};

setupAdminUser();
