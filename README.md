Stock Analysis App
Overview
This is a stock analysis application built with Next.js, leveraging its React framework for building fast, efficient, and static web pages. The app provides insights into stock data, including information on highs, lows, opens, closes, sum totals, moving averages, daily returns, and the relative strength index (RSI). It utilizes static pages for quick loading, courtesy of pre-built HTML.

Features
Static Pages for Faster Loading: Utilizing Next.js static pages for quick loading of content.
API for Testing: An API (/app/api/timeseries) is included for testing purposes, using the daily_IBM.json data file. just replace the url on usefetch hook with http://localhost:3000/api/TimeSeries

Organized Folder Structure: The app follows a highly organized folder structure with a focus on readability and maintainability.

Key directories include:
layouts: The base layout of the app.
pages: Children components rendered within the layout.
components: Basic UI components, charts (created using react-apex-charts), and views.
hooks: Data fetching and computational logic.
providers: Services accessible app-wide, including context providers (useContext) for managing global states and a DarkModeContext for dark mode.

Usage
Run Development Server:

yarn dev
This starts the app in development mode.

Build the App:

yarn build
Build the app for production.

Run in Production Mode:

yarn start
Start the app in production mode.

Tech Stack
Frontend Framework: Next.js
UI Framework: Tailwind CSS
Charting Library: React-Apex-Charts
Styling and UI Components: Material-UI
State Management: Context API

Data Fetching and caching: SWR (
SWR (stale-while-revalidate) is a React Hooks library for remote data fetching that automatically manages caching, revalidation, and state synchronization between components. i set the revalidation to every 24 hours)

Dark Mode: Next Theme
Alerts: React-Toastify

Functionality
Stock Data Analysis: Analyze stock data including highs, lows, opens, closes, sum totals, moving averages, daily returns, and RSI.
Date Range Specification: Specify the date range for analysis.
Global Access to Services: Utilize context providers for managing global states and dark mode.

Contributing infinitypaul

License
This project is licensed under the MIT License
