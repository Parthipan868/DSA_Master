
const fs = require('fs');
const path = require('path');

const problemsFilePath = path.join('C:', 'Users', 'arunp', 'OneDrive', '文档', 'Projects', 'DSA Master', 'Frontend', 'src', 'pages', 'ProblemsData.js');

let content = fs.readFileSync(problemsFilePath, 'utf8');

const companiesList = [
    'Amazon', 'Google', 'Microsoft', 'Facebook', 'Apple',
    'Uber', 'Netflix', 'Twitter', 'LinkedIn', 'Airbnb',
    'Adobe', 'Oracle'
];

// Total slots: 30 * 4 + 20 * 3 = 180.
// 12 companies * 15 = 180. Perfect.

let assignments = [];
let success = false;
let maxAttempts = 5000;

for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Reset
    let pool = [];
    companiesList.forEach(c => {
        for (let k = 0; k < 15; k++) pool.push(c);
    });

    // Shuffle pool
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Distribute
    let tempAssignments = [];
    let poolIdx = 0;
    let possible = true;

    for (let i = 0; i < 50; i++) {
        let count = (i < 30) ? 4 : 3;
        let problemCompanies = [];
        for (let k = 0; k < count; k++) {
            problemCompanies.push(pool[poolIdx++]);
        }

        // Check for duplicates in this problem
        if (new Set(problemCompanies).size !== problemCompanies.length) {
            possible = false;
            break;
        }
        tempAssignments.push(problemCompanies);
    }

    if (possible) {
        assignments = tempAssignments;
        success = true;
        break;
    }
}

if (!success) {
    console.log("Could not find perfect distribution in attempts.");
    process.exit(1);
}

// Write back
let lines = content.split('\n');
let problemIndex = 0;
let newLines = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.trim().startsWith('companies:')) {
        let assignedCompanies = assignments[problemIndex];
        let companiesString = assignedCompanies.map(c => `"${c}"`).join(', ');
        newLines.push(`    companies: [${companiesString}],`);
        problemIndex++;
    } else {
        newLines.push(line);
    }
}

fs.writeFileSync(problemsFilePath, newLines.join('\n'), 'utf8');
console.log('Successfully updated companies distribution with uniqueness check.');
