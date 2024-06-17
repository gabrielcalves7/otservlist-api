require('dotenv').config()


async function migrateFresh() {
  const mongoose = require('mongoose');
  const uri: string = process.env.NEXT_PUBLIC_MONGODB_URI as string;
  
  try {
    // Connect to your MongoDB database
    await mongoose.connect(uri);
    
    // Get a list of all collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    // Drop all collections
    for (let collection of collections) {
      await mongoose.connection.db.collection(collection.name).drop();
      console.log(`Dropped collection: ${collection.name}`);
    }
    
    console.log('DB Refreshed successfully.');
  } catch (error) {
    console.error('Error migrating fresh:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

// Call the migrateFresh function to perform fresh migration
migrateFresh();
