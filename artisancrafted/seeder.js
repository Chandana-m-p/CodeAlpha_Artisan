const { initializeDatabase } = require('./database');
const Product = require('./models/Product');

const products = [
  {
    title: 'Ethereal Mist Pendant',
    description: 'A hand-finished pendant in sterling silver with a veiled amethyst stone, designed to catch every ambient light spill.',
    price: 1280,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1514894787828-0a2a839c1d1a?auto=format&fit=crop&w=800&q=80',
    stock: 5,
    variants: [
      { name: 'Metal', value: 'Sterling Silver' },
      { name: 'Length', value: '18 inch' }
    ]
  },
  {
    title: 'Silver Wave Ring',
    description: 'A sculptural ring with an undulating profile, hand-polished to a satin finish and accented with a midnight pearl.',
    price: 340,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80',
    stock: 8,
    variants: [
      { name: 'Size', value: '6' },
      { name: 'Finish', value: 'Satin' }
    ]
  },
  {
    title: 'Velvet Glen Candle Holder',
    description: 'A limited-edition hand-thrown ceramic holder with an enamel glaze inspired by twilight velvet.',
    price: 92,
    category: 'Ceramics',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    stock: 12,
    variants: [
      { name: 'Color', value: 'Midnight Teal' }
    ]
  },
  {
    title: 'Luna Leather Travel Wallet',
    description: 'A compact artisan wallet in tonal leather, finished with raw-edge details and a soft embossed logo.',
    price: 168,
    category: 'Leather Goods',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    stock: 10,
    variants: [
      { name: 'Color', value: 'Royal Violet' }
    ]
  },
  {
    title: 'Moonlit Lace Bracelet',
    description: 'A delicately braided bracelet with moonstone beads and a hand-carved clasp, designed for refined eveningwear.',
    price: 210,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    stock: 7,
    variants: [
      { name: 'Length', value: '7.5 inch' }
    ]
  },
  {
    title: 'Opaline Keepsake Box',
    description: 'A polished heirloom box crafted from pearlescent ceramic and lined with velvet, ideal for cherished keepsakes.',
    price: 145,
    category: 'Ceramics',
    image: 'https://images.unsplash.com/photo-1520975911875-15a9a5c6ef2f?auto=format&fit=crop&w=800&q=80',
    stock: 9,
    variants: [
      { name: 'Finish', value: 'Pearl' }
    ]
  }
];

function seed() {
  try {
    initializeDatabase();

    Product.deleteMany();
    Product.insertMany(products);

    console.log('Seeded products successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
