# Project Manager – Kanban Task Management Web App

A modern **Kanban-based Project Management Tool** built using **HTML, CSS, and Vanilla JavaScript**.
This application allows users to create projects, manage tasks, track progress, and organize work visually using a drag-and-drop board.

The app runs entirely in the browser and stores data using **LocalStorage**, so no backend is required.

---

# 🚀 Features

## 📁 Project Management

* Create unlimited projects
* Switch between projects
* Delete projects
* Sidebar navigation for projects

## ✅ Task Management

* Add tasks with:

  * Title
  * Description
  * Priority (Low / Medium / High)
  * Due Date
* Delete tasks

## 📊 Kanban Board

Tasks are organized into three columns:

* **To Do**
* **In Progress**
* **Done**

Supports **Drag and Drop** to move tasks between columns.

## 🎯 Task Priority Indicators

| Priority | Color  |
| -------- | ------ |
| High     | Red    |
| Medium   | Orange |
| Low      | Green  |

## ⏰ Task Due Date Alerts

* Overdue tasks appear **red**
* Tasks due today appear **yellow**

## 🔎 Search and Filter

Users can:

* Search tasks by title
* Filter tasks by priority

## 💾 Local Storage Persistence

All data is automatically saved using **LocalStorage**, meaning:

* No backend required
* Data persists after refreshing the page

---

# 🛠 Technologies Used

Frontend:

* HTML5
* CSS3
* Vanilla JavaScript (ES6)

Browser APIs:

* LocalStorage API
* Drag and Drop API

---

# 📂 Project Structure

```
project-manager
│
├── index.html
├── style.css
├── app.js
└── README.md
```

### index.html

Contains the main UI layout including:

* Header
* Project sidebar
* Kanban board
* Task and Project modals

### style.css

Handles styling including:

* Layout
* Responsive design
* Task cards
* Priority indicators
* Drag and drop effects

### app.js

Implements application logic including:

* State management
* LocalStorage persistence
* Project and task operations
* Drag and drop functionality
* Filtering and searching

---

# ⚙️ How It Works

## 1️⃣ Create a Project

Click **+ Project** to create a new project.

## 2️⃣ Add Tasks

Click **+ Task** and enter:

* Task title
* Description
* Priority
* Due date

## 3️⃣ Track Progress

Tasks appear in the **To Do column**.

Drag tasks between columns to update their status.

## 4️⃣ Search and Filter

Use the top bar to:

* Search tasks
* Filter by priority

## 5️⃣ Automatic Saving

All tasks and projects are automatically saved in **LocalStorage**.

---

# 📥 Installation

Clone the repository:

```bash
git clone https://github.com/yashwanthr12/project-manager.git
```

Open the folder:

```bash
cd project-manager
```

Run the project:

Simply open **index.html** in your browser.

No installation or server required.

---

# 🖥 Screenshots

## Dashboard

![Dashboard](https://via.placeholder.com/1200x600.png?text=Kanban+Board)

## Add Task

![Add Task](https://via.placeholder.com/800x500.png?text=Add+Task+Modal)

## Drag and Drop

![Drag Drop](https://via.placeholder.com/800x500.png?text=Drag+and+Drop+Tasks)

---

# 🔮 Future Improvements

Possible improvements for future versions:

* User authentication
* Cloud database integration (Firebase / Supabase)
* Task comments
* Team collaboration
* Dark mode
* Task labels and tags
* Calendar view
* Notification reminders

---

# 📚 Learning Outcomes

This project demonstrates:

* DOM manipulation
* State management in JavaScript
* Drag and Drop API
* LocalStorage data persistence
* Responsive UI design
* Modular frontend architecture

---

# 🤝 Contributing

Contributions are welcome.

Steps:

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Yashwanth R**

BCA Student
Web Developer | Data Structures Learner | AI Enthusiast
