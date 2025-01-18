import createConnection from "../models/db.js";

const sql=createConnection()

const User = function (user) {
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.email = user.email;
  this.password=user.password
};

function sqlPromise(query, parameters = []) {
  return new Promise((resolve, reject) => {
    sql.query(query, parameters, (err, res) => {
      if (err) {
        console.log(err);
        return reject(err);
      } else {
        return resolve(res);
      }
    });
  });
}

User.create = (user) => {
  const query =
    "INSERT INTO users (first_name,last_name, email,password) values(?,?,?,?)";
  const para = [
    user.first_name,
    user.last_name,
    user.email,
    user.password
  ];
  return sqlPromise(query, para);
};

User.findAll = () => {
  let query = "SELECT * FROM users ";
  return sqlPromise(query);
};

User.delete = (id) => {
  const query = "delete from users where id=?";
  const para = [id];
  return sqlPromise(query, para);
};

User.updateById = (id, user) => {
  const query =
    "update users set name=?, email=? where id=?";
  const para = [
    user.name,
    user.email,
    id,
  ];
  return sqlPromise(query, para);
};

User.findByEmail = (email) => {
  const query = "select * from users where email=?";
  const para = [email];
  return sqlPromise(query, para);
};

export default User;
