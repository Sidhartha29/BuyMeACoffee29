import mongoose from 'mongoose';
import { Profile, Image, Transaction, DownloadToken } from './models.js';
import connectDB from './connection.js';

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Profile.deleteMany({});
    await Image.deleteMany({});
    await Transaction.deleteMany({});
    await DownloadToken.deleteMany({});

    console.log('Existing data cleared');

    // Seed profiles
    const profiles = [
      {
        id: 'user-1',
        name: 'Alice Johnson',
        bio: 'Nature photographer capturing the beauty of the world',
        profile_pic: 'https://example.com/alice.jpg',
        wallet_balance: 150.00,
        created_at: new Date('2024-01-15'),
        updated_at: new Date('2024-10-01')
      },
      {
        id: 'user-2',
        name: 'Bob Smith',
        bio: 'Street photographer and urban explorer',
        profile_pic: 'https://example.com/bob.jpg',
        wallet_balance: 75.50,
        created_at: new Date('2024-02-20'),
        updated_at: new Date('2024-09-15')
      },
      {
        id: 'user-3',
        name: 'Carol Davis',
        bio: 'Portrait photographer specializing in artistic shots',
        profile_pic: 'https://example.com/carol.jpg',
        wallet_balance: 200.00,
        created_at: new Date('2024-03-10'),
        updated_at: new Date('2024-10-05')
      }
    ];

    await Profile.insertMany(profiles);
    console.log('Profiles seeded');

    // Seed images
    const images = [
      {
        id: 'img-1',
        creator_id: 'user-1',
        title: 'Sunset Over Mountains',
        description: 'A breathtaking sunset view from the Rocky Mountains',
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
        thumbnail_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        price: 15.99,
        downloads: 23,
        category: 'Nature',
        created_at: new Date('2024-01-20'),
        updated_at: new Date('2024-01-20')
      },
      {
        id: 'img-2',
        creator_id: 'user-2',
        title: 'Urban Street Scene',
        description: 'Vibrant city life captured in downtown',
        image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
        thumbnail_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
        price: 12.50,
        downloads: 18,
        category: 'Street',
        created_at: new Date('2024-02-25'),
        updated_at: new Date('2024-02-25')
      },
      {
        id: 'img-3',
        creator_id: 'user-3',
        title: 'Portrait Study',
        description: 'Artistic portrait with dramatic lighting',
        image_url: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1200&h=800&fit=crop',
        thumbnail_url: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=400&h=300&fit=crop',
        price: 25.00,
        downloads: 7,
        category: 'Portrait',
        created_at: new Date('2024-03-15'),
        updated_at: new Date('2024-03-15')
      },
      {
        id: 'img-4',
        creator_id: 'user-1',
        title: 'Forest Path',
        description: 'A serene path through an ancient forest',
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
        thumbnail_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        price: 18.75,
        downloads: 31,
        category: 'Nature',
        created_at: new Date('2024-04-10'),
        updated_at: new Date('2024-04-10')
      }
    ];

    await Image.insertMany(images);
    console.log('Images seeded');

    // Seed transactions
    const transactions = [
      {
        id: 'txn-1',
        buyer_id: 'user-2',
        creator_id: 'user-1',
        image_id: 'img-1',
        amount: 15.99,
        status: 'completed',
        stripe_payment_id: 'pi_test_123456789',
        created_at: new Date('2024-05-01')
      },
      {
        id: 'txn-2',
        buyer_id: 'user-3',
        creator_id: 'user-2',
        image_id: 'img-2',
        amount: 12.50,
        status: 'completed',
        stripe_payment_id: 'pi_test_987654321',
        created_at: new Date('2024-05-15')
      }
    ];

    await Transaction.insertMany(transactions);
    console.log('Transactions seeded');

    // Seed download tokens
    const downloadTokens = [
      {
        id: 'token-1',
        transaction_id: 'txn-1',
        buyer_id: 'user-2',
        image_id: 'img-1',
        token: 'download_token_abc123',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        used: false,
        created_at: new Date('2024-05-01')
      },
      {
        id: 'token-2',
        transaction_id: 'txn-2',
        buyer_id: 'user-3',
        image_id: 'img-2',
        token: 'download_token_def456',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        used: false,
        created_at: new Date('2024-05-15')
      }
    ];

    await DownloadToken.insertMany(downloadTokens);
    console.log('Download tokens seeded');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
