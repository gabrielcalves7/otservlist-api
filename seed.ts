import { insertUserTypesIfNotExist }  from "./src/database/seeders/UserTypeTable";
import { seedUsers } from "./src/database/seeders/UserTable";
import { seedWebsiteConfig } from "./src/database/seeders/WebsiteConfigTable";
import database from './src/database/index';
import { seedOTServerStatus } from "./src/database/seeders/OTServerStatusTable";
import { seedOTServer } from "./src/database/seeders/OTServerTable";


async function seed(){
  await database.connect();
  console.log(await insertUserTypesIfNotExist());
  console.log(await seedWebsiteConfig());
  console.log(await seedUsers());
  console.log(await seedOTServerStatus());
  console.log(await seedOTServer());
  await database.disconnect();
  
  
}

seed();