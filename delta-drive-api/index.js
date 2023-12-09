const express = require("express");
const dotenv = require("dotenv");
const { sequelize } = require("./db/models");
const { configureRoutes } = require("./api/routes");
const { configureMiddlewares } = require("./api/middlewares");
const http = require('http');
const {configureWS} = require("./api/ws");
const socketIO = require('socket.io');
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const port = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io      = socketIO(server);

configureMiddlewares(app);
configureRoutes(app);
io.use(cors({ origin: 'http://localhost:3000'}));
configureWS(io);

app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});

const connectDatabase = async () => {
    console.info("Checking database connection...");

    try {
        await sequelize.authenticate();
    } catch (e) {
        console.error("Database connection failed", e);
        process.exit(1);
    }
};

(async () => {
    await connectDatabase();

    server.listen(port, () => {
        console.log(`server is listening on port ${port}...`);
    });
})();