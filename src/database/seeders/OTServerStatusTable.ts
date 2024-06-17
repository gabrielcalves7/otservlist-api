import OTServerStatus from "../models/OTServerStatus";

require('dotenv').config();

import User from "../models/User";
import database from '../../database/index';

export async function seedOTServerStatus() {
  const oTServersStatus = [
    {
      name: "Online",
    },
    {
      name: "Launching Soon",
    },
    {
      name: "Maintenance",
    },
    {
      name: "Offline",
    },
  ];
  
  const table = "OTServerStatus";
  
  await database.connect();
  try {
    for (const oTServerStatus of oTServersStatus) {
      
      const newOTServerStatus = new OTServerStatus({
        name: oTServerStatus.name,
      });
      
      await newOTServerStatus.save();
      console.log(`OTServer Status '${ oTServerStatus.name }' created successfully.`);
    }
    await database.disconnect();
    return `All ${ oTServersStatus.length } '${ table }' added successfully.`;
  } catch (error) {
    console.error('Error seeding oTServersStatus:', error);
    await database.disconnect();
    return `There was an error seeding ${ table }.`;
  }
}
