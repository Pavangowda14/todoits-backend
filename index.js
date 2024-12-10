import express, { json } from "express";
import projectRouter from "./app/routes/project.routes.js";
import taskRouter from "./app/routes/task.routes.js";

const app=express()

app.use(json())
app.use(express.urlencoded({extended:true}))

app.use("/todo/api/task",taskRouter);
app.use("/todo/api/project",projectRouter);

const port=8000;
app.listen(port,()=>{
    console.log("server started")
})