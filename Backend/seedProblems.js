const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Problem = require('./models/Problem');

// Load environment variables
dotenv.config();

// Sample problems data based on Google Sheets structure
// You'll need to export your Google Sheet as CSV and parse it, or manually create this array
const problemsData = [
  {
    title: 'Two Sum',
    difficulty: 'easy',
    topics: ['arrays', 'hash table'],
    pattern: 'Arrays',
    companies: ['Amazon', 'Google', 'Microsoft'],
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    videoUrl: 'https://www.youtube.com/watch?v=KLlXCFG5TnA',
    notesUrl: 'https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array/',
    points: 15,
    hasDiscussion: true,
    order: 1
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'easy',
    topics: ['arrays', 'dynamic programming'],
    pattern: 'Arrays',
    companies: ['Amazon', 'Google', 'Microsoft'],
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    videoUrl: 'https://www.youtube.com/watch?v=eMSfBgbiEjk',
    notesUrl: 'https://takeuforward.org/data-structure/stock-buy-and-sell/',
    points: 15,
    hasDiscussion: true,
    order: 2
  },
  {
    title: 'Contains Duplicate',
    difficulty: 'easy',
    topics: ['arrays', 'hash table'],
    pattern: 'Arrays',
    companies: ['Facebook', 'Amazon', 'Bloomberg'],
    leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/',
    videoUrl: 'https://www.youtube.com/watch?v=3OamzN90kPg',
    notesUrl: 'https://www.geeksforgeeks.org/check-if-array-contains-duplicate-elements/',
    points: 10,
    hasDiscussion: true,
    order: 3
  },
  {
    title: 'Valid Parentheses',
    difficulty: 'easy',
    topics: ['stacks queues', 'string'],
    pattern: 'Stack',
    companies: ['Facebook', 'Amazon', 'Bloomberg'],
    leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/',
    videoUrl: 'https://www.youtube.com/watch?v=wkDfsKijrZ8',
    notesUrl: 'https://takeuforward.org/data-structure/check-for-balanced-parentheses/',
    points: 10,
    hasDiscussion: true,
    order: 4
  },
  {
    title: 'Reverse Linked List',
    difficulty: 'easy',
    topics: ['linked lists'],
    pattern: 'Linked List',
    companies: ['Amazon', 'Microsoft', 'Apple'],
    leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    videoUrl: 'https://www.youtube.com/watch?v=iRtLEoL-r-g',
    notesUrl: 'https://takeuforward.org/data-structure/reverse-a-linked-list/',
    points: 15,
    hasDiscussion: true,
    order: 5
  },
  {
    title: 'Merge Intervals',
    difficulty: 'medium',
    topics: ['arrays', 'sorting'],
    pattern: 'Arrays',
    companies: ['Facebook', 'Google', 'Bloomberg'],
    leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/',
    videoUrl: 'https://www.youtube.com/watch?v=2JzRBPFYbKE',
    notesUrl: 'https://takeuforward.org/data-structure/merge-overlapping-sub-intervals/',
    points: 25,
    hasDiscussion: true,
    order: 6
  },
  {
    title: 'Group Anagrams',
    difficulty: 'medium',
    topics: ['strings', 'hash table'],
    pattern: 'Strings',
    companies: ['Amazon', 'Uber'],
    leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',
    videoUrl: 'https://www.youtube.com/watch?v=vzdNOK2oB2E',
    notesUrl: 'https://www.geeksforgeeks.org/given-a-sequence-of-words-print-all-anagrams-together/',
    points: 20,
    hasDiscussion: true,
    order: 7
  },
  {
    title: 'Course Schedule',
    difficulty: 'medium',
    topics: ['graphs', 'topological sort'],
    pattern: 'Graphs',
    companies: ['Amazon', 'Airbnb'],
    leetcodeUrl: 'https://leetcode.com/problems/course-schedule/',
    videoUrl: 'https://www.youtube.com/watch?v=WAOfKpxYHR8',
    notesUrl: 'https://takeuforward.org/data-structure/course-schedule-i-and-ii-pre-requisite-tasks-topological-sort/',
    points: 30,
    hasDiscussion: false,
    order: 8
  },
  {
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'easy',
    topics: ['trees', 'dfs'],
    pattern: 'Trees',
    companies: ['Microsoft', 'Apple'],
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
    videoUrl: 'https://www.youtube.com/watch?v=lxTGsVXjwvM',
    notesUrl: 'https://takeuforward.org/data-structure/inorder-traversal-of-binary-tree/',
    points: 20,
    hasDiscussion: true,
    order: 9
  },
  {
    title: 'Number of Islands',
    difficulty: 'medium',
    topics: ['graphs', 'dfs', 'bfs'],
    pattern: 'Graphs',
    companies: ['Amazon', 'Facebook', 'Google'],
    leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
    videoUrl: 'https://www.youtube.com/watch?v=muncqlKJrH0',
    notesUrl: 'https://takeuforward.org/data-structure/number-of-islands/',
    points: 25,
    hasDiscussion: true,
    order: 10
  }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');

    // Clear existing problems
    await Problem.deleteMany({});
    console.log('Cleared existing problems');

    // Insert new problems
    await Problem.insertMany(problemsData);
    console.log(`${problemsData.length} problems inserted successfully!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
