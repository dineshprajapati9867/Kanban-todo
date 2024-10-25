import React from 'react';
import Draggable, { DraggableEvent } from 'react-draggable';

type Task = {
  id: number;
  title: string;
  description: string;
  status: 'TODO' | 'DOING' | 'DONE';
};

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onClick: (task: Task) => void;
  onDragStop: (e: DraggableEvent, id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onClick, onDragStop }) => {
  const draggableRef = React.useRef(null);

  return (
    <Draggable onStop={(e) => onDragStop(e, task.id)} nodeRef={draggableRef}>
      <div
        ref={draggableRef}
        className={`border p-4 mb-4 ${
          task.status === 'TODO' ? 'bg-yellow-500' :
          task.status === 'DOING' ? 'bg-blue-500' : 'bg-green-500'
        } rounded-xl cursor-pointer`}
        onClick={() => onClick(task)}
      >
        <div className="flex justify-between ">
          <h3 className={`text-white text-xl ${task.status === 'DONE' ? 'line-through' : ''}`}>
            {task.title}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="bg-red-500 text-white p-2 text-xs rounded"
          >
            Delete
          </button>
        </div>
          <div className='overflow-x-auto' >
          <p className={task.status === 'DONE' ? 'line-through' : ''}>{task.description}</p>
          </div>
      </div>
    </Draggable>
  );
};

export default TaskCard;
