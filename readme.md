# TapMe Backend

This is the backend for the TapMe project, a Telegram-based application that allows users to earn coins by interacting with a bot. The backend is built with Node.js, TypeScript, and several other libraries to manage the server-side logic and interactions with the Supabase database.

## Table of Contents

- [Installation](#installation)
  - [Installing dependencies](#installing-dependencies)
- [Usage](#usage)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)

## Installation

### Installing dependencies

To install the dependencies, run the following command in your terminal:

```bash
npm install
```

## Usage

To start the development server, use the following command:

```bash
npm run dev
```

For production, build the TypeScript files and start the server:

```bash
npm run build
npm run serve
```

## Scripts

- `start`: Starts the application using ts-node.
- `build`: Compiles TypeScript files into JavaScript.
- `dev`: Runs the application with nodemon for development.

## Environment Variables

Ensure you have a .env file in the root directory with the necessary environment variables. Example variables include:

- `SUPABASE_URL`: The URL of your Supabase instance.
- `SUPABASE_KEY`: The URL of your Supabase instance.
- `WEB_APP_URL`: Web App Url
- `TELEGRAM_BOT_TOKEN`: Telegram bot token
