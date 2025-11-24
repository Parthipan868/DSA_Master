import React, { useState } from 'react';
import { FaSearch, FaRandom, FaFire, FaPaperPlane, FaStar, FaChevronDown, FaExternalLinkAlt, FaVideo, FaBook, FaComment } from 'react-icons/fa';
import './Problems.css';

// Sample data - will be replaced with actual data from the Google Sheet
export const problems = [
    {
      id: 1,
      title: 'Merge Intervals',
      difficulty: 'medium',
      topics: ['arrays'],
      companies: ['Facebook', 'Google', 'Bloomberg'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      notesUrl: 'https://www.geeksforgeeks.org/merge-overlapping-intervals/',
      hasDiscussion: true
    },
    {
      id: 2,
      title: 'Two Sum',
      difficulty: 'easy',
      topics: ['arrays'],
      companies: ['Apple', 'PayPal', 'Samsung'],
      status: 'Unsolved',
      points: 15,
      leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      notesUrl: 'https://www.geeksforgeeks.org/two-sum/',
      hasDiscussion: true
    },
    {
      id: 3,
      title: 'Valid Parentheses',
      difficulty: 'easy',
      topics: ['stacks queues'],
      companies: ['Facebook', 'Amazon', 'Bloomberg'],
      status: 'Unsolved',
      points: 10,
      leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/',
      videoUrl: 'https://www.youtube.com/watch?v=example3',
      notesUrl: 'https://www.geeksforgeeks.org/valid-parentheses/',
      hasDiscussion: true
    },
    {
      id: 4,
      title: 'Reverse Linked List',
      difficulty: 'easy',
      topics: ['linked lists'],
      companies: ['Yelp', 'Yandex', 'Alibaba'],
      status: 'Unsolved',
      points: 15,
      leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
      videoUrl: 'https://www.youtube.com/watch?v=example4',
      notesUrl: 'https://www.geeksforgeeks.org/reverse-linked-list/',
      hasDiscussion: true
    },
    {
      id: 5,
      title: 'Group Anagrams',
      difficulty: 'medium',
      topics: ['strings'],
      companies: ['Amazon', 'Uber'],
      status: 'Unsolved',
      points: 20,
      leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',
      videoUrl: 'https://www.youtube.com/watch?v=example5',
      notesUrl: 'https://www.geeksforgeeks.org/group-anagrams/',
      hasDiscussion: true
    },
    {
      id: 6,
      title: 'Course Schedule',
      difficulty: 'medium',
      topics: ['graphs'],
      companies: ['Amazon', 'Airbnb'],
      status: 'Unsolved',
      points: 30,
      leetcodeUrl: 'https://leetcode.com/problems/course-schedule/',
      videoUrl: 'https://www.youtube.com/watch?v=example6',
      notesUrl: 'https://www.geeksforgeeks.org/course-schedule/',
      hasDiscussion: false
    },
    {
      id: 7,
      title: 'Binary Tree Inorder Traversal',
      difficulty: 'easy',
      topics: ['trees'],
      companies: ['Microsoft', 'Apple'],
      status: 'Unsolved',
      points: 20,
      leetcodeUrl: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
      videoUrl: 'https://www.youtube.com/watch?v=example7',
      notesUrl: 'https://www.geeksforgeeks.org/inorder-traversal/',
      hasDiscussion: true
    },
    {
      id: 8,
      title: 'Number of Islands',
      difficulty: 'medium',
      topics: ['graphs'],
      companies: ['Salesforce', 'VMware', 'Cisco'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
      videoUrl: 'https://www.youtube.com/watch?v=example8',
      notesUrl: 'https://www.geeksforgeeks.org/number-of-islands/',
      hasDiscussion: true
    },
    {
      id: 9,
      title: 'Maximum Subarray',
      difficulty: 'easy',
      topics: ['arrays'],
      companies: ['Yelp', 'Yandex', 'Alibaba'],
      status: 'Unsolved',
      points: 20,
      leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/',
      videoUrl: 'https://www.youtube.com/watch?v=example9',
      notesUrl: 'https://www.geeksforgeeks.org/maximum-subarray/',
      hasDiscussion: true
    },
    {
      id: 10,
      title: '3Sum',
      difficulty: 'medium',
      topics: ['two pointers'],
      companies: ['Bloomberg', 'Adobe', 'Oracle'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/3sum/',
      videoUrl: 'https://www.youtube.com/watch?v=example10',
      notesUrl: 'https://www.geeksforgeeks.org/find-triplets-array-whose-sum-equal-zero/',
      hasDiscussion: true
    },
    {
      id: 11,
      title: 'Word Ladder',
      difficulty: 'hard',
      topics: ['graphs'],
      companies: ['Pinterest', 'Quora', 'Reddit'],
      status: 'Unsolved',
      points: 35,
      leetcodeUrl: 'https://leetcode.com/problems/word-ladder/',
      videoUrl: 'https://www.youtube.com/watch?v=example11',
      notesUrl: 'https://www.geeksforgeeks.org/word-ladder-length-of-shortest-chain-to-reach-a-target-word/',
      hasDiscussion: true
    },
    {
      id: 12,
      title: 'LRU Cache',
      difficulty: 'medium',
      topics: ['design'],
      companies: ['Uber', 'Lyft', 'Airbnb'],
      status: 'Unsolved',
      points: 30,
      leetcodeUrl: 'https://leetcode.com/problems/lru-cache/',
      videoUrl: 'https://www.youtube.com/watch?v=example12',
      notesUrl: 'https://www.geeksforgeeks.org/lru-cache-implementation/',
      hasDiscussion: true
    },
    {
      id: 13,
      title: 'Longest Palindromic Substring',
      difficulty: 'medium',
      topics: ['strings'],
      companies: ['eBay', 'PayTM', 'Zoho'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/',
      videoUrl: 'https://www.youtube.com/watch?v=example13',
      notesUrl: 'https://www.geeksforgeeks.org/longest-palindrome-substring-set-1/',
      hasDiscussion: true
    },
    {
      id: 14,
      title: 'Merge k Sorted Lists',
      difficulty: 'hard',
      topics: ['linked lists'],
      companies: ['Twitter', 'Snapchat', 'Pinterest'],
      status: 'Unsolved',
      points: 35,
      leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/',
      videoUrl: 'https://www.youtube.com/watch?v=example14',
      notesUrl: 'https://www.geeksforgeeks.org/merge-k-sorted-linked-lists-set-2-using-min-heap/',
      hasDiscussion: true
    },
    {
      id: 15,
      title: 'Container With Most Water',
      difficulty: 'medium',
      topics: ['arrays'],
      companies: ['Salesforce', 'VMware', 'Cisco'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/',
      videoUrl: 'https://www.youtube.com/watch?v=example15',
      notesUrl: 'https://www.geeksforgeeks.org/container-with-most-water/',
      hasDiscussion: true
    },
    {
      id: 16,
      title: 'Search in Rotated Sorted Array',
      difficulty: 'medium',
      topics: ['binary search'],
      companies: ['Microsoft', 'Amazon', 'Facebook'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
      videoUrl: 'https://www.youtube.com/watch?v=example16',
      notesUrl: 'https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/',
      hasDiscussion: true
    },
    {
      id: 17,
      title: 'Combination Sum',
      difficulty: 'medium',
      topics: ['backtracking'],
      companies: ['Amazon', 'Uber', 'Airbnb'],
      status: 'Unsolved',
      points: 30,
      leetcodeUrl: 'https://leetcode.com/problems/combination-sum/',
      videoUrl: 'https://www.youtube.com/watch?v=example17',
      notesUrl: 'https://www.geeksforgeeks.org/combinational-sum/',
      hasDiscussion: true
    },
    {
      id: 18,
      title: 'Rotate Image',
      difficulty: 'medium',
      topics: ['arrays'],
      companies: ['Yelp', 'Yandex', 'Alibaba'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/rotate-image/',
      videoUrl: 'https://www.youtube.com/watch?v=example18',
      notesUrl: 'https://www.geeksforgeeks.org/rotate-a-matrix-by-90-degree-in-clockwise-direction-without-using-any-extra-space/',
      hasDiscussion: true
    },
    {
      id: 19,
      title: 'Word Search',
      difficulty: 'medium',
      topics: ['backtracking'],
      companies: ['Uber', 'Lyft', 'Airbnb'],
      status: 'Unsolved',
      points: 30,
      leetcodeUrl: 'https://leetcode.com/problems/word-search/',
      videoUrl: 'https://www.youtube.com/watch?v=example19',
      notesUrl: 'https://www.geeksforgeeks.org/word-search-using-backtracking/',
      hasDiscussion: true
    },
    {
      id: 20,
      title: 'Decode Ways',
      difficulty: 'medium',
      topics: ['dynamic programming'],
      companies: ['Bloomberg', 'Adobe', 'Oracle'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/decode-ways/',
      videoUrl: 'https://www.youtube.com/watch?v=example20',
      notesUrl: 'https://www.geeksforgeeks.org/count-possible-decodings-given-digit-sequence/',
      hasDiscussion: true
    },
    {
      id: 21,
      title: 'Validate Binary Search Tree',
      difficulty: 'medium',
      topics: ['trees'],
      companies: ['Amazon', 'Microsoft', 'Bloomberg'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',
      videoUrl: 'https://www.youtube.com/watch?v=example21',
      notesUrl: 'https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/',
      hasDiscussion: true
    },
    {
      id: 22,
      title: 'Clone Graph',
      difficulty: 'medium',
      topics: ['graphs'],
      companies: ['Bloomberg', 'Adobe', 'Oracle'],
      status: 'Unsolved',
      points: 30,
      leetcodeUrl: 'https://leetcode.com/problems/clone-graph/',
      videoUrl: 'https://www.youtube.com/watch?v=example22',
      notesUrl: 'https://www.geeksforgeeks.org/clone-an-undirected-graph/',
      hasDiscussion: true
    },
    {
      id: 23,
      title: 'Word Break',
      difficulty: 'medium',
      topics: ['dynamic programming'],
      companies: ['Twitter', 'Snapchat', 'Pinterest'],
      status: 'Unsolved',
      points: 30,
      leetcodeUrl: 'https://leetcode.com/problems/word-break/',
      videoUrl: 'https://www.youtube.com/watch?v=example23',
      notesUrl: 'https://www.geeksforgeeks.org/word-break-problem-dp-32/',
      hasDiscussion: true
    },
    {
      id: 24,
      title: 'Set Matrix Zeroes',
      difficulty: 'medium',
      topics: ['arrays'],
      companies: ['Microsoft', 'Amazon', 'Facebook'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/set-matrix-zeroes/',
      videoUrl: 'https://www.youtube.com/watch?v=example24',
      notesUrl: 'https://www.geeksforgeeks.org/a-boolean-matrix-question/',
      hasDiscussion: true
    },
    {
      id: 25,
      title: 'Word Ladder II',
      difficulty: 'hard',
      topics: ['graphs'],
      companies: ['Microsoft', 'Amazon', 'LinkedIn'],
      status: 'Unsolved',
      points: 40,
      leetcodeUrl: 'https://leetcode.com/problems/word-ladder-ii/',
      videoUrl: 'https://www.youtube.com/watch?v=example25',
      notesUrl: 'https://www.geeksforgeeks.org/word-ladder-set-2-bi-directional-bfs/',
      hasDiscussion: true
    },
    {
      id: 26,
      title: 'Maximal Rectangle',
      difficulty: 'hard',
      topics: ['stacks queues'],
      companies: ['Facebook', 'Google', 'Microsoft'],
      status: 'Unsolved',
      points: 40,
      leetcodeUrl: 'https://leetcode.com/problems/maximal-rectangle/',
      videoUrl: 'https://www.youtube.com/watch?v=example26',
      notesUrl: 'https://www.geeksforgeeks.org/maximum-size-rectangle-binary-sub-matrix-1s/',
      hasDiscussion: true
    },
    {
      id: 27,
      title: 'Binary Tree Maximum Path Sum',
      difficulty: 'hard',
      topics: ['trees'],
      companies: ['Facebook', 'Amazon', 'Microsoft'],
      status: 'Unsolved',
      points: 40,
      leetcodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
      videoUrl: 'https://www.youtube.com/watch?v=example27',
      notesUrl: 'https://www.geeksforgeeks.org/find-maximum-path-sum-in-a-binary-tree/',
      hasDiscussion: true
    },
    {
      id: 28,
      title: 'Longest Consecutive Sequence',
      difficulty: 'medium',
      topics: ['arrays'],
      companies: ['Netflix', 'Spotify', 'LinkedIn'],
      status: 'Unsolved',
      points: 30,
      leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/',
      videoUrl: 'https://www.youtube.com/watch?v=example28',
      notesUrl: 'https://www.geeksforgeeks.org/longest-consecutive-subsequence/',
      hasDiscussion: true
    },
    {
      id: 29,
      title: 'Surrounded Regions',
      difficulty: 'medium',
      topics: ['graphs'],
      companies: ['Amazon', 'Microsoft', 'Uber'],
      status: 'Unsolved',
      points: 30,
      leetcodeUrl: 'https://leetcode.com/problems/surrounded-regions/',
      videoUrl: 'https://www.youtube.com/watch?v=example29',
      notesUrl: 'https://www.geeksforgeeks.org/given-matrix-o-x-replace-o-x-surrounded-x/',
      hasDiscussion: true
    },
    {
      id: 30,
      title: 'Palindrome Partitioning',
      difficulty: 'medium',
      topics: ['backtracking'],
      companies: ['Uber', 'Lyft', 'Airbnb'],
      status: 'Unsolved',
      points: 30,
      leetcodeUrl: 'https://leetcode.com/problems/palindrome-partitioning/',
      videoUrl: 'https://www.youtube.com/watch?v=example30',
      notesUrl: 'https://www.geeksforgeeks.org/print-palindromic-partitions-string/',
      hasDiscussion: true
    },
    {
      id: 31,
      title: 'Gas Station',
      difficulty: 'medium',
      topics: ['greedy'],
      companies: ['Apple', 'PayPal', 'Samsung'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/gas-station/',
      videoUrl: 'https://www.youtube.com/watch?v=example31',
      notesUrl: 'https://www.geeksforgeeks.org/find-a-tour-that-visits-all-stations/',
      hasDiscussion: true
    },
    {
      id: 32,
      title: 'Candy',
      difficulty: 'hard',
      topics: ['greedy'],
      companies: ['Netflix', 'Spotify', 'LinkedIn'],
      status: 'Unsolved',
      points: 35,
      leetcodeUrl: 'https://leetcode.com/problems/candy/',
      videoUrl: 'https://www.youtube.com/watch?v=example32',
      notesUrl: 'https://www.geeksforgeeks.org/chocolate-distribution-problem/',
      hasDiscussion: true
    },
    {
      id: 33,
      title: 'Word Break II',
      difficulty: 'hard',
      topics: ['backtracking'],
      companies: ['Twitter', 'Snapchat', 'Pinterest'],
      status: 'Unsolved',
      points: 40,
      leetcodeUrl: 'https://leetcode.com/problems/word-break-ii/',
      videoUrl: 'https://www.youtube.com/watch?v=example33',
      notesUrl: 'https://www.geeksforgeeks.org/word-break-problem-using-backtracking/',
      hasDiscussion: true
    },
    {
      id: 34,
      title: 'Copy List with Random Pointer',
      difficulty: 'medium',
      topics: ['linked lists'],
      companies: ['eBay', 'PayTM', 'Zoho'],
      status: 'Unsolved',
      points: 30,
      leetcodeUrl: 'https://leetcode.com/problems/copy-list-with-random-pointer/',
      videoUrl: 'https://www.youtube.com/watch?v=example34',
      notesUrl: 'https://www.geeksforgeeks.org/a-linked-list-with-next-and-arbit-pointer/',
      hasDiscussion: true
    },
    {
      id: 35,
      title: 'Single Number',
      difficulty: 'easy',
      topics: ['bit manipulation'],
      companies: ['Uber', 'Lyft', 'Airbnb'],
      status: 'Unsolved',
      points: 15,
      leetcodeUrl: 'https://leetcode.com/problems/single-number/',
      videoUrl: 'https://www.youtube.com/watch?v=example35',
      notesUrl: 'https://www.geeksforgeeks.org/find-element-appears-once/',
      hasDiscussion: true
    },
    {
      id: 36,
      title: 'Linked List Cycle',
      difficulty: 'easy',
      topics: ['linked lists'],
      companies: ['Uber', 'Lyft', 'Airbnb'],
      status: 'Unsolved',
      points: 15,
      leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/',
      videoUrl: 'https://www.youtube.com/watch?v=example36',
      notesUrl: 'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/',
      hasDiscussion: true
    },
    {
      id: 37,
      title: 'LRU Cache',
      difficulty: 'medium',
      topics: ['design'],
      companies: ['Uber', 'Lyft', 'Airbnb'],
      status: 'Unsolved',
      points: 30,
      leetcodeUrl: 'https://leetcode.com/problems/lru-cache/',
      videoUrl: 'https://www.youtube.com/watch?v=example37',
      notesUrl: 'https://www.geeksforgeeks.org/lru-cache-implementation/',
      hasDiscussion: true
    },
    {
      id: 38,
      title: 'Sort List',
      difficulty: 'medium',
      topics: ['linked lists'],
      companies: ['Uber', 'Lyft', 'Airbnb'],
      status: 'Unsolved',
      points: 30,
      leetcodeUrl: 'https://leetcode.com/problems/sort-list/',
      videoUrl: 'https://www.youtube.com/watch?v=example38',
      notesUrl: 'https://www.geeksforgeeks.org/merge-sort-for-linked-list/',
      hasDiscussion: true
    },
    {
      id: 39,
      title: 'Max Points on a Line',
      difficulty: 'hard',
      topics: ['math'],
      companies: ['Netflix', 'Spotify', 'LinkedIn'],
      status: 'Unsolved',
      points: 40,
      leetcodeUrl: 'https://leetcode.com/problems/max-points-on-a-line/',
      videoUrl: 'https://www.youtube.com/watch?v=example39',
      notesUrl: 'https://www.geeksforgeeks.org/count-maximum-points-on-same-line/',
      hasDiscussion: true
    },
    {
      id: 40,
      title: 'Evaluate Reverse Polish Notation',
      difficulty: 'medium',
      topics: ['stacks queues'],
      companies: ['Apple', 'PayPal', 'Samsung'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/',
      videoUrl: 'https://www.youtube.com/watch?v=example40',
      notesUrl: 'https://www.geeksforgeeks.org/evaluate-the-value-of-an-arithmetic-expression-in-reverse-polish-notation-in-java/',
      hasDiscussion: true
    },
    {
      id: 41,
      title: 'Maximum Product Subarray',
      difficulty: 'medium',
      topics: ['dynamic programming'],
      companies: ['Uber', 'Lyft', 'Airbnb'],
      status: 'Unsolved',
      points: 30,
      leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray/',
      videoUrl: 'https://www.youtube.com/watch?v=example41',
      notesUrl: 'https://www.geeksforgeeks.org/maximum-product-subarray/',
      hasDiscussion: true
    },
    {
      id: 42,
      title: 'Find Minimum in Rotated Sorted Array',
      difficulty: 'medium',
      topics: ['binary search'],
      companies: ['Microsoft', 'Amazon', 'Facebook'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
      videoUrl: 'https://www.youtube.com/watch?v=example42',
      notesUrl: 'https://www.geeksforgeeks.org/find-minimum-element-in-a-sorted-and-rotated-array/',
      hasDiscussion: true
    },
    {
      id: 43,
      title: 'Min Stack',
      difficulty: 'easy',
      topics: ['stacks queues'],
      companies: ['Uber', 'Lyft', 'Airbnb'],
      status: 'Unsolved',
      points: 20,
      leetcodeUrl: 'https://leetcode.com/problems/min-stack/',
      videoUrl: 'https://www.youtube.com/watch?v=example43',
      notesUrl: 'https://www.geeksforgeeks.org/design-a-stack-that-supports-getmin-in-o1-time-and-o1-extra-space/',
      hasDiscussion: true
    },
    {
      id: 44,
      title: 'Intersection of Two Linked Lists',
      difficulty: 'easy',
      topics: ['linked lists'],
      companies: ['Uber', 'Lyft', 'Airbnb'],
      status: 'Unsolved',
      points: 20,
      leetcodeUrl: 'https://leetcode.com/problems/intersection-of-two-linked-lists/',
      videoUrl: 'https://www.youtube.com/watch?v=example44',
      notesUrl: 'https://www.geeksforgeeks.org/write-a-function-to-get-the-intersection-point-of-two-linked-lists/',
      hasDiscussion: true
    },
    {
      id: 45,
      title: 'Find Peak Element',
      difficulty: 'medium',
      topics: ['binary search'],
      companies: ['Facebook', 'Amazon', 'Microsoft'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/find-peak-element/',
      videoUrl: 'https://www.youtube.com/watch?v=example45',
      notesUrl: 'https://www.geeksforgeeks.org/find-a-peak-in-a-given-array/',
      hasDiscussion: true
    },
    {
      id: 46,
      title: 'Fraction to Recurring Decimal',
      difficulty: 'medium',
      topics: ['math'],
      companies: ['Netflix', 'Spotify', 'LinkedIn'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/fraction-to-recurring-decimal/',
      videoUrl: 'https://www.youtube.com/watch?v=example46',
      notesUrl: 'https://www.geeksforgeeks.org/find-recurring-sequence-fraction/',
      hasDiscussion: true
    },
    {
      id: 47,
      title: 'Maximum Gap',
      difficulty: 'hard',
      topics: ['sorting'],
      companies: ['Uber', 'Lyft', 'Airbnb'],
      status: 'Unsolved',
      points: 35,
      leetcodeUrl: 'https://leetcode.com/problems/maximum-gap/',
      videoUrl: 'https://www.youtube.com/watch?v=example47',
      notesUrl: 'https://www.geeksforgeeks.org/maximum-adjacent-difference-array-sorted-form/',
      hasDiscussion: true
    },
    {
      id: 48,
      title: 'Compare Version Numbers',
      difficulty: 'medium',
      topics: ['strings'],
      companies: ['Intel', 'NVIDIA', 'IBM'],
      status: 'Unsolved',
      points: 25,
      leetcodeUrl: 'https://leetcode.com/problems/compare-version-numbers/',
      videoUrl: 'https://www.youtube.com/watch?v=example48',
      notesUrl: 'https://www.geeksforgeeks.org/compare-version-numbers-large-inputs-allowed/',
      hasDiscussion: true
    },
    {
      id: 49,
      title: 'Excel Sheet Column Number',
      difficulty: 'easy',
      topics: ['math'],
      companies: ['Microsoft', 'Google', 'Amazon'],
      status: 'Unsolved',
      points: 15,
      leetcodeUrl: 'https://leetcode.com/problems/excel-sheet-column-number/',
      videoUrl: 'https://www.youtube.com/watch?v=example49',
      notesUrl: 'https://www.geeksforgeeks.org/find-excel-column-number-column-title/',
      hasDiscussion: true
    },
    {
      id: 50,
      title: 'Factorial Trailing Zeroes',
      difficulty: 'easy',
      topics: ['math'],
      companies: ['Walmart Labs', 'Goldman Sachs', 'JPMorgan'],
      status: 'Unsolved',
      points: 15,
      leetcodeUrl: 'https://leetcode.com/problems/factorial-trailing-zeroes/',
      videoUrl: 'https://www.youtube.com/watch?v=example50',
      notesUrl: 'https://www.geeksforgeeks.org/count-trailing-zeroes-factorial-number/',
      hasDiscussion: true
    }
  ];

const Problems = () => {
  const [topicFilter, setTopicFilter] = useState('All Topics');
  const [difficultyFilter, setDifficultyFilter] = useState('All Difficulties');
  const [statusFilter, setStatusFilter] = useState('All Problems');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [randomProblem, setRandomProblem] = useState(null);

  const handlePickRandom = () => {
    const randomIndex = Math.floor(Math.random() * problems.length);
    setRandomProblem(problems[randomIndex]);
    setShowRandomModal(true);
  };

  const handleSolveProblem = (url) => {
    window.open(url, '_blank');
  };

  const handleOpenVideo = (url) => {
    window.open(url, '_blank');
  };

  const handleOpenNotes = (url) => {
    window.open(url, '_blank');
  };

  const handleOpenDiscussion = (problemId) => {
    // Navigate to discussion page for this problem
    window.location.href = `/problem/${problemId}/discussion`;
  };

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTopic = topicFilter === 'All Topics' || problem.topics.some(t => t === topicFilter.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'All Difficulties' || problem.difficulty === difficultyFilter.toLowerCase();
    const matchesStatus = statusFilter === 'All Problems' || problem.status === statusFilter;
    return matchesSearch && matchesTopic && matchesDifficulty && matchesStatus;
  });

  return (
    <div className="problems-container">
      <div className="problems-header">
        <div className="header-top">
          <div>
            <h1>Problem Library</h1>
            <p>{filteredProblems.length} problems to master your coding skills</p>
          </div>
          <div className="header-actions">
            <button className="action-btn" onClick={handlePickRandom}>
              <FaRandom /> Pick Random
            </button>
            <button className="action-btn primary">
              <FaFire /> Daily Challenge
            </button>
          </div>
        </div>
        
        <div className="filter-section">
          <h3 className="filter-title">Filter Problems</h3>
          <div className="filters-row">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select 
              className="filter-dropdown"
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
            >
              <option>All Topics</option>
              <option>arrays</option>
              <option>linked lists</option>
              <option>stacks queues</option>
              <option>strings</option>
              <option>trees</option>
              <option>graphs</option>
            </select>
            
            <select 
              className="filter-dropdown"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option>All Difficulties</option>
              <option>easy</option>
              <option>medium</option>
              <option>hard</option>
            </select>
            
            <select 
              className="filter-dropdown"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Problems</option>
              <option>Solved</option>
              <option>Unsolved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="problems-grid">
        {filteredProblems.map((problem) => (
          <div key={problem.id} className="problem-card">
            <div className="card-header">
              <h3>{problem.title}</h3>
              <div className="card-icons">
                <button className="icon-btn" title="Send">
                  <FaPaperPlane />
                </button>
                <button className="icon-btn" title="Bookmark">
                  <FaStar />
                </button>
              </div>
            </div>
            
            <div className="card-tags">
              <span className={`difficulty-badge ${problem.difficulty}`}>
                {problem.difficulty}
              </span>
              {problem.topics.map((topic, index) => (
                <span key={index} className="topic-badge">{topic}</span>
              ))}
            </div>
            
            <div className="action-buttons-row">
              <button 
                className="solve-button"
                onClick={() => handleSolveProblem(problem.leetcodeUrl)}
              >
                <FaExternalLinkAlt /> Solve
              </button>
              
              <button 
                className="resource-btn video-btn"
                onClick={() => handleOpenVideo(problem.videoUrl)}
                title="Watch Video Solution"
              >
                <FaVideo />
              </button>
              
              <button 
                className="resource-btn notes-btn"
                onClick={() => handleOpenNotes(problem.notesUrl)}
                title="Read Notes/Article"
              >
                <FaBook />
              </button>
              
              <button 
                className={`resource-btn discussion-btn ${!problem.hasDiscussion ? 'disabled' : ''}`}
                onClick={() => problem.hasDiscussion && handleOpenDiscussion(problem.id)}
                title="View Discussion"
                disabled={!problem.hasDiscussion}
              >
                <FaComment />
              </button>
            </div>
            
            <div className="card-footer">
              <div className="companies-section">
                <span className="label">Companies:</span>
                <div className="companies-tags">
                  {problem.companies.map((company, index) => (
                    <span key={index} className="company-badge">{company}</span>
                  ))}
                </div>
              </div>
              
              <div className="status-row">
                <div className="status-dropdown">
                  <span className="status-icon"></span>
                  <span className="status-text">{problem.status}</span>
                  <FaChevronDown className="dropdown-icon" />
                </div>
                <span className="points-badge">{problem.points} pts</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showRandomModal && randomProblem && (
        <div className="modal-overlay" onClick={() => setShowRandomModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowRandomModal(false)}>×</button>
            <div className="modal-header">
              <div className="modal-icon">🎯</div>
              <h2>Random Challenge</h2>
            </div>
            <h3 className="modal-problem-title">{randomProblem.title}</h3>
            <div className="modal-tags">
              <span className={`difficulty-badge ${randomProblem.difficulty}`}>
                {randomProblem.difficulty}
              </span>
              {randomProblem.topics.map((topic, index) => (
                <span key={index} className="topic-badge">{topic}</span>
              ))}
            </div>
            <p className="modal-description">Ready to tackle this challenge?</p>
            <button 
              className="modal-solve-button"
              onClick={() => {
                handleSolveProblem(randomProblem.leetcodeUrl);
                setShowRandomModal(false);
              }}
            >
              <FaExternalLinkAlt /> Solve Problem
            </button>
            <div className="modal-footer-icons">
              <button className="modal-icon-btn" title="Watch Tutorial">
                <FaBook />
              </button>
              <button className="modal-icon-btn" title="Discuss">
                <FaComment />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problems;
