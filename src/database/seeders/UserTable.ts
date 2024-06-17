// userSeeder.ts

require('dotenv').config();

import bcrypt from 'bcrypt'; // If you're using bcrypt for password hashing
import User from "../models/User"; // Import the User model
import UserType from "../models/UserType"; // Import the UserType model
import database from '../../database/index';

export async function seedUsers() {
  const users = [
    {
      name: "admin",
      userName: "admin",
      email: "admin@devgabrielalves.com",
      password: "testing",
      userType: "Admin" // User type name
    },
    {
      name: "gabriel",
      userName: "gabrieladmin",
      email: "gabrielcalves97@gmail.com",
      password: "testing",
      userType: "Admin" // User type name
    },
    {
      name: "client",
      userName: "guest",
      email: "guest@devgabrielalves.com",
      password: "testing",
      userType: "Guest" // User type name
    }
  ];
  
  const table = "Users";
  
  await database.connect();
  try {
    for (const userData of users) {
      // Find the corresponding user type
      const userType = await UserType.findOne({ name: userData.userType });
      if (!userType) {
        console.error(`User type '${userData.userType}' not found.`);
        continue;
      }
      
      // Hash the password (if needed)
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create user instance
      const newUser = new User({
        name: userData.name,
        userName: userData.userName,
        email: userData.email,
        password: hashedPassword, // Use hashed password
        active: true, // Assume all users are active
        userTypeId: userType._id // Assign userType ObjectId
      });
      
      // Save user to database
      await newUser.save();
      console.log(`User '${userData.name}' created successfully.`);
    }
    await database.disconnect();
    return `All ${users.length} '${table}' added successfully.`;
  } catch (error) {
    console.error('Error seeding users:', error);
    await database.disconnect();
    return `There was an error seeding ${table}.`;
  }
}
