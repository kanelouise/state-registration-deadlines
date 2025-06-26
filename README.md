# Voter Registration Lookup App

This is a full-stack web app that displays voter registration deadlines by state. It includes:

* A CSV import into a PostgreSQL database using Sequelize
* A REST API built with Next.js API routes
* A searchable, sortable frontend UI built with React and Tailwind CSS
* Deployment to Vercel and a cloud PostgreSQL database via Railway

## Features

* Displays voter registration deadlines for all 50 U.S. states
* Users can search for a state by name
* Sort deadlines by in-person, mail, or online registration dates
* Link to each state's online registration site if available

## Live Demo

Access the deployed app at:
[https://state-registration-deadlines.vercel.app/](https://state-registration-deadlines.vercel.app/)

## Getting Started Locally

### 1. Clone the Repo

```bash
git clone https://github.com/kanelouise/state-registration-deadlines.git
cd state-registration-deadlines
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file with:

```
DATABASE_URL=your_local_or_cloud_postgres_url
```

If you're using Railway, copy the `PostgreSQL` connection string from your project dashboard.

### 4. Seed the Database

Make sure you have a Postgres database running locally or in the cloud.

* To seed a **local** database:

  ```bash
  node scripts/create-local-db.js
  ```

* To seed a **cloud (Railway)** database:

  ```bash
  node scripts/create-cloud-db.js
  ```

### 5. Run the App Locally

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Running Tests

```bash
npm run test
```

This will test the `/api/states` endpoint using Supertest.

## Project Structure

```
voter_registration_deadlines.csv        # Source data
└── src
    ├── app
    │   ├── layout.tsx                   # Root layout with Tailwind import
    │   ├── page.tsx                     # Main UI page
    │   └── api
    │       └── states
    │           ├── route.js             # API endpoint to serve state data
    │           └── api.test.js          # Tests for the states API
    ├── styles
    │   └── tailwind.css                 # Tailwind CSS entry point
    └── lib
        ├── db.js                        # Sequelize model and config
        └── db-client.js                 # PostgreSQL client connection
```

## Tech Stack

* Next.js (App Router)
* React
* Tailwind CSS
* PostgreSQL
* Sequelize
* Railway (DB hosting)
* Vercel (Deployment)
