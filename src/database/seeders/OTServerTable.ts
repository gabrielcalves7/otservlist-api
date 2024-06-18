import { faker } from "@faker-js/faker";
import database from '../../database/index';
import OTServer from "../models/OTServer";
import OTServerStatus from "../models/OTServerStatus";
import User from "../models/User";


require('dotenv').config();

export async function seedOTServer() {
  const table = "OTServer";
  await database.connect();
  try {
    const existingStatuses = await OTServerStatus.find();
    var OTServersCount = 500;
    for (let i = 0; i < OTServersCount; i++) {
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
        location: faker.location.countryCode('alpha-2'),
        initialRate: faker.number.int({ min: 10, max: 100 })
      });
      
      
      await newOTServer.save();
      console.log(`OTServer '${ name }' created successfully.`);
    }
    await database.disconnect();
    return `All ${OTServersCount} inserted into '${ table }' successfully.`;
  } catch (error) {
    console.error('Error seeding OTServers:', error);
    await database.disconnect();
    return `There was an error seeding ${ table }.`;
  }
}
