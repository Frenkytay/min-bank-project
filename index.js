import express from "express";
import cors from "cors";
import accountRoute from "./routes/account.router.js";
import goalRoute from "./routes/goal.router.js";
import transactionRoute from "./routes/transaction.router.js";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(accountRoute);
app.use(goalRoute);
app.use(transactionRoute);

app.listen(port, () => {
  console.log("listening on port", port);
});
