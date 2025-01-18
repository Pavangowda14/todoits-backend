import express, { json } from "express";
import projectRouter from "./app/routes/project.routes.js";
import taskRouter from "./app/routes/task.routes.js";
import userRouter from "./app/routes/user.routes.js"
import commentRouter from "./app/routes/comment.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

var corsOptions = {
  origin: ["http://localhost:8100","http://localhost:5173"],
  credentials:true
};

app.use(cors(corsOptions));


app.use("/todo/api/task", taskRouter);
app.use("/todo/api/project", projectRouter);
app.use("/todo/api/user", userRouter);
app.use("/todo/api/comment", commentRouter);

const port = 8000;
app.listen(port, () => {
  console.log("server started");
});
