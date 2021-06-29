Before starting the project, you need to upload the database dump to your server. The t-shirts database file is located in the database folder at the root of the project.
#

Please add your database login and password in .env (DB_PASS and DB_PASS).
#

To start in production mode, you need to start the server and client with the npm start command from the root of the project. The project will be launched at the address http: // localhost: 4000 /
#
To run in development mode, replace NODE_ENV = production with NODE_ENV = development in the .env file. The launch is performed using the npm run dev command
