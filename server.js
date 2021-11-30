const express = require('express');
const http = require('http');
const userRouter = require("./routes/users.js");
const indexRouter = require("./routes/index.js");

const app = express();

const port = '3000';
app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);
app.use("/users", userRouter);

app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist'
    })
});

const server = http.createServer(app);
server.listen(port);
server.on("listening", () => {
    console.log(`Listening on port:: http://localhost:${port}/`)
});
