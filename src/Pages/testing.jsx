import React, { useState } from 'react';
import useDebounce from '../Hooks/useDebounce';

function Todolist() {
  // states
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');

  // debounce
  const debouncedSearch = useDebounce(search, 500);

  // add todo
  const addTodo = () => {
    if (task.trim() === '') return;

    setTodos([...todos, task]);
    setTask('');
  };

  // delete todo
  const deleteTodo = (indexValue) => {
    const updatedTodos = todos.filter((_, index) => index !== indexValue);

    setTodos(updatedTodos);
  };

  // event delegation handler (IMPORTANT)
  const handleDelete = (e) => {
    const index = e.target.getAttribute('data-index');

    if (index !== null) {
      deleteTodo(Number(index));
    }
  };

  // filtered todos
  const filteredTodos = todos.filter((todo) => todo.toLowerCase().includes(debouncedSearch.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h1 className="text-3xl font-bold text-center mb-5">Todo App</h1>

        {/* Add Todo */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 border border-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Add
          </button>
        </div>

        {/* Search */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search Todo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Todo List (EVENT DELEGATION HERE) */}
        <div className="mt-5 space-y-3">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo, index) => (
              <div
                key={index}
                onClick={handleDelete}
                className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-md"
              >
                <p>{todo}</p>

                <button data-index={index} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No Todos Found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todolist;
