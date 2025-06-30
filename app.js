import {
  getAllTodos,
  getAllUsers,
  createTodo,
  toggleTodoComplete,
  deleteTodo,
} from './api.js';
import { playDropSound, playToggleSound } from './sound.js';

(function () {
  const todoList = document.getElementById('todo-list');
  const userSelect = document.getElementById('user-todo');
  const form = document.querySelector('form');
  const themeToggle = document.getElementById('theme-toggle');
  const clearBtn = document.getElementById('clear-completed');
  const filterButtons = document.querySelectorAll('.filter-btn');

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.add(currentTheme);
  updateToggleIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark')
      ? 'light'
      : 'dark';
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon(newTheme);
    playToggleSound();
  });

  function updateToggleIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      document
        .querySelectorAll('.filter-btn')
        .forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      applyFilter();
    });
  });

  function alertError(error) {
    alert(error.message);
  }

  let currentFilter = 'all';
  let todos = [];
  let users = [];

  document.addEventListener('DOMContentLoaded', initApp);
  form.addEventListener('submit', handleSubmit);

  function getUserName(userId) {
    const user = users.find((u) => u.id === userId);
    return user.name;
  }

  function printTodo({ id, userId, title, completed }) {
    const li = document.createElement('li');
    li.className = 'todo-item' + (completed ? ' completed' : '');
    li.dataset.id = id;
    li.innerHTML = `<span style="height: 100%; width: 100%;">${title} <i>by</i> <b>${getUserName(
      userId
    )}</b></span>`;

    const status = document.createElement('input');
    status.id = `todo-${id}`;
    status.type = 'checkbox';
    status.checked = completed;
    status.addEventListener('change', handleTodoChange);

    const customLabel = document.createElement('label');
    customLabel.className = 'checkbox';
    customLabel.setAttribute('for', `todo-${id}`);

    const close = document.createElement('span');
    close.innerHTML = '&times;';
    close.className = 'close';
    close.addEventListener('click', handleClose);

    li.prepend(customLabel);
    li.prepend(status);
    li.append(close);
    todoList.prepend(li);
  }

  function createUserOption(user) {
    if (!user || !user.id || !user.name) return;
    const option = document.createElement('option');
    option.value = user.id;
    option.innerText = user.name;
    userSelect.append(option);
  }

  function removeTodo(todoId) {
    todos = todos.filter((todo) => todo.id !== todoId);
    const todo = todoList.querySelector(`[data-id="${todoId}"]`);
    if (!todo) return;
    const input = todo.querySelector('input');
    const close = todo.querySelector('.close');
    if (input) input.removeEventListener('change', handleTodoChange);
    if (close) close.removeEventListener('click', handleClose);
    todo.classList.add('removing');
    setTimeout(() => todo.remove(), 600);
  }

  clearBtn.addEventListener('click', async () => {
    const completedTodos = todos.filter((todo) => todo.completed);
    for (const todo of completedTodos) {
      try {
        await deleteTodo(todo.id);
        removeTodo(todo.id);
      } catch (error) {
        alertError(error);
      }
    }
  });

  async function initApp() {
    try {
      const [todosData, usersData] = await Promise.all([
        getAllTodos(),
        getAllUsers(),
      ]);
      todos = todosData;
      users = usersData;
      todos.forEach(printTodo);
      applyFilter();
      users.forEach(createUserOption);
      new Sortable(todoList, {
        animation: 200,
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',
        onEnd: () => playDropSound(),
      });
    } catch (error) {
      console.error('Init error:', error);
      alertError(error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const userId = Number(form.user.value);
    const title = form.todo.value.trim();
    if (!userId) return alert('Select a user');
    if (!title) return alert('Enter a todo');
    try {
      const newTodo = await createTodo({ userId, title, completed: false });
      printTodo(newTodo);
      applyFilter();
    } catch (error) {
      alertError(error);
    }
    form.todo.value = '';
    form.user.value = '';
  }

  async function handleTodoChange() {
    const todoId = Number(this.parentElement.dataset.id);
    const completed = this.checked;
    this.parentElement.classList.toggle('completed', completed);
    const targetTodo = todos.find((t) => t.id === todoId);
    if (targetTodo) targetTodo.completed = completed;
    try {
      await toggleTodoComplete(todoId, completed);
    } catch (error) {
      alertError(error);
    }
  }

  async function handleClose() {
    const todoId = this.parentElement.dataset.id;
    playDropSound();
    try {
      await deleteTodo(todoId);
      removeTodo(todoId);
    } catch (error) {
      alertError(error);
    }
  }

  function applyFilter() {
    const items = todoList.querySelectorAll('.todo-item');
    items.forEach((item) => {
      const isCompleted = item.classList.contains('completed');
      item.style.display =
        currentFilter === 'all' ||
        (currentFilter === 'active' && !isCompleted) ||
        (currentFilter === 'completed' && isCompleted)
          ? ''
          : 'none';
    });
  }
})();
