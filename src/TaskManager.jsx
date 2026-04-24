import { Component } from "react";

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: sans-serif; background: #f0f2f5; color: #333; }

  nav {
    background: #2563eb;
    color: white;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav h1 { font-size: 1.2rem; }
  nav span { font-size: 0.85rem; opacity: 0.8; }

  header {
    text-align: center;
    padding: 2rem 1rem 1.5rem;
  }
  header h2 { font-size: 1.6rem; margin-bottom: 0.3rem; }
  header p { color: #666; font-size: 0.9rem; }

  main { max-width: 600px; margin: 0 auto; padding: 0 1rem 3rem; }

  .add-box {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .add-box input[type="text"] {
    flex: 1;
    min-width: 140px;
    padding: 0.5rem 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.9rem;
    outline: none;
  }
  .add-box input[type="text"]:focus { border-color: #2563eb; }
  .add-box input[type="time"] {
    padding: 0.5rem 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.9rem;
    outline: none;
    color: #333;
  }
  .add-box input[type="time"]:focus { border-color: #2563eb; }
  .add-box button {
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.9rem;
  }
  .add-box button:hover { background: #1d4ed8; }

  /* Pending task card */
  .task-card {
    background: white;
    border-radius: 8px;
    padding: 0.85rem 1rem;
    margin-bottom: 0.6rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07);
    border-left: 4px solid #2563eb;
  }

  /* Done task card — visually distinct */
  .task-card.done {
    background: #f0fdf4;
    border-left: 4px solid #16a34a;
    box-shadow: none;
    opacity: 0.85;
  }

  .task-card input[type="checkbox"] { width: 16px; height: 16px; cursor: pointer; flex-shrink: 0; }

  .task-body { flex: 1; display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }

  .task-text { font-size: 0.93rem; }
  .task-card.done .task-text {
    text-decoration: line-through;
    color: #888;
  }

  .task-time {
    font-size: 0.75rem;
    color: #888;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  .task-card.done .task-time { color: #16a34a; }

  .done-badge {
    font-size: 0.7rem;
    background: #dcfce7;
    color: #16a34a;
    border-radius: 999px;
    padding: 0.1rem 0.5rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .task-card button {
    background: none;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    font-size: 0.8rem;
    color: #e53e3e;
    flex-shrink: 0;
  }
  .task-card button:hover { background: #fff5f5; }

  .empty { text-align: center; color: #aaa; padding: 2rem; font-size: 0.9rem; }
`;

// Functional Components
function NavBar() {
  return (
    <nav>
      <h1>Task Manager</h1>
      <span>Stay organized</span>
    </nav>
  );
}

function Header({ total, done }) {
  return (
    <header>
      <h2>My Tasks</h2>
      <p>{done} of {total} completed</p>
    </header>
  );
}

function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={`task-card ${task.done ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <div className="task-body">
        <span className="task-text">{task.text}</span>
        {task.time && (
          <span className="task-time">
            🕐 {task.time}
          </span>
        )}
      </div>
      {task.done && <span className="done-badge">✓ Done</span>}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}

// Class Component
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { id: 1, text: "Buy groceries", time: "09:00", done: false },
        { id: 2, text: "Read a book",   time: "11:30", done: true  },
        { id: 3, text: "Go for a walk", time: "17:00", done: false },
      ],
      input: "",
      time: "",
      nextId: 4,
    };
  }

  handleAdd = () => {
    const text = this.state.input.trim();
    if (!text) return;
    this.setState(prev => ({
      tasks: [...prev.tasks, { id: prev.nextId, text, time: prev.time, done: false }],
      input: "",
      time: "",
      nextId: prev.nextId + 1,
    }));
  };

  handleToggle = (id) => {
    this.setState(prev => ({
      tasks: prev.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t),
    }));
  };

  handleDelete = (id) => {
    this.setState(prev => ({ tasks: prev.tasks.filter(t => t.id !== id) }));
  };

  render() {
    const { tasks, input, time } = this.state;
    const done = tasks.filter(t => t.done).length;

    return (
      <>
        <style>{styles}</style>
        <NavBar />
        <Header total={tasks.length} done={done} />
        <main>
          <div className="add-box">
            <input
              type="text"
              placeholder="Add a new task..."
              value={input}
              onChange={e => this.setState({ input: e.target.value })}
              onKeyDown={e => e.key === "Enter" && this.handleAdd()}
            />
            <input
              type="time"
              value={time}
              onChange={e => this.setState({ time: e.target.value })}
            />
            <button onClick={this.handleAdd}>Add</button>
          </div>

          {tasks.length === 0
            ? <div className="empty">No tasks yet. Add one above!</div>
            : tasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={this.handleToggle}
                  onDelete={this.handleDelete}
                />
              ))
          }
        </main>
      </>
    );
  }
}

export default TaskList;
