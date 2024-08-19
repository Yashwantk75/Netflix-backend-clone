const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const password = process.env.PASSWORD;
const url = `mongodb+srv://yashwant4622:${password}@cluster0.6jtsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(url);

mongoose
  .connect(
    url,
    // "mongodb+srv://yashwant4622:9qagddwyV9UFPz1T@cluster0.6jtsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    // "mongodb://127.0.0.1:27017/netflix",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    }
  )
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err, "error in conection to DB");
  });

app.use("/api/user", userRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
