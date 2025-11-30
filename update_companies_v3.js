
const fs = require('fs');
const path = require('path');

const problemsFilePath = path.join('C:', 'Users', 'arunp', 'OneDrive', '文档', 'Projects', 'DSA Master', 'Frontend', 'src', 'pages', 'ProblemsData.js');

let content = fs.readFileSync(problemsFilePath, 'utf8');

const companiesList = [
    'Amazon', 'Google', 'Microsoft', 'Facebook', 'Apple',
    'Uber', 'Netflix', 'Twitter', 'LinkedIn', 'Airbnb',
    'Adobe', 'Oracle'
];

// Target: 15 of each.
let companyCounts = {};
companiesList.forEach(c => companyCounts[c] = 15);

let assignments = [];
let success = false;

// Try to build assignments
for (let attempt = 0; attempt < 1000; attempt++) {
    // Reset counts
    let currentCounts = { ...companyCounts };
    let tempAssignments = [];
    let possible = true;

    // We have 50 problems.
    // Problems 0-29 need 4 companies.
    // Problems 30-49 need 3 companies.

    for (let i = 0; i < 50; i++) {
        let needed = (i < 30) ? 4 : 3;
        let problemCompanies = [];

        // Strategy: Pick from companies with highest remaining count
        // Filter out companies already picked for this problem

        for (let k = 0; k < needed; k++) {
            // Get available companies that have count > 0 and are not in problemCompanies
            let candidates = companiesList.filter(c => currentCounts[c] > 0 && !problemCompanies.includes(c));

            if (candidates.length === 0) {
                possible = false;
                break;
            }

            // Sort candidates by remaining count descending, then random
            candidates.sort((a, b) => {
                let diff = currentCounts[b] - currentCounts[a];
                if (diff !== 0) return diff;
                return Math.random() - 0.5;
            });

            // Pick one of the top candidates (to avoid determinism getting stuck in same loop)
            // Let's pick from the top 3 to add some randomness but keep balance
            let pickIndex = Math.floor(Math.random() * Math.min(candidates.length, 3));
            let selected = candidates[pickIndex];

            problemCompanies.push(selected);
            currentCounts[selected]--;
        }

        if (!possible) break;
        tempAssignments.push(problemCompanies);
    }

    if (possible) {
        assignments = tempAssignments;
        success = true;
        break;
    }
}

if (!success) {
    console.log("Could not find perfect distribution even with heuristic.");
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
console.log('Successfully updated companies distribution with smart heuristic.');
