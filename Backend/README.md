# DSA Master Backend

Backend API for DSA Master application with MongoDB integration.

## Prerequisites

1. **MongoDB Compass** (or MongoDB Server)
   - Download from: https://www.mongodb.com/try/download/compass
   - Install and run MongoDB locally

2. **Node.js** (already installed)

## Setup Instructions

### 1. Install MongoDB

If you haven't installed MongoDB Compass:
1. Download from https://www.mongodb.com/try/download/compass
2. Install and launch MongoDB Compass
3. Connect to `mongodb://localhost:27017`
4. The database `dsa-master` will be created automatically

### 2. Install Dependencies

```bash
cd Backend
npm install
```

### 3. Configure Environment

The `.env` file is already created with:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/dsa-master
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

### 4. Seed the Database

Run the seed script to populate problems:

```bash
node seedProblems.js
```

This will:
- Connect to MongoDB
- Clear existing problems
- Insert 10 sample problems with video/notes links

### 5. Start the Server

```bash
npm run dev
# or
npm start
```

Server will run on: http://localhost:5000

## API Endpoints

### Problems

- `GET /api/problems` - Get all problems (with optional filters)
  - Query params: `difficulty`, `topic`, `search`
- `GET /api/problems/:id` - Get single problem
- `GET /api/problems/random/problem` - Get random problem
- `POST /api/problems` - Create problem (admin)
- `PUT /api/problems/:id` - Update problem (admin)
- `DELETE /api/problems/:id` - Delete problem (admin)

### Discussions

- `GET /api/discussions/:problemId` - Get all discussions for a problem
- `POST /api/discussions` - Create new discussion/comment
- `POST /api/discussions/:id/reply` - Add reply to discussion
- `PUT /api/discussions/:id/like` - Like a discussion
- `DELETE /api/discussions/:id` - Delete discussion

## Importing Your Google Sheets Data

To import data from your Google Sheets:

### Method 1: Manual CSV Import

1. Open your Google Sheet
2. File > Download > Comma Separated Values (.csv)
3. Parse the CSV and update `seedProblems.js`
4. Run `node seedProblems.js`

### Method 2: Google Sheets API (Advanced)

1. Set up Google Sheets API credentials
2. Install: `npm install googleapis`
3. Create a script to fetch and import data programmatically

## Database Schema

### Problem
```javascript
{
  title: String,
  difficulty: 'easy' | 'medium' | 'hard',
  topics: [String],
  pattern: String,
  companies: [String],
  leetcodeUrl: String,
  videoUrl: String,
  notesUrl: String,
  points: Number,
  hasDiscussion: Boolean,
  order: Number,
  timestamps: true
}
```

### Discussion
```javascript
{
  problemId: ObjectId,
  userId: ObjectId (optional),
  userName: String,
  userAvatar: String,
  comment: String,
  likes: Number,
  replies: [{
    userName: String,
    comment: String,
    createdAt: Date
  }],
  timestamps: true
}
```

## Testing the API

### Using curl:

```bash
# Get all problems
curl http://localhost:5000/api/problems

# Get problems by difficulty
curl http://localhost:5000/api/problems?difficulty=easy

# Get problems by topic
curl http://localhost:5000/api/problems?topic=arrays

# Search problems
curl http://localhost:5000/api/problems?search=tree
```

### Using MongoDB Compass:

1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Select `dsa-master` database
4. View `problems` and `discussions` collections

## Troubleshooting

### MongoDB Connection Error

If you get connection errors:
1. Make sure MongoDB is running
2. Check MongoDB Compass connection string
3. Verify `.env` MONGO_URI matches your MongoDB connection

### Port Already in Use

If port 5000 is in use:
1. Change PORT in `.env` file
2. Update frontend API calls to use new port

## Next Steps

1. ✅ MongoDB setup complete
2. ✅ API routes created
3. ✅ Seed script ready
4. 🔄 Import your full Google Sheets data
5. 🔄 Connect Frontend to Backend
6. 📝 Add user authentication (optional)
