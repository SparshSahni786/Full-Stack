# React User List App

This is a simple React application that fetches user data from an external API and displays it in a list.

## Features

- Fetches data from API using `useEffect`
- Stores data using `useState`
- Displays user **Name** and **Email**
- Simple and clean component structure

## API Used

`https://jsonplaceholder.typicode.com/users`

## Project Structure

```bash
src/
 ├── components/
 │    └── Users.jsx
 ├── App.jsx
 └── main.jsx
How It Works

The app starts from main.jsx

App.jsx renders the Users component

Users.jsx makes an API call when the component loads

The fetched data is stored in state

The user list is displayed using map()

React Concepts Used

useState – to store fetched user data

useEffect – to call the API when the component loads

Installation and Setup

Clone the repository:

git clone https://github.com/Akshat-2707/FSD.git

Move into the project folder:

cd FSD

Install dependencies:

npm install

Start the development server:

npm run dev
Output

The application displays:

User Name

User Email

Possible Improvements

Add loading state

Add error handling

Move API logic to a separate service file

Improve UI styling

Purpose

This project is made for learning React basics such as:

Component structure

Hooks

API fetching

Dynamic rendering

Author

Akshat