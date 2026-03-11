/**********************************************************
 * STORAGE KEY
 **********************************************************/
const STORAGE_KEY = "pm_app_state_v1";

/**********************************************************
 * ELEMENT REFERENCES
 **********************************************************/
const addProjectBtn = document.getElementById("addProjectBtn");
const addTaskBtn = document.getElementById("addTaskBtn");

const projectModal = document.getElementById("projectModal");
const cancelProjectBtn = document.getElementById("cancelProjectBtn");

const taskModal = document.getElementById("taskModal");
const cancelTaskBtn = document.getElementById("cancelTaskBtn");

const projectForm = document.getElementById("projectForm");
const projectNameInput = document.getElementById("projectNameInput");

const taskForm = document.getElementById("taskForm");
const taskTitleInput = document.getElementById("taskTitleInput");
const taskDescInput = document.getElementById("taskDescInput");
const taskPriorityInput = document.getElementById("taskPriorityInput");
const taskDueDateInput = document.getElementById("taskDueDateInput");

const projectList = document.querySelector(".project-list");
const board = document.querySelector(".board");

const searchInput = document.getElementById("taskSearchInput");
const priorityFilter = document.getElementById("priorityFilter");

/**********************************************************
 * APPLICATION STATE
 **********************************************************/
const state = {
  projects: [],
  activeProjectId: null,
  filters: {
    searchText: "",
    priority: "all",
  },
};

/**********************************************************
 * STORAGE HELPERS
 **********************************************************/
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    if (parsed.projects) {
      state.projects = parsed.projects;
      state.activeProjectId = parsed.activeProjectId;
      state.filters = parsed.filters || state.filters;
    }
  } catch (err) {
    console.error("Failed to load state", err);
  }
}

/**********************************************************
 * UTILS
 **********************************************************/
function generateId() {
  return Date.now().toString();
}

/**********************************************************
 * MODAL CONTROLS
 **********************************************************/
addProjectBtn.onclick = () => projectModal.classList.remove("hidden");
projectNameInput.focus();

cancelProjectBtn.onclick = () => projectModal.classList.add("hidden");

addTaskBtn.onclick = () => {
  if (!state.activeProjectId) {
    alert("Create a project first");
    return;
  }
  taskModal.classList.remove("hidden");
  taskTitleInput.focus();
};
cancelTaskBtn.onclick = () => taskModal.classList.add("hidden");

/**********************************************************
 * PROJECT LOGIC
 **********************************************************/
projectForm.onsubmit = (e) => {
  e.preventDefault();

  const name = projectNameInput.value.trim();
  if (!name) return;

  const project = {
    id: generateId(),
    name,
    tasks: [],
  };

  state.projects.push(project);
  state.activeProjectId = project.id;

  projectForm.reset();
  projectModal.classList.add("hidden");

  saveState();
  renderProjects();
  renderBoard();
};

function setActiveProject(id) {
  state.activeProjectId = id;
  saveState();
  renderProjects();
  renderBoard();
}

function deleteProject(id) {
  if (!confirm("Delete this project?")) return;

  state.projects = state.projects.filter((p) => p.id !== id);
  state.activeProjectId = state.projects[0]?.id || null;

  saveState();
  renderProjects();
  renderBoard();
}

function renderProjects() {
  projectList.innerHTML = "";

  if (state.projects.length === 0) {
    projectList.innerHTML = `
  <li class="empty-state">
    No projects yet<br/>
    <small>Click + Project to get started</small>
  </li>
`;

    return;
  }

  state.projects.forEach((p) => {
    const li = document.createElement("li");
    li.className = "project-item";
    if (p.id === state.activeProjectId) li.classList.add("active");
    li.dataset.projectId = p.id;

    li.innerHTML = `
      <span>${p.name}</span>
      <span class="delete-project">🗑️</span>
    `;

    projectList.appendChild(li);
  });
}

projectList.onclick = (e) => {
  const item = e.target.closest(".project-item");
  if (!item) return;

  const id = item.dataset.projectId;

  if (e.target.classList.contains("delete-project")) {
    e.stopPropagation();
    deleteProject(id);
  } else {
    setActiveProject(id);
  }
};

/**********************************************************
 * TASK LOGIC
 **********************************************************/
taskForm.onsubmit = (e) => {
  e.preventDefault();

  const project = state.projects.find((p) => p.id === state.activeProjectId);
  if (!project) return;

  project.tasks.push({
    id: generateId(),
    title: taskTitleInput.value.trim(),
    description: taskDescInput.value,
    priority: taskPriorityInput.value,
    dueDate: taskDueDateInput.value,
    status: "todo",
  });

  taskForm.reset();
  taskModal.classList.add("hidden");

  saveState();
  renderBoard();
};

board.onclick = (e) => {
  if (!e.target.classList.contains("delete-task")) return;

  const taskEl = e.target.closest(".task");
  const taskId = taskEl.dataset.taskId;

  const project = state.projects.find((p) => p.id === state.activeProjectId);

  project.tasks = project.tasks.filter((t) => t.id !== taskId);

  saveState();
  renderBoard();
};

/**********************************************************
 * SEARCH & FILTER
 **********************************************************/
searchInput.oninput = (e) => {
  state.filters.searchText = e.target.value.toLowerCase();
  saveState();
  renderBoard();
};

priorityFilter.onchange = (e) => {
  state.filters.priority = e.target.value;
  saveState();
  renderBoard();
};

function getFilteredTasks(tasks) {
  return tasks.filter((task) => {
    const matchText = task.title
      .toLowerCase()
      .includes(state.filters.searchText);

    const matchPriority =
      state.filters.priority === "all" ||
      task.priority === state.filters.priority;

    return matchText && matchPriority;
  });
}

/**********************************************************
 * BOARD RENDERING
 **********************************************************/
function applyDueDateStyles(el, dueDate) {
  if (!dueDate) return;

  const today = new Date().toISOString().split("T")[0];
  if (dueDate < today) el.classList.add("overdue");
  else if (dueDate === today) el.classList.add("due-today");
}

function renderBoard() {
  document
    .querySelectorAll(".task-list")
    .forEach((col) => (col.innerHTML = ""));

  const project = state.projects.find((p) => p.id === state.activeProjectId);
  if (!project) return;

  const tasks = getFilteredTasks(project.tasks);

  tasks.forEach((task) => {
    const taskEl = document.createElement("div");
    taskEl.className = "task";
    taskEl.dataset.taskId = task.id;
    taskEl.dataset.priority = task.priority;
    taskEl.draggable = true;

    taskEl.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.description || ""}</p>
      <small>Priority: ${task.priority}</small>
      ${task.dueDate ? `<small>Due: ${task.dueDate}</small>` : ""}
      <button class="delete-task">Delete</button>
    `;

    applyDueDateStyles(taskEl, task.dueDate);

    document
      .querySelector(`.column[data-status="${task.status}"] .task-list`)
      .appendChild(taskEl);
  });
}

/**********************************************************
 * DRAG & DROP
 **********************************************************/
let draggedTaskId = null;

board.addEventListener("dragstart", (e) => {
  const task = e.target.closest(".task");
  if (!task) return;

  draggedTaskId = task.dataset.taskId;
  task.classList.add("dragging");
});

board.addEventListener("dragend", (e) => {
  const task = e.target.closest(".task");
  if (!task) return;

  task.classList.remove("dragging");
  draggedTaskId = null;
});

board.addEventListener("dragover", (e) => {
  if (e.target.closest(".column")) e.preventDefault();
});

board.addEventListener("drop", (e) => {
  const column = e.target.closest(".column");
  if (!column || !draggedTaskId) return;

  const project = state.projects.find((p) => p.id === state.activeProjectId);

  const task = project.tasks.find((t) => t.id === draggedTaskId);

  task.status = column.dataset.status;

  saveState();
  renderBoard();
});

/**********************************************************
 * INIT
 **********************************************************/
loadState();
renderProjects();
renderBoard();
