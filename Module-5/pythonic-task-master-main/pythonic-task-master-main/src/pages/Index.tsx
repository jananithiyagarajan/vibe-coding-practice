import { useState, useEffect, useCallback } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { fetchTasks, createTask, completeTask, deleteTask, type Task } from "@/lib/api";
import { toast } from "sonner";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch {
      toast.error("Could not connect to backend. Is your FastAPI server running?");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  const handleCreate = async (task: { id: string; title: string; description: string }) => {
    try {
      setIsSubmitting(true);
      await createTask(task);
      toast.success("Task created");
      loadTasks();
    } catch {
      toast.error("Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await completeTask(id);
      toast.success("Task completed");
      loadTasks();
    } catch {
      toast.error("Failed to complete task");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      loadTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-mono font-bold text-lg">🐍</span>
            </div>
            <div>
              <h1 className="font-mono font-bold text-foreground text-lg tracking-tight">
                python<span className="text-primary">_</span>task<span className="text-primary">_</span>manager
              </h1>
              <p className="text-xs text-muted-foreground font-mono">FastAPI-powered task management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="http://127.0.0.1:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="gap-1.5 text-xs font-mono border-secondary text-secondary-foreground hover:bg-secondary/20">
                <ExternalLink size={14} />
                API Docs
              </Button>
            </a>
            <Button variant="ghost" size="sm" onClick={loadTasks} disabled={isLoading} className="text-muted-foreground hover:text-foreground">
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Stats bar */}
        <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
          <span>total<span className="text-primary">:</span> {tasks.length}</span>
          <span>completed<span className="text-primary">:</span> {completedCount}</span>
          <span>pending<span className="text-primary">:</span> {tasks.length - completedCount}</span>
        </div>

        <TaskForm onSubmit={handleCreate} isLoading={isSubmitting} />
        <TaskList
          tasks={tasks}
          onComplete={handleComplete}
          onDelete={handleDelete}
          isLoading={isLoading}
        />

        {/* Footer */}
        <div className="pt-4 border-t border-border text-center">
          <p className="font-mono text-xs text-muted-foreground">
            Connected to <span className="text-secondary">http://127.0.0.1:8000</span> •{" "}
            <a href="http://127.0.0.1:8000/docs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Interactive API Docs ↗
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
