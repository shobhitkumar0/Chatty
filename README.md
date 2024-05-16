# SNAPPY Chat Application

## Introduction
Welcome to SNAPPY, a MERN stack-based real-time chat application that provides a seamless chatting experience. With a sleek front-end designed in React.js and a robust Node.js backend, SNAPPY offers a secure and dynamic platform for users to communicate.

## Features
- **User Authentication**: Secure sign-up and login process using JWT for password protection and authorization.
![Alt text](image.png)
- **Profile Customization**: Users can personalize their profiles by selecting a profile picture.
![Alt text](image-1.png)
- **Real-Time Communication**: Built with socket.io to enable live chat between users without any delay.
- **MVC Architecture**: Organized code structure in the public folder following the Model-View-Controller pattern.

## Installation
To get started with SNAPPY, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install all the necessary dependencies with `npm install`.
4. Change directory to the public folder with `cd public`.
5. Run `npm run starting` to launch both the front-end and back-end servers concurrently.

## Folder Structure

- **public**: Contains the front-end part of the application.
  - **src**: Main source directory.
    - **assets**: Static files like images, fonts, etc.
    - **components**: React components such as `ChatInput.jsx`, `Contacts.jsx`, `Messages.jsx`.
    - **pages**: Page components like `Login.jsx`, `Register.jsx`, `SetAvatar.jsx`.
    - **utils**: Utility files like `APIRoutes.js`.
    - `App.js`: Main application file.
    - `index.js`: Entry point for the React application.

- **server**: Contains the back-end part of the application.
  - **controller**: Holds files responsible for handling input from users.
  - **model**: Contains database schemas or structures.
  - **node_modules**: Directory where all Node.js modules are located.
  - **routes**: Files that define various endpoints and their logic.
  - `.env`: Environment variables file.
  - `index.js`: Main entry point for server-side application.
  - `package-lock.json`: Automatically generated file for any operations where npm modifies either the node_modules tree or package.json.
  - `package.json`: File holding various metadata relevant to the project.

## Usage
Once the installation is complete:
1. Open your web browser.
2. Navigate to `http://localhost:3000` (or your configured port).
3. Register for an account or log in if you already have one.
4. Start chatting with other users in real-time!

## Contributing
Contributions to SNAPPY are always welcome. Whether it's bug fixes, feature additions, or improvements to the code, feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments
- Socket.io for enabling real-time bidirectional event-based communication.
- The React community for their continuous support and contributions.
 
