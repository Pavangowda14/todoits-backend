import createConnection from "../models/db.js";

const sql=createConnection()

const Comment=function(comment){
    this.content=comment.content;
    this.posted_at=comment.posted_at;
    this.comment_for=comment.comment_for;
    this.project_id=comment.project_id;
    this.task_id=comment.task_id;
}

function sqlPromise(query,para=[]){
    return new Promise((resolve,reject)=>{
        sql.query(query,para,(err,res)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

Comment.create=(comment)=>{
    const query="insert into comments(content,posted_at,comment_for,project_id,task_id) values(?,?,?,?,?)"
    const para=[comment.content,comment.posted_at,comment.comment_for,comment.project_id,comment.task_id]
    return sqlPromise(query,para)
}

Comment.findAll=()=>{
    const query="select * from comments";
    return sqlPromise(query)
}

Comment.delete = (id) => {
    const query = "delete from comments where id=?";
    const para = [id];
    return sqlPromise(query, para);
  };
  
  Comment.updateById = (id, comment) => {
    const query =
      "update comments set content=?, posted_at=?,comment_for=?,project_id=?,task_id=? where id=?";
      const para=[comment.content,comment.posted_at,comment.comment_for,comment.project_id,comment.task_id,id]
    return sqlPromise(query, para);
  };
  
  Comment.findById = (id) => {
    const query = "select * from comments where id=?";
    const para = [id];
    return sqlPromise(query, para);
  };
  
export default Comment;