import createConnection from "../models/db.js";
import { faker } from "@faker-js/faker";

const generateProjects = ( projectCount) => {
  const projects = [];
  for (let i = 0; i < projectCount; i++) {
    const project = {
      project_name: faker.company.catchPhrase(),
      color: faker.color.rgb(),
      is_favorite: faker.datatype.boolean(),
      user_id: faker.number.int({ min: 215, max: 324 }),
    };
    projects.push(project);
  }
  return projects;
};

const generateTasks = (taskCount) => {
  const tasks = [];
  for (let i = 0; i < taskCount; i++) {
    const task = {
      content: faker.lorem.sentence(),
      description: faker.lorem.sentence(),
      due_date: faker.date.anytime().toLocaleDateString("en-CA"),
      is_completed: faker.datatype.boolean(),
      project_id: faker.number.int({ min: 277, max: 1000267 }),
    };
    tasks.push(task);
  }
  return tasks;
};

const insertData = async (tableName, data, batchSize = 200000) => {
  const connection = createConnection();
  const keys = Object.keys(data[0]);
  const totalBatches = Math.ceil(data.length / batchSize);

  try {
    for (let batch = 0; batch < totalBatches; batch++) {
      const startIndex = batch * batchSize;
      const endIndex = Math.min(startIndex + batchSize, data.length);
      const batchData = data.slice(startIndex, endIndex);
      const values = batchData.map((obj) => Object.values(obj));

      const query = `INSERT INTO ${tableName} (${keys.join(", ")}) VALUES ?`;

      await new Promise((resolve, reject) => {
        connection.query(query, [values], (err, result) => {
          if (err) reject(err);
          console.log(
            `Inserted batch ${batch + 1} of ${totalBatches} into ${tableName}`
          );
          resolve(result);
        });
      });
    }
  } catch (error) {
    console.error(`Error inserting into ${tableName}:`, error.message);
    throw error;
  } finally {
    connection.end((err) => {
      if (err) console.error("Error closing connection:", err.message);
      else console.log("Database connection closed.");
    });
  }
};

const generateUsers = (userCount) => {
  const users = [];
  for (let i = 0; i < userCount; i++) {
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const email = faker.internet.email(first_name, last_name);
    const password = faker.internet.password(8);
    const user = {
      first_name,
      last_name,
      email,
      password,
    };
    users.push(user);
  }
  return users;
};

// const fakeUsers = generateUsers(100);
// const projects = generateProjects(1000000);
const tasks = generateTasks(1000000);

// insertData("users", fakeUsers);
// insertData("projects", projects);
insertData("tasks", tasks);
