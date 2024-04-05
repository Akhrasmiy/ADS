const express = require('express');
const db = require('./db');
const config = require('./shared/config');
const handleError = require('./shared/errors/handle');
const usersRoute = require('./modules/users/_api');
const statusRoute = require('./modules/status/_api');
const adsRoute = require('./modules/ads/_api');
const adsvsuserRoute = require('./modules/adsvsuser/_api');
const responseRoute = require('./modules/response/_api');
const responsestatusRoute = require('./modules/response_status/_api');
const cors = require('cors');
const app = express();
app.use(cors("*"));
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(express.urlencoded({limit:"100000mb", extended: true }))

app.use("/users",usersRoute);
app.use("/response",responseRoute);
app.use("/responseStatus",responsestatusRoute);
app.use("/seeads",adsvsuserRoute);
app.use("/status",statusRoute);
app.use("/ads",adsRoute);
app.use(express.json({ limit: "1000mb" }));

app.use(handleError);
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 * 1024 * 1024 },
  })
);
db();
app.listen(config.port, () => {
  console.log(`Server ${config.port}-portda ishlayapti.`);
});
