import sql from "./db.js";

const Project = function (project) {
  this.project_name = project.project_name;
  this.color = project.color;
  this.is_favorite = project.is_favorite || false;
  this.user_id=project.user_id;
};

function sqlPromise(query,parameters=[]){
  return new Promise((resolve,reject)=>{
    sql.query(query,parameters,(err,res)=>{
      if(err){
        console.log(err)
        reject(err)
      }
      else{
        resolve(res)
      }
    })
  })
}

Project.create = (project) => {
  const query="INSERT INTO projects (project_name, color, is_favorite,user_id) values(?,?,?,?)"
  const para=[project.project_name,project.color,project.is_favorite,project.user_id]
  return sqlPromise(query,para)
};

Project.findAll = (filter) => {
  const query = "select * from projects ";
  console.log(filter)
  return sqlPromise(query)
};

Project.delete = (id) => {
  const query="delete from projects where id=?"
  const para=[id]
  return sqlPromise(query,para)
};

Project.deleteAll=()=>{
  const query="delete from projects"
  return sqlPromise(query)
}

Project.updateById = (id, project) => {
  const query="update projects set project_name=?, color=?, is_favorite=?, user_id=? where id=?"
  const para=[project.pname, project.color, project.is_favorite || false, project.user_id,id]
  return sqlPromise(query,para)
};

Project.findById=(id)=>{
  const query="select * from projects where id=?"
  const para=[id]
  return sqlPromise(query,para)
}

export default Project;