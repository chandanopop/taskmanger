# Task Manager App

A simple Task Manager web application built with **React** and **Vite**.

## Features

- Add tasks with a name and time
- Mark tasks as completed
- Delete tasks
- Completed tasks appear visually different (green styling + strikethrough)
- Live count of completed vs total tasks

## Tech Used

- React (Functional Components + Class Components)
- Vite
- Plain CSS

## React Concepts Covered

| Concept | Where Used |
|---|---|
| Functional Components | NavBar, Header, TaskCard |
| Class Components | TaskList (main logic) |
| State | Task list, input field, time field |
| Props | Passing tasks and handlers to TaskCard |
| Event Handling | Add, delete, toggle complete |

## Getting Started

### 1. Clone the repo

```
git clone https://github.com/chandanopop/taskmanger.git
cd taskmanger
```

### 2. Install dependencies

```
npm install
```

### 3. Run the app

```
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
└── App.jsx       # All components live here
```

## How to Use

1. Type a task name in the input field
2. Pick a time (optional)
3. Click **Add** or press **Enter**
4. Check the checkbox to mark a task as done
5. Click **Delete** to remove a task
