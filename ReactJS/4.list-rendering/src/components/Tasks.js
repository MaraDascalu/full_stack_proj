import React, { useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Finish React training", completed: false },
    { id: 2, name: "Go grocery shopping", completed: true },
    { id: 3, name: "Prepare lunch", completed: false },
    { id: 4, name: "Read", completed: true },
  ]);
  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              {task.name} - {task.completed ? "Completed" : "Pending"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tasks;
