import createConnection from "../models/db.js";
import logger from "../utils/logger.js";

const sql=createConnection()

const Project = function (project) {
  this.project_name = project.project_name;
  this.color = project.color;
  this.is_favorite = project.is_favorite || false;
  this.user_id = project.user_id;
};

function sqlPromise(query, parameters = []) {
  return new Promise((resolve, reject) => {
    sql.query(query, parameters, (err, res) => {
      if (err) {
        logger.error(err.message)
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

Project.create = (project) => {
  const query =
    "INSERT INTO projects (project_name, color, is_favorite,user_id) values(?,?,?,?)";
  const para = [
    project.project_name,
    project.color,
    project.is_favorite,
    project.user_id,
  ];
  return sqlPromise(query, para);
};

Project.findAll = (userId,offset, limit) => {
  const query = "SELECT * FROM projects where user_id=? LIMIT ? OFFSET ?";
const params = [userId,limit, offset];
  return sqlPromise(query,params);
};

Project.delete = (id) => {
  const query = "delete from projects where id=?";
  const params = [id];
  return sqlPromise(query, params);
};

Project.deleteAll = () => {
  const query = "delete from projects";
  return sqlPromise(query);
};

Project.updateById = (id, project) => {
  const query =
    "update projects set project_name=?, color=?, is_favorite=?, user_id=? where id=?";
  const params = [
    project.project_name,
    project.color,
    project.is_favorite || false,
    project.user_id,
    id,
  ];
  return sqlPromise(query, params);
};

Project.findById = (id) => {
  const query = "select * from projects where id=?";
  const params = [id];
  return sqlPromise(query, params);
};

export default Project;
