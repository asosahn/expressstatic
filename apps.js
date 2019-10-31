const express = require('express');
const app = express();

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
);

const port = process.env.PORT || 8080;

app.listen(port, () =>
    console.log(`App is listening on port ${port}.`)
);