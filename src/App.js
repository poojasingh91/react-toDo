import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isInputVisible, setInputVisible] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);

  const toggleInput = () => {
    setInputVisible(!isInputVisible);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
      setInputVisible(false);
    }
  };

  const toggleTask = (index) => {
    if (!completedTasks.includes(index)) {
      setCompletedTasks([...completedTasks, index]);
    } else {
      const updatedCompletedTasks = completedTasks.filter((i) => i !== index);
      setCompletedTasks(updatedCompletedTasks);
    }
  };

  // Function to get the current day of the week
  const getCurrentDayOfWeek = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date();
    return daysOfWeek[currentDate.getDay()];
  };

  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'short' });
  const year = currentDate.getFullYear();
  const currentDayOfWeek = getCurrentDayOfWeek();

  return (
    <div className="App">
      <header>
        <div className='first'>
        <div className="header-column">
          <h1>{dayOfMonth}</h1>
        </div>
        <div className="header-column1">
          <p className="month">{month}</p>
          <p className="year">{year}</p>
        </div>
        </div>
        <div className="header-column">
          <h1 className="day-of-week">{currentDayOfWeek}</h1>
        </div>
      </header>

      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className={`task ${completedTasks.includes(index) ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={completedTasks.includes(index)}
              onChange={() => toggleTask(index)}
              className="checkbox"
            />
            {task}
          </div>
        ))}
      </div>

      {isInputVisible ? (
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter the task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>OK</button>
        </div>
      ) : (
        <button onClick={toggleInput} className="add-button">
          +
        </button>
      )}
      </div>
  );
}

export default App;

