import sql from "./db.js"
import { faker } from '@faker-js/faker';

const generateProjects = (userCount = 10, projectCount = 50) => {
    const projects = [];
    for (let i = 0; i < projectCount; i++) {
      const project = {
        project_name: faker.company.catchPhrase(),
        color: faker.color.rgb(),
        is_favorite: faker.datatype.boolean(),
        user_id: faker.number.int({ min: 101, max: userCount }),
      };
      projects.push(project);
    }
    return projects;
  };
  
  // Generate Fake Data for Tasks
  const generateTasks = (projectCount = 50, taskCount = 200) => {
    const tasks = [];
    for (let i = 0; i < taskCount; i++) {
      const task = {
        content: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        due_date: faker.date.anytime().toLocaleDateString('en-CA'),
        is_completed: faker.datatype.boolean(),
        project_id: faker.number.int({ min: 51, max: projectCount }),
      };
      tasks.push(task);
    }
    return tasks;
  };
  
  // Insert Data into Database
  const insertData = (tableName, data) => {
    const keys = Object.keys(data[0]);
    const values = data.map((obj) => Object.values(obj));
  
    const query = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES ?`;
    sql.query(query, [values], (err, result) => {
      if (err) throw err;
      console.log(`Inserted ${result.affectedRows} rows into ${tableName}`);
    });
  };
  
  const generateUsers = (userCount = 50) => {
    const users = [];
    for (let i = 0; i < userCount; i++) {
      const user = {
        name: faker.person.fullName(), // Generates a realistic full name
        email: faker.internet.email(), // Generates a unique email
      };
      users.push(user);
    }
    return users;
  };
  
  // Example usage
//   const fakeUsers = generateUsers(100); 
//   const projects = generateProjects(200, 200);
  const tasks = generateTasks(250, 1000);
  
//   insertData('users', fakeUsers);
//   insertData('projects', projects);
  insertData('tasks', tasks);
  
  // Close Database Connection
  sql.end((err) => {
    if (err) throw err;
    console.log('Database connection closed');
  });