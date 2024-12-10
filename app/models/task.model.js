import sql from "./db.js";

const Task=function (task){
    this.content=task.content;
    this.description=task.description;
    this.due_date=task.due_date;
    this.is_completed=task.is_completed || false;
    this.projectid=task.projectid;
}

Task.create = (task, result) => {
  console.group(task)
    sql.query("INSERT INTO tasks SET ?", task, (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }
      console.log({ id: res.insertId, ...task });
      result(null, { id: res.insertId, ...task });
    });
  };
  
  Task.findAll = (result) => {
    let query = "select * from tasks ";
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }
      console.log(res);
      result(null, res);
    });
  };
  
  Task.delete = (id, result) => {
    sql.query("delete from tasks where id=?", id, (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }
      console.log("row deleted", res);
      result(null, res);
    });
  };
  
  Task.updateById = (id, task, result) => {
    sql.query(
      "update tasks set content=?, description=?, due_date=?,is_completed=? where id=?",
      [task.content, task.description, task.due_date, task.is_completed || false, id],
      (err, res) => {
        if (err) {
          console.log(err);
          result(err, null);
          return;
        }
        console.log(res);
        result(null, res);
      }
    );
  };
  
  Task.findByProjectId=(id,result)=>{
    sql.query(`select * from tasks where projectid=${id}`,(err,res)=>{
        if(err){
            console.log(err);
            result(err,null)
            return
        }
        console.log(res)
        result(null,res)
    })
  }

  Task.findById=(id,result)=>{
    sql.query(`select * from tasks where id=${id}`,(err,res)=>{
        if(err){
            console.log(err);
            result(err,null)
            return
        }
        console.log(res)
        result(null,res)
    })
  }

  export default Task;
  