import { db } from './configs/index.js';   // ✅ Adjust path if needed
import { cropCategories } from './configs/schema.js';   // ✅ Adjust path if needed

async function seedCategories() {
  try {
    await db.insert(cropCategories).values([
      { categoryName: 'Wheat', defaultPrice: '1000' },
      { categoryName: 'Corn', defaultPrice: '800' },
      { categoryName: 'Potato', defaultPrice: '600' },
      { categoryName: 'Onion', defaultPrice: '500' },
      { categoryName: 'Tomato', defaultPrice: '400' },
      { categoryName: 'Peanuts', defaultPrice: '700' },
    ]);

    console.log('✅ Categories seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding categories:', err);
    process.exit(1);
  }
}

seedCategories();
