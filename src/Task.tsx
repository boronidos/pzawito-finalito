import { useState, type FormEvent } from 'react';
import './App.css';

export interface TaskItem {
  id: number;
  title: string;
  done: boolean;
}

export interface TaskProps {
  title: string;
  id: number;
  done: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, name: string) => void;
}

export default function Task({ title, id, done, onToggle, onDelete, onEdit }: TaskProps) {
    const [editing, setEditing] = useState(false);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newTitle = formData.get('newTitle')?.toString();

    if (newTitle == undefined) console.log("AAAAAAAAAAAA");
    else {
      console.log(id);
      onEdit(id, newTitle); 
      setEditing(!editing);
    }
  }
  
  return (
    <div className='taskHolder'>
        <div className='task' onClick={() => onToggle(id)}>
            {!editing ? title : (<form onSubmit={handleSubmit}><input type='text' name='newTitle'></input></form>)}
            <div className='check'>{done ? "v" : ""}</div>
        </div>
        <p className='delete' onClick={() => onDelete(id)}>x</p>
        <p className='edit' onClick={() => setEditing(!editing)}>e</p>
    </div>
  );
}