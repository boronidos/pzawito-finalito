import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    {title: "b_title", id: 0, done: false, },
    {title: "a_title", id: 1, done: true, },
    {title: "c_title", id: 2, done: false, },
    {title: "d_title", id: 3, done: false, },
    {title: "e_title", id: 4, done: false, },
  ])

  const [filter, setFilter] = useState("all");
  const [sorter, setSorter] = useState("none");

  function switchTask(id : number) {
    const newTasks = tasks.map(task => task);
    newTasks[id].done = !newTasks[id].done;

    setTasks(newTasks);
  }

  function addTask(title : string) {
    // add task here
  }

  var filteredTasks = tasks;

  if (filter == "done") {
    filteredTasks = tasks.filter(task => task.done);
  }
  else if (filter == "not-done") {
    filteredTasks = tasks.filter(task => !task.done)
  }

  var sortedTasks = filteredTasks;

  if (sorter == "alphabetical") {
    sortedTasks = filteredTasks.sort((a, b) => 
      a.title.localeCompare(b.title)
    );
  }
  else if (sorter == "done") {
    sortedTasks = filteredTasks.sort((a, b) => Number(a.done) - Number(b.done));
  }

  return (
    <>
      <div className='column'>
        <p>add new tasks</p>
        <div className='sector'>
          <input type='text'></input>
          <button>add</button>
        </div>
      </div>
      <div className='column'>
        <p>tasks left: {filteredTasks.filter(task => !task.done).length}</p>
        <div className='taskList'>
          {filteredTasks.map((task, id) => 
            <Task key={id} title={task.title} id={id} done={task.done}></Task>
          )}
        </div>
        </div>
        <div className='column'>
        <p>filters</p>
        <div className='sector'>
          <p onClick={() => setFilter("all")}>all</p>
          <p onClick={() => setFilter("done")}>done</p>
          <p onClick={() => setFilter("not-done")}>not done</p>
        </div>

        <p>sorting</p>
        <div className='sector'>
          <p onClick={() => setSorter("none")}>none</p>
          <p onClick={() => setSorter("alphabetical")}>alphabetical</p>
          <p onClick={() => setSorter("done")}>done</p>
        </div>
      </div>
    </>
  )

  interface taskProps {
    title: string,
    id: number,
    done: boolean
  }

  function Task(props : taskProps) {
    return (
      <div className='task' onClick={() => switchTask(props.id)}>{props.title}<div className='check'>{ props.done ? "v" : ""}</div></div>
    );
  }
}

export default App
