const express = require("express");
const app = express();
const router = require("./routes/route");
const bodyparser = require("body-parser");

app.use(bodyparser.json());

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://project2:zE31ye3l4$SOuN@cluster0.ouxmp.mongodb.net/group90Database?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

app.use("/functionup", router);

app.listen(process.env.PORT || 3000, () => {
  console.log("express running on PORT:", process.env.PORT || 3000);
});
