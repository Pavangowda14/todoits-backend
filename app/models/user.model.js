import sql from "./db.js";

const User = function (user) {
  this.name = user.name;
  this.email = user.email;
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

User.create = (user) => {
  const query =
    "INSERT INTO users (name, email) values(?,?)";
  const para = [
    user.name,
    user.email,
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

User.findById = (id) => {
  const query = "select * from users where id=?";
  const para = [id];
  return sqlPromise(query, para);
};

export default User;
