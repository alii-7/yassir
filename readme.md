<h1>Yassir Task</h1>

<h3>Getting Started</h3>

1. Run npm install
2. Add valid AWS ACCESS_KEY in .env file
3. Add valid AWS SECRET_ACCESS_KEY in .env file
4. Run node app.js

<br/>

<h3>Built With</h3>
Node JS with express server with default port 3000.
Dev Env writes to file
Prod Env writes to AWS Dynamo DB

<br/>

<h3>Description</h3>

Routes:

1. Healthy Endpoint - http://localhost:3000/v1
2. Air Quality Endpoint - http://localhost:3000/v1/air-quality?latitude={lat}&longitude={long}
3. Get Paris's most polluted date/time - http://localhost:3000/v1/most-polluted
   The greate the AQI value the more pollution.

Cron Jobs:

1. Save Pollution Info every 1 hour (because API is updated every hour as per their documentation)

<br/>

<h3>File Strucure</h3>

1. consts includes all app constants
2. app entry file of the server
3. routes includes the 3 endpoints
4. utils includes all utility functions reusable throughout the app
5. Data.json is the file to store if the ENV constant is dev
