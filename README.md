# DSA Master

A comprehensive platform to master Data Structures and Algorithms with curated resources and expert guidance.

## 🚀 Features

- **Interactive Homepage** with hero section and CTAs
- **Auto-scrolling Learners Carousel** showcasing successful students
- **FAQ Section** with expandable accordion
- **Global Community Stats** with social media presence
- **Sticky Navigation** for easy access
- **Responsive Design** for all devices

## 📁 Project Structure

```
DSA Master/
├── Frontend/          # React application
│   ├── public/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── App.js       # Main app component
│   └── package.json
│
├── Backend/           # Express.js server
│   ├── config/        # Configuration files
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes (to be added)
│   ├── server.js      # Entry point
│   └── package.json
│
└── Database/          # Database documentation
    └── README.md      # Setup instructions
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas account)
- npm or yarn

### Frontend Setup

1. Navigate to Frontend folder:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

### Backend Setup

1. Navigate to Backend folder:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/dsa-master
JWT_SECRET=your_secret_key_here
```

5. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run at `http://localhost:5000`

### Database Setup

See `Database/README.md` for detailed MongoDB setup instructions.

## 🎨 Tech Stack

### Frontend
- React 18
- React Router DOM
- React Icons
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## 📝 Available Scripts

### Frontend
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

### Backend
- `npm start` - Start server
- `npm run dev` - Start with nodemon (auto-reload)

## 🌟 Key Components

### Homepage Sections:
1. **Hero Section** - Main call-to-action
2. **Learners Carousel** - Auto-scrolling testimonials
3. **FAQ Section** - Expandable questions and answers
4. **Community Section** - Social media statistics
5. **Footer** - Links and copyright

### Features:
- ✅ Sticky navigation bar
- ✅ Smooth scrolling animations
- ✅ Responsive design
- ✅ Interactive FAQ accordion
- ✅ Auto-rotating carousel
- ✅ Hover effects on cards

## 🔮 Future Enhancements
- User authentication
- Problem listing page
- Code editor integration
- Progress tracking
- Discussion forums
- Admin dashboard

## 📄 License
© 2025 DSA Master. All Rights Reserved.

## 👨‍💻 Author
Parthipan

---