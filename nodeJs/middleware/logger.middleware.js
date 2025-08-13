const fs = require("fs");
const path = require("path");

module.exports = (req, res, next) => {
  res.on("finish", () => {
    if (res.statusCode >= 400) {
      const logDir = path.join(__dirname, "../logs");
      if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
      const date = new Date().toISOString().slice(0, 10);
      const logFile = path.join(logDir, `${date}.log`);
      const log = `${new Date().toISOString()} ${req.method} ${
        req.originalUrl
      } ${res.statusCode}\n`;
      fs.appendFileSync(logFile, log);
    }
  });
  next();
};
