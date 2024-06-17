import { faker } from "@faker-js/faker";
import database from '../../database/index';
import OTServer from "../models/OTServer";
import OTServerStatus from "../models/OTServerStatus";
import User from "../models/User";


require('dotenv').config();

export async function seedOTServer() {
  
  const oTServers = [
    {
      name: faker.internet.userName(),
      url: faker.internet.url(),
      active: faker.datatype.boolean(0.5),
      email: faker.internet.userName(),
      status: '',
      ownerName: 'admin',
      launchDate: faker.date.anytime(),
      location: faker.location.country(),
    }
  ];
  
  const table = "OTServer";
  
  await database.connect();
  try {
    const existingStatuses = await OTServerStatus.find();
    
    for (let i = 0; i < 10; i++) {
      const randomStatusIndex = Math.floor(Math.random() * existingStatuses.length);
      const randomStatus = existingStatuses[randomStatusIndex];
      
      const ownerName = 'admin';
      const name = faker.internet.userName();
      
      const user = await User.findOne({ name: ownerName });
      if (!user) {
        console.error(`User '${ ownerName }' not found.`);
        continue;
      }
      
      const newOTServer = new OTServer({
        name,
        url: faker.internet.url(),
        active: faker.datatype.boolean(0.5),
        email: faker.internet.userName(),
        status: randomStatus,
        ownerId: user._id,
        launchDate: faker.date.anytime(),
        location: faker.location.country(),
      });
      
      
      await newOTServer.save();
      console.log(`OTServer '${ name }' created successfully.`);
    }
    await database.disconnect();
    return `All ${ oTServers.length } '${ table }' added successfully.`;
  } catch (error) {
    console.error('Error seeding OTServers:', error);
    await database.disconnect();
    return `There was an error seeding ${ table }.`;
  }
}
