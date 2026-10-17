# comp4537-lab5

## Setup

- Open MySQL and import clinic_query.sql into it
- Run the query to create the database and users (admin and reader)

Admins are allowed to create and insert tables into the database \
Readers are only allowed to do queries that can GET database info

## Running the backend

- In the server2 folder, open the command line prompt
- If node is not initialized for some reason, run `npm init -y && npm install mysql2`
- Run the server with `node server.js`
