module.exports = (app) => {
  require("./src/routes/user")(app);
  require("./src/routes/message")(app);
  require("./src/routes/room")(app);
};
