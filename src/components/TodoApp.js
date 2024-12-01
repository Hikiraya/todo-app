import React, { useState } from 'react';

   const TodoApp = () => {
       const [tasks, setTasks] = useState([]);
       const [inputValue, setInputValue] = useState('');
       const [filter, setFilter] = useState('all');
       const [sortType, setSortType] = useState(null);

       const addTask = () => {
           if (inputValue.length <= 100) {
               setTasks([...tasks, { text: inputValue, completed: false }]);
               setInputValue('');
           } else {
            alert("Максимальное число символов: 100");
           }
       };

       const toggleTask = (index) => {
           const newTasks = [...tasks];
           newTasks[index].completed = !newTasks[index].completed;
           setTasks(newTasks);
       };

       const handleInputChange = (e) => {
       const value = e.target.value;
        if (value.length <= 100) {
            setInputValue(value);
        }
       };

       const filteredTasks = tasks.filter(task => {
           if (filter === 'completed') return task.completed;
           if (filter === 'incomplete') return !task.completed;
           return true;
       });

       const handleSort = (type) => {
        setSortType(type);
       };

       const isSortActive = (type) => {
        return sortType === type;
       };

       return (
           <div className="container mt-4">
               <h1 className="text-center">Список дел</h1>
               <input 
                   type="text"
                   className="form-control mb-3"
                   value={inputValue}
                   onChange={handleInputChange}
                   placeholder="Добавить новую задачу"
                   aria-label="Добавить новую задачу"
                   style={{ position: 'relative' }}
               />
               <span style={{
                position: 'absolute',
                top: '95px',
                right: '330px',
                color: 'grey'
                }}>{inputValue.length}/100</span>
               <button className="btn btn-primary mb-3" onClick={addTask}>Добавить</button>
               <div className="list-group mb-3">
                   {filteredTasks.map((task, index) => (
                       <div className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'list-group-item-success' : ''}`} key={index} onClick={() => toggleTask(index)}>
                           {task.text}
                           <span>{task.completed ? 'Выполнено' : 'Невыполнено'}</span>
                       </div>
                   ))}
               </div>
               <div className="btn-group mb-3" role="group">
               <button className={`btn ${isSortActive('all') ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => { setFilter('all'); handleSort('all'); }}>Все</button>
               <button className={`btn ${isSortActive('completed') ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => { setFilter('completed'); handleSort('completed'); }}>Выполненные</button>
               <button className={`btn ${isSortActive('incomplete') ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => { setFilter('incomplete'); handleSort('incomplete'); }}>Невыполненные</button>
               </div>
               <div>
                   Выполненные: {tasks.filter(task => task.completed).length}, Невыполненные: {tasks.filter(task => !task.completed).length}
               </div>
           </div>
       );
   };

export default TodoApp;