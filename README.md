# BadgerChat Mobile App

A modern, full-stack social media mobile application built with React Native and Expo that enables users to connect, share, and engage in real-time conversations across multiple chatrooms, all from their mobile devices.

## Features

- **User Authentication**: Secure login and registration system with username and PIN verification
- **Multi-Room Chat**: Dynamic chatrooms themed around UW-Madison locations where users can join conversations
- **Real-Time Messaging**: Post and delete messages with titles and content
- **Mobile-First Design**: Native mobile interface with smooth navigation and touch interactions
- **Session Management**: Persistent login sessions with secure token storage using Expo SecureStore
- **RESTful API Integration**: Seamless backend communication for data persistence
- **Guest Access**: Browse chatrooms without authentication while maintaining read-only access

## Tech Stack

- **Frontend**: React Native with modern hooks and functional components
- **Navigation**: React Navigation v6 with drawer navigation for seamless room switching
- **Mobile Framework**: Expo for cross-platform development and easy deployment
- **State Management**: React hooks for local state management
- **Authentication**: Custom authentication system with JWT tokens and secure storage
- **UI Components**: React Native Paper for consistent Material Design components
- **Build Tool**: Expo CLI for fast development and optimized builds

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kevinrcodes/Social-Media-App
   cd social-media-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press 'i' for iOS simulator
   - Press 'a' for Android emulator
   - Press 'w' for web version

## Usage

1. **Register/Login**: Create an account or sign in with your credentials
2. **Browse Chatrooms**: Explore available conversation spaces themed around UW-Madison
3. **Join Conversations**: Tap on any chatroom to start participating
4. **Share Messages**: Post messages with titles and content using the floating action button
5. **Manage Content**: Delete your own posts as needed
6. **Guest Mode**: Browse chatrooms without creating an account

## License

This project is open source and available under the [MIT License](LICENSE).
