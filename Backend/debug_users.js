const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const users = await User.find({});
        console.log('Found users:', users.length);

        users.forEach(u => {
            console.log(`User: ${u.email}`);
            console.log('Problem Statuses:', JSON.stringify(u.problemStatuses, null, 2));
        });

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkUsers();
