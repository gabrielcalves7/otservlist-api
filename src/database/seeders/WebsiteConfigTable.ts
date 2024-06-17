import WebsiteConfig from '../models/WebsiteConfig';

// Function to seed the initial data for the website_config table
export async function seedWebsiteConfig() {
  const table = "Website Config";
  
  try {
    // Check if website config exists
    const existingConfig = await WebsiteConfig.findOne();
    
    // If website config exists, do not seed again
    if (existingConfig) {
      console.log('Website config already exists');
      return;
    }
    
    await WebsiteConfig.create({
      whatsapp: 'https://wa.me/1234567890',
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
      phoneNumber: '123-456-7890',
      email: 'example@example.com'
    });
    console.log('Website config seeded successfully');
    
    return `All data added to ${table}.`
    
  } catch (error) {
    console.error('Error seeding website config:', error);
    return `There was an error seeding ${ table }.`
  }
}
