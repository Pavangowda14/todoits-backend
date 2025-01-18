import createConnection from "../models/db.js";

const sql=createConnection()

const Task = function (task) {
  this.content = task.content;
  this.description = task.description;
  this.due_date = task.due_date;
  this.is_completed = task.is_completed || false;
  this.project_id = task.project_id;
};

function sqlPromise(query, parameters = []) {
  return new Promise((resolve, reject) => {
    sql.query(query, parameters, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

Task.create = (task) => {
  const query =
    "INSERT INTO tasks (content, description, due_date, is_completed,project_id) values(?,?,?,?,?)";
  const para = [
    task.content,
    task.description,
    task.due_date,
    task.is_completed,
    task.project_id,
  ];
  return sqlPromise(query, para);
};

Task.findAll = (filter) => {
  let query = "SELECT * FROM tasks ";
  let para = [];
  if (filter != null) {
    query += "where 1=1 ";
    if (filter.is_completed) {
      query += "and is_completed=? ";
      para.push(filter.is_completed === "true" ? 1 : 0);
    }
    if (filter.project_id) {
      query += "and project_id=? ";
      para.push(filter.project_id);
    }
    if (filter.due_date) {
      query += "and Date(due_date)=? ";
      para.push(filter.due_date);
    }
    if (filter.created_at) {
      query += "and DATE(created_at)=? ";
      para.push(filter.created_at);
    }
  }
    const page = parseInt(filter.page, 10) || 1;
    const limit = parseInt(filter.limit, 10) || 10;
    const offset = (page - 1) * limit;
    query +="LIMIT ? OFFSET ?";
    para.push(limit);
    para.push(offset);
    
  return sqlPromise(query, para);
};

Task.delete = (id) => {
  const query = "delete from tasks where id=?";
  const para = [id];
  return sqlPromise(query, para);
};

Task.updateById = (id, task) => {
  const query =
    "update tasks set content=?, description=?, due_date=?,is_completed=?,project_id=? where id=?";
  const para = [
    task.content,
    task.description,
    task.due_date,
    task.is_completed,
    task.project_id,
    id,
  ];
  return sqlPromise(query, para);
};

Task.findById = (id) => {
  const query = "select * from tasks where id=?";
  const para = [id];
  return sqlPromise(query, para);
};

export default Task;
