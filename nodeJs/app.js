require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dbService = require("./db/dbService");
const usersRouter = require("./routes/users.router");
const cardsRouter = require("./routes/cards.router");
const logger = require("./middleware/logger.middleware");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(logger);

dbService.connect();

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
