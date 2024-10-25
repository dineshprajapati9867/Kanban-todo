import { useState,  } from 'react';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import { DraggableEvent } from 'react-draggable';

type Task = {
  id: number;
  title: string;
  description: string;
  status: 'TODO' | 'DOING' | 'DONE';
};

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const addTask = (title: string, description: string) => {
    const newTask: Task = { id: Date.now(), title, description, status: 'TODO' };
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = (id: number, newStatus: 'TODO' | 'DOING' | 'DONE') => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, status: newStatus } : task));
  };

  const handleDragStop = (e: DraggableEvent, id: number) => {
    const offsetX = (e as MouseEvent).clientX;
    if (offsetX < window.innerWidth / 3) {
      updateTaskStatus(id, 'TODO');
    } else if (offsetX < (2 * window.innerWidth) / 3) {
      updateTaskStatus(id, 'DOING');
    } else {
      updateTaskStatus(id, 'DONE');
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map((task) => task.id === updatedTask.id ? updatedTask : task));
    handleModalClose();
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="grid lg:grid-cols-3  sm:grid-cols-1 gap-2 p-1 h-screen">
      {['TODO', 'DOING', 'DONE'].map((status) => (
        <div key={status} className="bg-gray-300 p-4 h-full">
          <h2 className="text-xl font-bold text-black mb-4">{status}</h2>
          {status === 'TODO' && <TaskForm onSubmit={addTask} />}
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onClick={handleTaskClick}
                onDragStop={handleDragStop}
              />
            ))}
        </div>
      ))}

      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full ">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <input
              type="text"
              className="w-full border p-2 mb-2"
              value={selectedTask.title}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, title: e.target.value })
              }
            />
            <textarea
              className="w-full border p-2 mb-2"
              value={selectedTask.description}
              onChange={(e) =>
                setSelectedTask({ ...selectedTask, description: e.target.value })
              }
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleModalClose}
                className="bg-gray-300 p-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => selectedTask && handleTaskUpdate(selectedTask)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
