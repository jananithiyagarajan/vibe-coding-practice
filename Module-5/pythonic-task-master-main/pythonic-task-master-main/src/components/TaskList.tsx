import { Check, Trash2, Circle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Task } from "@/lib/api";

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const TaskList = ({ tasks, onComplete, onDelete, isLoading }: TaskListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-12 text-center">
        <p className="font-mono text-muted-foreground text-sm">
          <span className="text-primary">{'>>>'}</span> No tasks found. Create one above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 ${
            task.completed ? "opacity-60" : ""
          }`}
        >
          <div className="shrink-0">
            {task.completed ? (
              <CheckCircle2 size={20} className="text-success" />
            ) : (
              <Circle size={20} className="text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs text-muted-foreground">#{task.id}</span>
              <span className={`font-semibold text-sm ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {task.title}
              </span>
            </div>
            {task.description && (
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{task.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {!task.completed && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onComplete(task.id)}
                className="gap-1 text-xs border-success/30 text-success hover:bg-success/10 hover:text-success"
              >
                <Check size={14} />
                Done
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(task.id)}
              className="gap-1 text-xs border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
