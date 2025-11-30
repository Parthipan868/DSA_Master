
const fs = require('fs');
const path = require('path');

// Path to ProblemsData.js
const problemsFilePath = path.join('C:', 'Users', 'arunp', 'OneDrive', '文档', 'Projects', 'DSA Master', 'Frontend', 'src', 'pages', 'ProblemsData.js');

// Read the file
let content = fs.readFileSync(problemsFilePath, 'utf8');

// Extract the problems array using regex or eval (eval is risky but valid for this local script)
// We'll use a safer approach: extract the array part string and parse it as JSON if possible, 
// but it's JS object literals (keys not quoted).
// So we will use a regex to find the array, then we will modify it in memory? 
// Actually, since I need to write it back as JS, I can just require it if I export it properly, 
// but the file uses `export { problems };` which is ES6. Node might complain.
// Let's just parse the file content as string.

// Regex to match the problems array
const startMatch = content.indexOf('const problems = [');
const endMatch = content.lastIndexOf('];');

if (startMatch === -1 || endMatch === -1) {
    console.error('Could not find problems array');
    process.exit(1);
}

// We will reconstruct the file.
// We need the list of companies.
const companiesList = [
    'Amazon', 'Google', 'Microsoft', 'Facebook', 'Apple',
    'Uber', 'Netflix', 'Twitter', 'LinkedIn', 'Airbnb',
    'Adobe', 'Oracle'
];

// Create a pool: 15 of each company
let companyPool = [];
companiesList.forEach(company => {
    for (let i = 0; i < 15; i++) {
        companyPool.push(company);
    }
});

// Shuffle the pool (Fisher-Yates)
for (let i = companyPool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [companyPool[i], companyPool[j]] = [companyPool[j], companyPool[i]];
}

// We need to parse the problems to assign companies.
// Since parsing the JS file text is hard with regex for nested objects, 
// I will just use a regex to replace the `companies: [...]` line for each problem.

// Split content by lines
let lines = content.split('\n');
let problemIndex = 0;
let newLines = [];

// We need to know how many companies to assign to each problem.
// 50 problems. 180 company slots.
// First 30 problems get 4 companies.
// Last 20 problems get 3 companies.
// 30*4 + 20*3 = 120 + 60 = 180.

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.trim().startsWith('companies:')) {
        // Determine how many companies for this problem
        // We assume the problems are in order 1 to 50 in the file.
        // problemIndex is 0-based (0 to 49)

        let count = (problemIndex < 30) ? 4 : 3;

        // Take 'count' companies from the pool
        let assignedCompanies = companyPool.splice(0, count);

        // Create the new line
        // Format: companies: ["A", "B", ...],
        let companiesString = assignedCompanies.map(c => `"${c}"`).join(', ');
        newLines.push(`    companies: [${companiesString}],`);

        problemIndex++;
    } else {
        newLines.push(line);
    }
}

// Write the new content back
fs.writeFileSync(problemsFilePath, newLines.join('\n'), 'utf8');
console.log('Successfully updated companies distribution.');
