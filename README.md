Introduction

Welcome to "My News," a frontend application for browsing the latest news articles from the New York Times. This app was built using React and TypeScript and utilizes the New York Times developer API as its source of news articles.

Getting Started

1. First, you'll need to obtain an API key from the New York Times developer website at developer.nytimes.com. Follow the instructions on the website to sign up for an API key.

2. Next, clone the repository or download the code to your local machine.

3. Open the mainApiServices.tsx file in the services directory of the project. In this file, locate the following line:

const API_KEY = "";

4. Replace the empty string with your API key, so the line now looks like this:

const API_KEY = "your_api_key_here";

5. Open a terminal window in the root directory of the project and run the following command to install all necessary dependencies:

npm install

6. Once all dependencies have been installed, run the following command to start the development server:

npm start

7. The app should now be running on http://localhost:3000/.
