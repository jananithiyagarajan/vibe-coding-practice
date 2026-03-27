from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI(title="Pythonic Task Master API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; specify origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Task(BaseModel):
    id: str
    title: str
    description: str
    completed: bool = False

class TaskCreate(BaseModel):
    title: str
    description: str

import json
import os

db_file = "tasks.json"

def load_tasks():
    if not os.path.exists(db_file):
        return [
            {
                "id": str(uuid.uuid4()),
                "title": "Welcome to Pythonic Task Master",
                "description": "Your tasks are now saved in tasks.json!",
                "completed": False
            }
        ]
    with open(db_file, "r") as f:
        return json.load(f)

def save_tasks(tasks):
    with open(db_file, "w") as f:
        json.dump(tasks, f, indent=4)

tasks_db = load_tasks()

@app.get("/tasks", response_model=List[Task])
async def get_tasks():
    return tasks_db

@app.post("/tasks", response_model=Task)
async def create_task(task: Task):
    for t in tasks_db:
        if t["id"] == task.id:
            raise HTTPException(status_code=400, detail="Task ID already exists")
    
    tasks_db.append(task.dict())
    save_tasks(tasks_db)
    return task

@app.put("/tasks/{task_id}/complete", response_model=Task)
async def complete_task(task_id: str):
    for task in tasks_db:
        if task["id"] == task_id:
            task["completed"] = True
            save_tasks(tasks_db)
            return task
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    global tasks_db
    tasks_db = [task for task in tasks_db if task["id"] != task_id]
    save_tasks(tasks_db)
    return {"message": "Task deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
