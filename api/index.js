const express = require("express");
const { connection } = require("./connect.js");
const userRouter = require("./route/userRouter.js");
const swaggerDocs = require("./swagger");
const app = express();
app.use(express.json());
swaggerDocs(app);
app.use("/user", userRouter);
app.get("",(req,res)=>{
res.status(201).json({name:"Mahesh"})
})
app.listen(4000, async () => {
  await connection();
  console.log("Server is running on port 4000");
});
