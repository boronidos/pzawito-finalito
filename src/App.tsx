import { useState, } from 'react'
import Task, { type TaskItem } from './Task'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { title: "b_title", id: 0, done: false },
    { title: "a_title", id: 1, done: true },
    { title: "c_title", id: 2, done: false },
    { title: "d_title", id: 3, done: false },
    { title: "e_title", id: 4, done: false },
  ])

  const [filter, setFilter] = useState("all");
  const [sorter, setSorter] = useState("none");
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");

  function switchTask(id: number) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function addTask(e: React.SubmitEvent) {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newTask: TaskItem = {
      id: Date.now(),
      title: inputText,
      done: false,
    };

    setTasks(prev => [...prev, newTask]);
    setInputText("");
  }

  function removeTask(id: number) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  const filteredTasks = tasks.filter(task => {
    if (searchText != "") return task.title.includes(searchText);

    if (filter === "done") return task.done;
    if (filter === "not-done") return !task.done;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sorter === "alphabetical") {
      return a.title.localeCompare(b.title);
    }
    if (sorter === "done") {
      return Number(a.done) - Number(b.done);
    }
    return 0;
  });

  return (
    <>
      <div className='column'>
        <p>add new tasks</p>
        <form onSubmit={addTask} className='sector'>
          <input type='text' value={inputText}  onChange={(e) => setInputText(e.target.value)}  placeholder="Task title..."/>
          <button type="submit">add</button>
        </form>
      </div>

      <div className='column' style={{minWidth: "320px"}}>
        <p>tasks left: {tasks.filter(task => !task.done).length}</p>
        <div className='taskList'>
          <input type='text' value={searchText}  onChange={(e) => setSearchText(e.target.value)} style={{marginRight: "50px", marginBottom: "20px", width: "150px"}} placeholder="Task title..."/>
          { sortedTasks.length > 0 ? 
            (sortedTasks.map((task) => (
              <Task key={task.id} title={task.title}  id={task.id}  done={task.done}  onToggle={switchTask} onDelete={removeTask}/>
            ))) : 
            (<p style={{marginRight: "50px"}}>no tasks found</p>) }
        </div>
      </div>

      <div className='column'>
        <p>filters</p>
        <div className='sector'>
          <p className={filter == "all" ? "highlighted" : ""} onClick={() => setFilter("all")}>all</p>
          <p className={filter == "done" ? "highlighted" : ""} onClick={() => setFilter("done")}>done</p>
          <p className={filter == "not-done" ? "highlighted" : ""} onClick={() => setFilter("not-done")}>not done</p>
        </div>

        <p>sorting</p>
        <div className='sector'>
          <p className={sorter == "none" ? "highlighted" : ""} onClick={() => setSorter("none")}>none</p>
          <p className={sorter == "alphabetical" ? "highlighted" : ""} onClick={() => setSorter("alphabetical")}>alphabetical</p>
          <p className={sorter == "done" ? "highlighted" : ""} onClick={() => setSorter("done")}>done</p>
        </div>
      </div>
    </>
  )
}

export default App