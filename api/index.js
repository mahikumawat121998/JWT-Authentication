const express = require("express");
const { connection } = require("./connect.js");
const userRouter = require("./route/userRouter.js");
const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.listen(4000, async () => {
  await connection();
  console.log("Server is running on port 4000");
});
