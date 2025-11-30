// Comprehensive DSA Learning Resources with Notes and Articles

export const dsaTopics = [
    {
        id: 'arrays',
        title: 'Arrays',
        videoUrl: 'https://www.youtube.com/embed/37E9ckMDdTk',
        subtopics: [
            'Introduction',
            'Largest Element',
            'Second Largest',
            'Check if Sorted',
            'Remove Duplicates'
        ],
        notes: {
            introduction: `
# Arrays - Complete Guide

## What is an Array?
An array is a collection of elements stored at contiguous memory locations. It's one of the most fundamental data structures in computer science.

### Key Characteristics:
- **Fixed Size**: Arrays have a predetermined size
- **Contiguous Memory**: Elements are stored in adjacent memory locations
- **Index-Based Access**: Elements can be accessed using indices (0-based indexing)
- **Same Data Type**: All elements must be of the same type

### Time Complexity:
- **Access**: O(1) - Direct access using index
- **Search**: O(n) - Linear search required
- **Insertion**: O(n) - May require shifting elements
- **Deletion**: O(n) - May require shifting elements

## Common Operations

### 1. Finding Largest Element
\`\`\`javascript
function findLargest(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
// Time: O(n), Space: O(1)
\`\`\`

### 2. Finding Second Largest
\`\`\`javascript
function findSecondLargest(arr) {
  let first = -Infinity, second = -Infinity;
  
  for (let num of arr) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num !== first) {
      second = num;
    }
  }
  return second;
}
// Time: O(n), Space: O(1)
\`\`\`

### 3. Check if Array is Sorted
\`\`\`javascript
function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i-1]) {
      return false;
    }
  }
  return true;
}
// Time: O(n), Space: O(1)
\`\`\`

### 4. Remove Duplicates (In-place)
\`\`\`javascript
function removeDuplicates(arr) {
  if (arr.length === 0) return 0;
  
  let j = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[j]) {
      j++;
      arr[j] = arr[i];
    }
  }
  return j + 1; // New length
}
// Time: O(n), Space: O(1)
\`\`\`

## Advanced Techniques

### Two Pointer Technique
Used for problems involving pairs, triplets, or subarrays.

\`\`\`javascript
// Example: Find pair with given sum
function findPair(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}
\`\`\`

### Sliding Window
Used for subarray problems with fixed or variable size.

\`\`\`javascript
// Example: Maximum sum subarray of size k
function maxSumSubarray(arr, k) {
  let maxSum = 0, windowSum = 0;
  
  // First window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;
  
  // Slide the window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i-k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}
\`\`\`

## Practice Problems
1. Rotate array by k positions
2. Find missing number in array
3. Merge two sorted arrays
4. Find majority element
5. Maximum subarray sum (Kadane's Algorithm)

## Tips for Interviews
✅ Always clarify array constraints (size, sorted, duplicates)
✅ Consider edge cases (empty array, single element)
✅ Think about space-time tradeoffs
✅ Practice in-place modifications
      `,

            articles: [
                {
                    title: "Arrays: The Foundation of Data Structures",
                    url: "https://www.geeksforgeeks.org/array-data-structure/",
                    description: "Comprehensive guide to arrays with examples"
                },
                {
                    title: "Array Manipulation Techniques",
                    url: "https://leetcode.com/explore/learn/card/fun-with-arrays/",
                    description: "Interactive problems and solutions"
                },
                {
                    title: "Time and Space Complexity Analysis",
                    url: "https://www.bigocheatsheet.com/",
                    description: "Big-O complexity reference"
                }
            ]
        }
    },

    {
        id: 'strings',
        title: 'Strings',
        videoUrl: 'https://www.youtube.com/embed/Dt6gzsNrghQ',
        subtopics: [
            'String Basics',
            'Palindrome Check',
            'Reverse String',
            'Anagram',
            'Pattern Matching'
        ],
        notes: {
            introduction: `
# Strings - Complete Guide

## What is a String?
A string is a sequence of characters. In most programming languages, strings are immutable (cannot be changed after creation).

### Key Characteristics:
- **Immutable**: Strings cannot be modified in-place (in most languages)
- **Character Array**: Internally represented as array of characters
- **Unicode Support**: Modern strings support Unicode characters
- **Built-in Methods**: Rich set of manipulation methods

### Time Complexity:
- **Access**: O(1) - Access character by index
- **Search**: O(n) - Linear search for substring
- **Concatenation**: O(n+m) - Create new string
- **Substring**: O(n) - Create new string

## Common Operations

### 1. Palindrome Check
\`\`\`javascript
function isPalindrome(str) {
  // Clean string: remove non-alphanumeric, lowercase
  str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  let left = 0, right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}
// Time: O(n), Space: O(1)
\`\`\`

### 2. Reverse String
\`\`\`javascript
// Method 1: Two pointers
function reverseString(s) {
  let arr = s.split('');
  let left = 0, right = arr.length - 1;
  
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr.join('');
}

// Method 2: Built-in
function reverseStringSimple(s) {
  return s.split('').reverse().join('');
}
// Time: O(n), Space: O(n)
\`\`\`

### 3. Check Anagram
\`\`\`javascript
function isAnagram(s1, s2) {
  if (s1.length !== s2.length) return false;
  
  const freq = {};
  
  // Count characters in s1
  for (let char of s1) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  // Decrease count for s2
  for (let char of s2) {
    if (!freq[char]) return false;
    freq[char]--;
  }
  
  return true;
}
// Time: O(n), Space: O(k) where k is unique characters
\`\`\`

### 4. Pattern Matching (KMP Algorithm)
\`\`\`javascript
function KMPSearch(text, pattern) {
  const lps = computeLPS(pattern);
  const result = [];
  
  let i = 0, j = 0;
  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
    }
    
    if (j === pattern.length) {
      result.push(i - j);
      j = lps[j - 1];
    } else if (i < text.length && text[i] !== pattern[j]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  return result;
}

function computeLPS(pattern) {
  const lps = new Array(pattern.length).fill(0);
  let len = 0, i = 1;
  
  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}
// Time: O(n+m), Space: O(m)
\`\`\`

## Advanced Techniques

### String Hashing
\`\`\`javascript
function rabinKarp(text, pattern) {
  const d = 256; // Number of characters
  const q = 101; // Prime number
  const m = pattern.length;
  const n = text.length;
  let p = 0, t = 0, h = 1;
  
  // Calculate h = d^(m-1) % q
  for (let i = 0; i < m - 1; i++) {
    h = (h * d) % q;
  }
  
  // Calculate hash for pattern and first window
  for (let i = 0; i < m; i++) {
    p = (d * p + pattern.charCodeAt(i)) % q;
    t = (d * t + text.charCodeAt(i)) % q;
  }
  
  // Slide the window
  for (let i = 0; i <= n - m; i++) {
    if (p === t) {
      // Check characters one by one
      let j;
      for (j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) break;
      }
      if (j === m) return i; // Pattern found
    }
    
    if (i < n - m) {
      t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
      if (t < 0) t += q;
    }
  }
  return -1;
}
\`\`\`

### Trie (Prefix Tree)
\`\`\`javascript
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  
  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }
  
  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }
  
  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }
}
\`\`\`

## Practice Problems
1. Longest palindromic substring
2. Group anagrams
3. Longest substring without repeating characters
4. String compression
5. Valid parentheses

## Tips for Interviews
✅ Clarify if string is ASCII or Unicode
✅ Ask about case sensitivity
✅ Consider using hash maps for character frequency
✅ Remember two-pointer technique for palindromes
✅ Practice pattern matching algorithms
      `,

            articles: [
                {
                    title: "String Algorithms",
                    url: "https://www.geeksforgeeks.org/string-data-structure/",
                    description: "Complete guide to string manipulation"
                },
                {
                    title: "Pattern Matching Algorithms",
                    url: "https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/",
                    description: "KMP, Rabin-Karp, and more"
                },
                {
                    title: "Trie Data Structure",
                    url: "https://leetcode.com/explore/learn/card/trie/",
                    description: "Learn about prefix trees"
                }
            ]
        }
    },

    {
        id: 'trees',
        title: 'Trees',
        videoUrl: 'https://www.youtube.com/embed/YAdLFsTG70w',
        subtopics: [
            'Binary Tree Basics',
            'Tree Traversals',
            'Binary Search Tree',
            'Tree Properties',
            'Basic Tree Problems'
        ],
        notes: {
            introduction: `
# Trees - Complete Guide

## What is a Tree?
A tree is a hierarchical data structure consisting of nodes connected by edges. It's a non-linear data structure that simulates a hierarchical tree structure.

### Key Terminology:
- **Root**: Top node of the tree
- **Parent**: Node with children
- **Child**: Node descended from another node
- **Leaf**: Node with no children
- **Height**: Longest path from root to leaf
- **Depth**: Distance from root to a node
- **Level**: Depth + 1

### Binary Tree:
A tree where each node has at most two children (left and right).

\`\`\`javascript
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
\`\`\`

## Tree Traversals

### 1. Inorder (Left-Root-Right)
\`\`\`javascript
function inorder(root) {
  if (!root) return;
  inorder(root.left);
  console.log(root.val);
  inorder(root.right);
}
// For BST: gives sorted order
// Time: O(n), Space: O(h) where h is height
\`\`\`

### 2. Preorder (Root-Left-Right)
\`\`\`javascript
function preorder(root) {
  if (!root) return;
  console.log(root.val);
  preorder(root.left);
  preorder(root.right);
}
// Used for: creating copy of tree
// Time: O(n), Space: O(h)
\`\`\`

### 3. Postorder (Left-Right-Root)
\`\`\`javascript
function postorder(root) {
  if (!root) return;
  postorder(root.left);
  postorder(root.right);
  console.log(root.val);
}
// Used for: deleting tree, evaluating expressions
// Time: O(n), Space: O(h)
\`\`\`

### 4. Level Order (BFS)
\`\`\`javascript
function levelOrder(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}
// Time: O(n), Space: O(w) where w is max width
\`\`\`

## Binary Search Tree (BST)

### Properties:
- Left subtree contains only nodes with values < root
- Right subtree contains only nodes with values > root
- Both subtrees are also BSTs

### BST Operations:

#### Search
\`\`\`javascript
function search(root, val) {
  if (!root || root.val === val) return root;
  
  if (val < root.val) {
    return search(root.left, val);
  }
  return search(root.right, val);
}
// Time: O(h), Space: O(h)
\`\`\`

#### Insert
\`\`\`javascript
function insert(root, val) {
  if (!root) return new TreeNode(val);
  
  if (val < root.val) {
    root.left = insert(root.left, val);
  } else if (val > root.val) {
    root.right = insert(root.right, val);
  }
  return root;
}
// Time: O(h), Space: O(h)
\`\`\`

#### Delete
\`\`\`javascript
function deleteNode(root, val) {
  if (!root) return null;
  
  if (val < root.val) {
    root.left = deleteNode(root.left, val);
  } else if (val > root.val) {
    root.right = deleteNode(root.right, val);
  } else {
    // Node to be deleted found
    
    // Case 1: No child or one child
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    
    // Case 2: Two children
    // Find inorder successor (smallest in right subtree)
    let successor = root.right;
    while (successor.left) {
      successor = successor.left;
    }
    root.val = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }
  return root;
}
// Time: O(h), Space: O(h)
\`\`\`

## Common Tree Problems

### 1. Maximum Depth
\`\`\`javascript
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
\`\`\`

### 2. Check if Balanced
\`\`\`javascript
function isBalanced(root) {
  function height(node) {
    if (!node) return 0;
    
    const leftHeight = height(node.left);
    if (leftHeight === -1) return -1;
    
    const rightHeight = height(node.right);
    if (rightHeight === -1) return -1;
    
    if (Math.abs(leftHeight - rightHeight) > 1) return -1;
    
    return 1 + Math.max(leftHeight, rightHeight);
  }
  
  return height(root) !== -1;
}
\`\`\`

### 3. Lowest Common Ancestor
\`\`\`javascript
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  
  if (left && right) return root;
  return left || right;
}
\`\`\`

### 4. Diameter of Tree
\`\`\`javascript
function diameterOfBinaryTree(root) {
  let diameter = 0;
  
  function height(node) {
    if (!node) return 0;
    
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    
    diameter = Math.max(diameter, leftHeight + rightHeight);
    
    return 1 + Math.max(leftHeight, rightHeight);
  }
  
  height(root);
  return diameter;
}
\`\`\`

## Practice Problems
1. Validate BST
2. Serialize and deserialize binary tree
3. Path sum problems
4. Construct tree from traversals
5. Mirror/Invert binary tree

## Tips for Interviews
✅ Always check for null/empty tree
✅ Understand recursion deeply
✅ Practice both recursive and iterative solutions
✅ Know all traversal methods
✅ Understand BST properties
      `,

            articles: [
                {
                    title: "Binary Trees",
                    url: "https://www.geeksforgeeks.org/binary-tree-data-structure/",
                    description: "Complete guide to binary trees"
                },
                {
                    title: "Binary Search Trees",
                    url: "https://leetcode.com/explore/learn/card/introduction-to-data-structure-binary-search-tree/",
                    description: "Interactive BST problems"
                },
                {
                    title: "Tree Traversals Visualized",
                    url: "https://visualgo.net/en/bst",
                    description: "Visual learning tool"
                }
            ]
        }
    },

    {
        id: 'heaps',
        title: 'Heaps',
        videoUrl: 'https://www.youtube.com/embed/NEtwJASLU8Q',
        subtopics: [
            'Heap Basics',
            'Heap Operations',
            'Heap Sort',
            'Priority Queues',
            'Heap Applications'
        ],
        notes: {
            introduction: "Heaps are specialized tree-based data structures. Check the notes tab for comprehensive guide with code examples.",
            articles: [
                {
                    title: "Heap Data Structure",
                    url: "https://www.geeksforgeeks.org/heap-data-structure/",
                    description: "Complete guide to heaps with implementation"
                },
                {
                    title: "Priority Queue",
                    url: "https://leetcode.com/explore/learn/card/heap/",
                    description: "Heap and priority queue problems"
                },
                {
                    title: "Heap Sort Visualization",
                    url: "https://visualgo.net/en/heap",
                    description: "Interactive heap visualization"
                }
            ]
        }
    },

    {
        id: 'hashing',
        title: 'Hashing',
        videoUrl: 'https://www.youtube.com/embed/KEs5UyBJ39g',
        subtopics: [
            'Hash Functions',
            'Hash Tables',
            'Collision Handling',
            'Hashing Applications',
            'Performance Analysis'
        ],
        notes: {
            introduction: "Hashing provides O(1) average time complexity for search, insert, and delete operations. Check notes for detailed implementation.",
            articles: [
                {
                    title: "Hashing Data Structure",
                    url: "https://www.geeksforgeeks.org/hashing-data-structure/",
                    description: "Complete hashing guide with collision handling"
                },
                {
                    title: "Hash Table",
                    url: "https://leetcode.com/explore/learn/card/hash-table/",
                    description: "Interactive hash table problems"
                },
                {
                    title: "Hash Function Visualization",
                    url: "https://visualgo.net/en/hashtable",
                    description: "Visual learning tool for hashing"
                }
            ]
        }
    },

    {
        id: 'sorting',
        title: 'Sorting',
        videoUrl: 'https://www.youtube.com/embed/HGk_ypEuS24',
        subtopics: [
            'Bubble Sort',
            'Selection Sort',
            'Insertion Sort',
            'Merge Sort',
            'Quick Sort',
            'Heap Sort',
            'Comparison of Sorts'
        ],
        notes: {
            introduction: "Sorting algorithms arrange elements in a specific order. Learn all major sorting algorithms with time/space complexity analysis.",
            articles: [
                {
                    title: "Sorting Algorithms",
                    url: "https://www.geeksforgeeks.org/sorting-algorithms/",
                    description: "Complete guide to all sorting algorithms"
                },
                {
                    title: "Sorting Visualizations",
                    url: "https://visualgo.net/en/sorting",
                    description: "Interactive sorting animations"
                },
                {
                    title: "Sorting Comparison",
                    url: "https://www.toptal.com/developers/sorting-algorithms",
                    description: "Compare different sorting algorithms"
                }
            ]
        }
    },

    {
        id: 'backtracking',
        title: 'Backtracking',
        videoUrl: 'https://www.youtube.com/embed/L0NxT2i-LOY',
        subtopics: [
            'Introduction',
            'N-Queens Problem',
            'Sudoku Solver',
            'Subset Generation',
            'Permutations'
        ],
        notes: {
            introduction: "Backtracking is a technique for solving problems recursively by trying to build solutions incrementally. Master N-Queens, Sudoku, and more.",
            articles: [
                {
                    title: "Backtracking Algorithms",
                    url: "https://www.geeksforgeeks.org/backtracking-algorithms/",
                    description: "Complete backtracking guide with examples"
                },
                {
                    title: "Backtracking Problems",
                    url: "https://leetcode.com/tag/backtracking/",
                    description: "Practice backtracking problems"
                },
                {
                    title: "N-Queens Visualization",
                    url: "https://visualgo.net/en/recursion",
                    description: "Interactive backtracking visualization"
                }
            ]
        }
    },

    {
        id: 'greedy',
        title: 'Greedy Algorithms',
        videoUrl: 'https://www.youtube.com/embed/DIX2p7vb9co',
        subtopics: [
            'Greedy Approach',
            'Activity Selection',
            'Huffman Coding',
            "Dijkstra's Algorithm",
            'Minimum Spanning Tree'
        ],
        notes: {
            introduction: "Greedy algorithms make locally optimal choices at each step. Learn when greedy works and when it doesn't.",
            articles: [
                {
                    title: "Greedy Algorithms",
                    url: "https://www.geeksforgeeks.org/greedy-algorithms/",
                    description: "Complete guide to greedy approach"
                },
                {
                    title: "Greedy vs Dynamic Programming",
                    url: "https://leetcode.com/discuss/general-discussion/662866/dp-for-beginners-problems-patterns-sample-solutions",
                    description: "When to use greedy vs DP"
                },
                {
                    title: "Graph Algorithms",
                    url: "https://visualgo.net/en/sssp",
                    description: "Dijkstra's algorithm visualization"
                }
            ]
        }
    }
];
