import sql from "./db.js";

// sql.query(
//   `CREATE TABLE users(
//       id INT PRIMARY KEY AUTO_INCREMENT,
//       name VARCHAR(255),
//       email VARCHAR(30) UNIQUE
//     )`,
//   (err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("Created users table");
//   }
// );

// sql.query(
//   `CREATE TABLE projects (
//        id INT PRIMARY KEY AUTO_INCREMENT,
//        project_name VARCHAR(255),
//        color VARCHAR(233),
//        is_favorite BOOLEAN,
//        user_id INT,
//        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
//     )`,
//   (err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("Created projects table");
//   }
// );

// sql.query(
//   `CREATE TABLE tasks (
//         id INT PRIMARY KEY AUTO_INCREMENT,
//         content VARCHAR(255),
//         description VARCHAR(255),
//         due_date DATE,
//         is_completed BOOLEAN,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         project_id INT,
//         FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
//     )`,
//   (err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("Created tasks table");
//   }
// );

sql.query(
  `CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    posted_at DATE NOT NULL,
    comment_for ENUM('project', 'task') NOT NULL, 
    project_id INT DEFAULT NULL,
    task_id INT DEFAULT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    CHECK (
        (comment_for = 'project' AND project_id IS NOT NULL AND task_id IS NULL) OR
        (comment_for = 'task' AND task_id IS NOT NULL AND project_id IS NULL)
    )
);

`,
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Created comments table");
  }
);

sql.end((err) => {
  if (err) throw err;
  console.log("Database connection closed");
});
