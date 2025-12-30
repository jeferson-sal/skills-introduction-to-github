import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>📝 Aplicación de Tareas</h1>
        
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe una nueva tarea..."
            className="task-input"
          />
          <button onClick={addTask} className="add-button">
            Agregar
          </button>
        </div>

        <div className="tasks-container">
          {tasks.length === 0 ? (
            <p className="empty-message">No hay tareas. ¡Agrega una para comenzar!</p>
          ) : (
            <ul className="task-list">
              {tasks.map(task => (
                <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="task-checkbox"
                    />
                    <span className="task-text">{task.text}</span>
                  </div>
                  <button 
                    onClick={() => deleteTask(task.id)} 
                    className="delete-button"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="footer">
          <p className="task-count">
            {tasks.filter(task => !task.completed).length} de {tasks.length} tareas pendientes
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
