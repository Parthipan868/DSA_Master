const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const testConnection = async () => {
    console.log('🔍 Testing MongoDB Connection...\n');
    console.log('📍 MongoDB URI:', process.env.MONGO_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@') || 'NOT SET');
    console.log('');

    try {
        console.log('⏳ Connecting to MongoDB...');

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log('✅ MongoDB Connected Successfully!');
        console.log(`📦 Host: ${conn.connection.host}`);
        console.log(`🗄️  Database: ${conn.connection.name}`);
        console.log(`🔌 Port: ${conn.connection.port}`);
        console.log('');

        // List all collections
        const collections = await conn.connection.db.listCollections().toArray();
        console.log(`📚 Collections in database (${collections.length}):`);
        if (collections.length === 0) {
            console.log('   (No collections yet - database is empty)');
        } else {
            collections.forEach(col => {
                console.log(`   - ${col.name}`);
            });
        }
        console.log('');

        // Close connection
        await mongoose.connection.close();
        console.log('✅ Connection test completed successfully!');
        console.log('');
        console.log('🎉 Your MongoDB is ready to use!');
        process.exit(0);

    } catch (error) {
        console.error('❌ MongoDB Connection Failed!');
        console.error('');
        console.error('Error Details:');
        console.error(error.message);
        console.error('');
        console.error('💡 Troubleshooting Tips:');
        console.error('1. Check if MONGO_URI is set in Backend/.env file');
        console.error('2. Verify MongoDB service is running (for local MongoDB)');
        console.error('3. Check network access settings (for MongoDB Atlas)');
        console.error('4. Verify username and password are correct');
        console.error('5. Ensure IP address is whitelisted (for MongoDB Atlas)');
        console.error('');
        console.error('📖 See MONGODB_SETUP.md for detailed setup instructions');
        process.exit(1);
    }
};

testConnection();
