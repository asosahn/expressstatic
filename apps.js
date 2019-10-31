const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const pino = require('express-pino-logger')();
app.use(bodyParser.urlencoded({ extended: false }));
if (process.env.NODE_ENV === "DEV") {
  app.use(pino);
}
app.use(
  express.static(("../doktoFront/build"), {
    maxAge: 0,
    etag: false,
    setHeaders: function(res, path, stat) {
      res.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
      res.set("Expires", "-1");
      res.set("Pragma", "no-cache");
    }
  })
)

const path_ = path.join(`${__dirname}`, '../doktofront/build', 'index.html');

app.get('*', (req, res) => {
  res.sendFile(path_);
})

const port = process.env.PORT || 8080;

app.listen(port, () =>
    console.log(`App is listening on port ${port}.`)
);