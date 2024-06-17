import { insertUserTypesIfNotExist }  from "./src/database/seeders/UserTypeTable";
import { seedUsers } from "./src/database/seeders/UserTable";
import { seedWebsiteConfig } from "./src/database/seeders/WebsiteConfigTable";
import database from './src/database/index';


async function seed(){
  await database.connect();
  console.log(await insertUserTypesIfNotExist());
  console.log(await seedWebsiteConfig());
  console.log(await seedUsers());
  await database.disconnect();
  
  
}

seed();