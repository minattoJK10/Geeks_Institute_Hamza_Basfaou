# TODO: Fix Quiz App Issues

## Code Fixes
- [x] Fix column name in questionModel.js: Change "options.option_text" to "options.text"

## Database Fixes (Run these SQL commands in your PostgreSQL database)
- [ ] Update questions table: Change correct_answer column to TEXT for consistency
- [ ] Add options for questions 1 and 2
- [ ] Link options to questions 1 and 2 in questions_options table
- [ ] Update correct_answer for questions 1 and 2 to match option IDs

## Testing
- [ ] Run the app and test the quiz functionality
- [ ] Verify options are displayed correctly
- [ ] Check scoring and leaderboard work
