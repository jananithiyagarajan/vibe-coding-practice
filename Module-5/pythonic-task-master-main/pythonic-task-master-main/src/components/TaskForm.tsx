import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TaskFormProps {
  onSubmit: (task: { id: string; title: string; description: string }) => void;
  isLoading: boolean;
}

const TaskForm = ({ onSubmit, isLoading }: TaskFormProps) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim() || !title.trim()) return;
    onSubmit({ id: id.trim(), title: title.trim(), description: description.trim() });
    setId("");
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-5 space-y-4">
      <h2 className="font-mono text-sm font-semibold text-primary tracking-wider uppercase">
        <span className="text-muted-foreground">{'>>>'}</span> New Task
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Input
          placeholder="task_id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="font-mono text-sm bg-muted border-border placeholder:text-muted-foreground"
        />
        <Input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="font-mono text-sm bg-muted border-border placeholder:text-muted-foreground"
        />
        <Input
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="font-mono text-sm bg-muted border-border placeholder:text-muted-foreground"
        />
      </div>
      <Button type="submit" disabled={isLoading || !id.trim() || !title.trim()} className="w-full sm:w-auto gap-2">
        <Plus size={16} />
        Add Task
      </Button>
    </form>
  );
};

export default TaskForm;
