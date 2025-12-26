import express from "express";
import { routes } from "./routes";
import { errorHandling } from "./middleware/error-handling";

const app = express();
const port = 3333;
app.use(express.json());
app.use(routes);
app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
