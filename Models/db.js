const mongoose = require("mongoose");

//Connecting the Mongoose to Mongodb
mongoose.connect(process.env.MONOGO_DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
