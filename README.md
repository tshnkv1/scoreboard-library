# Live Football Scoreboard Library

## Overview
The ScoreBoard library provides a simple and efficient way to manage and track football (or soccer) matches in real-time. It supports adding new matches, updating scores, and viewing a ranked summary of matches based on the scores and match start times. The implementation is fully tested to ensure reliability.

## Features
1. Start a Match: Initialize a new match with two teams.
2. Update Score: Modify the score for an ongoing match.
3. Finish Match: Remove a match from the scoreboard when it ends.
4. Get Summary: View a summary of ongoing matches, sorted by:
5. Total score (highest to lowest).
6. Start time (most recent matches appear first if scores are tied).


## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- Package Manager: npm
- Jest (for running tests)

### Installation
1. Clone the repository:

https://github.com/tshnkv1/scoreboard-library.git

2. Navigate to the project directory:

cd scoreboard-library

3. Install dependencies:

npm install


## Usage

1. Import the Library

import ScoreBoard from './ScoreBoard';

2. Create an Instance

const scoreBoard = new ScoreBoard();

3. Start a Match

const matchId = scoreBoard.startMatch('Team A', 'Team B');
console.log(`Match started with ID: ${matchId}`);

4. Update a Match Score

scoreBoard.updateScore(matchId, 3, 2);
console.log('Score updated successfully!');

5. Finish a Match

scoreBoard.finishMatch(matchId);
console.log('Match finished!');

6. View Summary

const summary = scoreBoard.getSummary();
console.log('Match Summary:', summary);

### Example Workflow
import ScoreBoard from './ScoreBoard';

const scoreBoard = new ScoreBoard();

// Start matches
const match1 = scoreBoard.startMatch('Team A', 'Team B');
const match2 = scoreBoard.startMatch('Team C', 'Team D');

// Update scores
scoreBoard.updateScore(match1, 2, 1);
scoreBoard.updateScore(match2, 3, 3);

// Get summary
console.log(scoreBoard.getSummary());

// Finish a match
scoreBoard.finishMatch(match1);

// Get updated summary
console.log(scoreBoard.getSummary());

### Sample Output:

[ '1. Team C 3 - 3 Team D', '2. Team A 2 - 1 Team B' ]
[ '1. Team C 3 - 3 Team D' ]


## Testing

### Running Tests

npm test

### Test Structure
1. Start Match: Verifies that matches can be started and IDs are returned correctly.
2. Update Score: Checks if the scores are updated and validates error handling for invalid matches.
3. Finish Match: Ensures matches are properly removed from the scoreboard.
4. Summary: Confirms the summary output order (by score and start time).