# Database Setup for DSA Master

## MongoDB Installation

### Option 1: Local MongoDB Installation

1. **Download MongoDB Community Server** from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

2. **Install MongoDB** following the installation wizard

3. **Start MongoDB Service**:
   - Windows: MongoDB should start automatically as a service
   - Or run manually: `mongod --dbpath="path/to/data/directory"`

4. **Verify Installation**:
   ```bash
   mongosh
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `.env` file in Backend folder with your connection string

## Database Schema

### Collections:

1. **users** - Store user information
   - name, email, password, avatar, problemsSolved, createdAt

2. **problems** - Store DSA problems
   - title, description, difficulty, category, tags, companies, examples, constraints, solution, createdAt

3. **submissions** - Store user problem submissions (to be implemented)
   - userId, problemId, code, language, status, submittedAt

## Connection String Format

Local: `mongodb://localhost:27017/dsa-master`
Atlas: `mongodb+srv://<username>:<password>@cluster.mongodb.net/dsa-master`

## Initial Setup

After connecting to MongoDB, the database will be created automatically when you first insert data.

You can seed initial data by running seed scripts (to be created in Backend/seeds/).
