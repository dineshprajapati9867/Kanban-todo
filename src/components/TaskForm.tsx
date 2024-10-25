import { useState } from 'react';

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.length === 0 || description.length === 0) {
      alert('Please fill in both the title and description.');
      return;
    }
    onSubmit(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        className="border p-2 mb-2 w-full rounded-md"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full rounded-md"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="bg-[#61616a] text-white rounded-md border-white p-2 mt-2 w-full">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
