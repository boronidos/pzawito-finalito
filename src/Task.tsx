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
}

export default function Task({ title, id, done, onToggle, onDelete }: TaskProps) {
  return (
    <div className='taskHolder'>
        <div className='task' onClick={() => onToggle(id)}>
            {title}
            <div className='check'>{done ? "v" : ""}</div>
        </div>
        <p className='delete' onClick={() => onDelete(id)}>x</p>
    </div>
  );
}