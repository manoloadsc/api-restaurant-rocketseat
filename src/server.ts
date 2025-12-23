import express from "express";
import { router } from "./routes";
import { errorHandling } from "./middleware/error-handling";

const app = express();
const port = 3333;
app.use(express.json());
app.use(router);
app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
