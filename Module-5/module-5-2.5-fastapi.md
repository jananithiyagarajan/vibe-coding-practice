# Module 5.2.5: CRUD Operations with FastAPI (Python)

### Why (in simple terms)

In the previous module, we used **Node.js and Express** to build a CRUD API. However, in the AI world, **Python** is the king! 

**FastAPI** is a modern, fast (high-performance), web framework for building APIs with Python. It's becoming the favorite for AI developers because:
- ✅ **Speed**: It's incredibly fast (almost as fast as Node.js).
- ✅ **Easy to learn**: Uses standard Python types.
- ✅ **Auto-Documentation**: It automatically builds a website where you can test your API (Swagger UI).
- ✅ **AI Ready**: Most AI libraries (like LangChain or OpenAI) are built for Python first.

### What you'll build

You'll build a "Task Manager API" using FastAPI that performs all CRUD operations:
1. **Create**: Add a new task.
2. **Read**: View all tasks or a specific task.
3. **Update**: Change a task's status.
4. **Delete**: Remove a task.

### Quick start for beginners

**Follow these steps exactly to set up your Python environment.**

## Step 0: Create a new folder

1. Create a folder named `tasks-fastapi` on your desktop.
2. Open it in VS Code (File → Open Folder).

## Step 1: Set up Python Virtual Environment

In VS Code terminal (View → Terminal), type:

```bash
# Create a virtual environment (keeps your project clean)
python3 -m venv venv

# Activate it (Linux/Mac)
source venv/bin/activate

# Activate it (Windows)
# venv\Scripts\activate
```

## Step 2: Install FastAPI

In terminal, type:

```bash
pip install fastapi uvicorn
```

## Step 3: Create the Task API

Create a file named `main.py` and paste this:

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# 1. Define our Task model (what a task looks like)
class Task(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    completed: bool = False

# 2. In-memory database (simple list)
tasks = [
    {"id": 1, "title": "Learn FastAPI", "description": "Build a CRUD API", "completed": False}
]

@app.get("/")
def read_root():
    return {"message": "Welcome to my FastAPI Task Manager!"}

# READ: Get all tasks
@app.get("/tasks", response_model=List[Task])
def get_tasks():
    return tasks

# CREATE: Add a new task
@app.post("/tasks", response_model=Task)
def create_task(task: Task):
    # Check if ID already exists
    if any(t["id"] == task.id for t in tasks):
        raise HTTPException(status_code=400, detail="Task ID already exists")
    
    tasks.append(task.dict())
    return task

# UPDATE: Change a task
@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, updated_task: Task):
    for index, task in enumerate(tasks):
        if task["id"] == task_id:
            tasks[index] = updated_task.dict()
            return updated_task
    
    raise HTTPException(status_code=404, detail="Task not found")

# DELETE: Remove a task
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    for index, task in enumerate(tasks):
        if task["id"] == task_id:
            tasks.pop(index)
            return {"message": "Task deleted successfully"}
    
    raise HTTPException(status_code=404, detail="Task not found")
```

## Step 4: Run the server

In terminal, type:

```bash
uvicorn main:app --reload
```

You should see: `INFO: Uvicorn running on http://127.0.0.1:8000`

---

## Let's test it (The Easy Way!)

### Step 5: Use Auto-Documentation (Swagger UI)

FastAPI has a secret weapon! Open your browser and visit:
👉 **http://127.0.0.1:8000/docs**

1. You'll see a beautiful list of all your endpoints.
2. Click on **GET /tasks**, then click **Try it out** and **Execute**.
3. You'll see your list of tasks!
4. Try **POST /tasks** to add a new task.

---

## Testing with Terminal (Optional)

### 1) Get all tasks
```bash
curl http://127.0.0.1:8000/tasks
```

### 2) Create a new task
```bash
curl -X POST http://127.0.0.1:8000/tasks \
  -H "Content-Type: application/json" \
  -d '{"id": 2, "title": "Practice Vibe Coding", "description": "Build cool things", "completed": false}'
```

---

### ✅ Success Checklist

- [ ] Virtual environment is activated.
- [ ] `fastapi` and `uvicorn` are installed.
- [ ] `uvicorn main:app --reload` runs without errors.
- [ ] You can access the auto-docs at `/docs`.
- [ ] You can Create, Read, Update, and Delete tasks.

### 🆘 Common Problems

**Problem**: "Command not found: uvicorn"
- **Fix**: Make sure you activated your virtual environment and ran `pip install uvicorn`.

**Problem**: "Address already in use"
- **Fix**: Another app is using port 8000. Try `uvicorn main:app --reload --port 8001`.

**Problem**: "Task ID already exists"
- **Fix**: You're trying to add a task with an ID that is already in the list. Change the ID number.

---

## 🎨 Lovable AI Prompt (copy/paste this)

```text
Build a "Python Task Manager" UI for my FastAPI backend.

Requirements:
- Modern React/Vue interface.
- Backend: http://127.0.0.1:8000
- Use fetch() to connect to the FastAPI endpoints.

Key features:
- Display all tasks in a clean list.
- A form to add new tasks (ID, Title, Description).
- A "Complete" button that updates the task status.
- A "Delete" button to remove tasks.
- Show a "Pythonic" theme (yellow and blue colors, snake icons).
- Display a link to the "Interactive API Docs" (http://127.0.0.1:8000/docs).

Make it look like a professional developer's tool!
```
