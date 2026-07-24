const bcrypt = require('bcryptjs');
const { initializeDatabase } = require('./database');
const Product = require('./models/Product');
const User = require('./models/User');

const products = [
  {
    title: 'Ethereal Mist Amethyst Pendant',
    description: 'A hand-finished pendant in 925 sterling silver set with a genuine 4.2-carat veiled amethyst gemstone, designed to capture subtle ambient reflections.',
    price: 95000,
    category: 'Fine Jewelry',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
    stock: 5,
    rating: 4.9,
    variants: [
      { name: 'Material', value: '925 Sterling Silver' },
      { name: 'Chain Length', value: '18 inches' }
    ]
  },
  {
    title: 'Royal Solitaire Diamond Ring',
    description: 'A handcrafted 18K white gold ring featuring a brilliance-cut 1.5-carat solitaire diamond with an undulating satin-finish band.',
    price: 145000,
    category: 'Fine Jewelry',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
    stock: 3,
    rating: 5.0,
    variants: [
      { name: 'Ring Size', value: 'US 6' },
      { name: 'Metal Purity', value: '18K White Gold' }
    ]
  },
  {
    title: 'Sapphire Wave Ring',
    description: 'A sculptural 14K gold ring with an undulating wave profile, hand-polished and centered with a deep midnight blue sapphire.',
    price: 48000,
    category: 'Fine Jewelry',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
    stock: 8,
    rating: 4.8,
    variants: [
      { name: 'Ring Size', value: 'US 7' },
      { name: 'Gemstone', value: 'Natural Blue Sapphire' }
    ]
  },
  {
    title: 'Moonlit Pearl & Diamond Bracelet',
    description: 'A delicate bracelet crafted with lustrous 8mm natural freshwater pearls, moonstone accents, and an engraved 18K gold clasp.',
    price: 35000,
    category: 'Fine Jewelry',
    image: 'https://images.unsplash.com/photo-1611591475168-ff2f1f50f4a8?auto=format&fit=crop&w=1000&q=80',
    stock: 7,
    rating: 4.9,
    variants: [
      { name: 'Length', value: '7.5 inches' },
      { name: 'Clasp Type', value: '18K Gold Lobster' }
    ]
  },
  {
    title: 'Celestial Emerald Drop Earrings',
    description: 'Exquisite drop earrings featuring hand-cut emerald crystal stones suspended from 18K solid yellow gold studs.',
    price: 72000,
    category: 'Fine Jewelry',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
    stock: 4,
    rating: 4.9,
    variants: [
      { name: 'Stone Weight', value: '2.8 Carats Pair' },
      { name: 'Metal', value: '18K Solid Gold' }
    ]
  },
  {
    title: 'Velvet Glen Ceramic Jewelry Vessel',
    description: 'A limited-edition hand-thrown ceramic vessel finished with an enamel glaze, designed for storing fine jewelry and heirloom artifacts.',
    price: 12500,
    category: 'Ceramics',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=80',
    stock: 12,
    rating: 4.7,
    variants: [
      { name: 'Glaze', value: 'Twilight Enamel' },
      { name: 'Dimensions', value: '4 x 4 x 3.5 in' }
    ]
  },
  {
    title: 'Luna Italian Leather Travel Wallet',
    description: 'A hand-stitched artisan travel pouch crafted from full-grain Italian calfskin, designed to hold watches and fine jewelry securely.',
    price: 18500,
    category: 'Leather Goods',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
    stock: 10,
    rating: 4.8,
    variants: [
      { name: 'Color', value: 'Royal Violet' },
      { name: 'Material', value: 'Full-Grain Calfskin' }
    ]
  },
  {
    title: 'Opaline Heirloom Keepsake Box',
    description: 'A polished heirloom box carved from pearlescent ceramic and lined with soft midnight velvet to preserve precious gems.',
    price: 14500,
    category: 'Ceramics',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    stock: 9,
    rating: 4.9,
    variants: [
      { name: 'Interior', value: 'Midnight Blue Velvet' },
      { name: 'Finish', value: 'Pearlescent' }
    ]
  }
];

async function seed() {
  try {
    initializeDatabase();

    Product.deleteMany();
    Product.insertMany(products);
    console.log('Seeded high-definition realistic jewelry product catalog in INR successfully');

    // Seed default user for Chandana M P if not existing
    const defaultEmail = 'chandana@artisancrafted.com';
    let defaultUser = User.findOne({ email: defaultEmail });
    if (!defaultUser) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      defaultUser = User.create({
        name: 'Chandana M P',
        email: defaultEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Seeded default admin user: Chandana M P (chandana@artisancrafted.com)');
    }

    const customerEmail = 'customer@artisancrafted.com';
    let customerUser = User.findOne({ email: customerEmail });
    if (!customerUser) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      User.create({
        name: 'Chandana M P',
        email: customerEmail,
        password: hashedPassword,
        role: 'customer'
      });
      console.log('Seeded default customer user: Chandana M P (customer@artisancrafted.com)');
    }

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
