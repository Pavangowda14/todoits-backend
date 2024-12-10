import sql from "./db.js";

const Project = function (project) {
  this.pname = project.pname;
  this.color = project.color;
  this.is_favorite = project.is_favorite;
};

Project.create = (project, result) => {
  sql.query("INSERT INTO projects SET ?", project, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log({ id: res.insertId, ...project });
    result(null, { id: res.insertId, ...project });
  });
};

Project.findAll = (name, result) => {
  let query = "select * from projects ";
  if (name) {
    query += `where id=${name}`;
  }

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

Project.delete = (id, result) => {
  sql.query("delete from projects where id=?", id, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log("row deleted", res);
    result(null, res);
  });
};

Project.deleteAll=(result)=>{
  sql.query("delete from projects",(err,res)=>{
    if(err){
      console.log(err)
      result(err,null)
      return
    }
    console.log(res)
    result(null,res);
  })
}

Project.updateById = (id, project, result) => {
  console.log(project);
  sql.query(
    "update projects set pname=?, color=?, is_favorite=? where id=?",
    [project.pname, project.color, project.is_favorite || false, id],
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

Project.findById=(id,result)=>{
  sql.query(`select * from projects where id=${id}`,(err,res)=>{
      if(err){
          console.log(err);
          result(err,null)
          return
      }
      console.log(res)
      result(null,res)
  })
}

Project.findByName = (name, result) => {
  const query = "SELECT * FROM projects WHERE pname = ?";
  sql.query(query, [name], (err, res) => {
      if (err) {
          console.log("Error while finding project by name:", err);
          result(err, null);
          return;
      }

      if (res.length) {
          console.log("Project found:", res[0]);
          result(null, res[0]);
      } else {
          result(null, null); 
      }
  });
};
export default Project;