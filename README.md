# Simplify Money Quiz App

A React Native mobile application that provides an interactive quiz experience focused on money-related questions.

## Features

- List view of available quizzes
- Interactive single-choice questions
- Real-time answer validation
- Progress tracking
- Result summary with correct/incorrect answers
- Mobile-responsive design for both Android and iOS

## Tech Stack

- React Native
- Expo
- JavaScript

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/hriday-sehgal/Simplify-Money-Quiz-React-Native
cd SimplifyMoneyQuizAppNew
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

## Running the App

After starting the development server, you can:

1. Run on Android:
   - Use an Android emulator
   - Or scan the QR code with Expo Go app on your Android device

2. Run on iOS:
   - Use iOS simulator (requires Mac)
   - Or scan the QR code with Expo Go app on your iOS device

3. Run on Web:
   - Open the app in your web browser

## QR Code

Scan this QR code in the Expo Go App to open the app in Expo Go:

![QR Code](https://github.com/user-attachments/assets/d8dc361f-1883-451a-9074-1fb8c5180cbc)

## Project Structure

```
SimplifyMoneyQuizAppNew/
├── app.json
├── index.js
├── Quiz.js
├── .expo/
└── README.md
```

## Quiz Format

The app supports multiple quizzes, each containing 5 single-choice questions. Each question has 5 answer options.

## Quiz Flow

1. User sees a list of available quizzes
2. Tapping a quiz starts the quiz on a new screen
3. For each question:
   - Question statement is displayed
   - 5 answer options are shown
   - User must select an option to enable the "Check Answer" button
   - After checking:
     - Correct answer: Green highlight with tick
     - Incorrect answer: Red highlight with cross, correct answer highlighted in green
     - Button changes to "Next" to proceed
4. After all questions are answered, a results screen is shown with:
   - Number of correct answers
   - Number of incorrect answers
   - Summary of each question's performance

## Bonus Features

- Prevents users from going back once a quiz starts
- Detailed result summary showing correct and incorrect answers

## Copyright Disclaimer

Copyright 2025 Hriday Sehgal. All rights reserved.

This project and its source code are the proprietary intellectual property of Hriday Sehgal. Unauthorized copying, modification, distribution, or reproduction in any form without explicit permission is strictly prohibited.

## Contact

For inquiries or collaborations, reach out via:
- **Email**: hriday.career@gmail.com
