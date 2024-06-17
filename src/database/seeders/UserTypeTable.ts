require('dotenv').config()

import UserType from "../models/UserType";

export async function insertUserTypesIfNotExist() {
  const userTypes = [
    { name: "Admin" },
    { name: "Guest" },
    { name: "OTserver Owner" },
    { name: "User" }
  ];
  const table = "User Type";
  try {
    for (const userTypeData of userTypes) {
      const existingUserType = await UserType.findOne({ name: userTypeData.name });
      
      if (!existingUserType) {
        await UserType.create(userTypeData);
        
        console.log(`User type '${ userTypeData.name }' inserted successfully`);
      } else {
        console.log(`User type '${ userTypeData.name }' already exists`);
      }
    }
    return `All ${ userTypes.length } '${ table }' added successfully. `
    
  } catch (error) {
    console.error('Error inserting user types:', error);
    return `There was an error seeding ${ table }.`
  }
}
