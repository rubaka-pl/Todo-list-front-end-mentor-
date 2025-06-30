# TODO List

Требования к проекту (бизнес-логика):
1. Получать данные с сервера, отрисовывать их на странице.
2. Через форму создавать новые задачи, с отправкой запроса на сервер.
   Выбор пользователя из списка доступных.
3. Изменять статус завершенности по чекбоксу.
4. Удалять задачи.

UI:
0. Шапка с названием.
1. Форма: текстовое поле, select для выбора пользователей и кнопка.
2. Список всех всех.
3. Задача:
   - Текст
   - Чекбокс
   - Крестик для удаление

Шаги:
0. Базовая разметка и стили. 
1. Получение задач и пользователей с сервера. ( async function + initApp() )
2. Отрисовать задачи на странице. ( createUserOption() + printTodo() )
3. Добавить пользователей в выпадающий список. +
4. Логика добавление задачи.
5. Логика изменения статуса.
6. Логика удаления.
7. Информирование об ошибках.




---

# TO-DO List 


## Project Features (Business Logic)

The core functionalities of this application include:

* **Data Management:** Fetching existing tasks from a server and displaying them on the page.
* **Task Creation:** Allowing users to create new tasks through a form, with the ability to assign tasks to different users selected from a dropdown list. These new tasks are then sent to the server.
* **Status Updates:** Users can easily change the completion status of a task using a checkbox.
* **Task Deletion:** Providing an option to remove tasks from the list.

---

## User Interface (UI)

The application's user interface is straightforward and includes the following components:

* **Header:** A prominent title at the top of the page.
* **Task Form:** A dedicated area for creating new tasks, featuring:
    * A text input field for the task description.
    * A dropdown (`select`) menu for choosing an assigned user.
    * A button to submit the new task.
* **Task List:** A comprehensive display of all tasks.
* **Individual Task Item:** Each task entry within the list will show:
    * The task's descriptive text.
    * A checkbox to mark the task as complete or incomplete.
    * A delete icon (cross) to remove the task.

---

## Development Steps

Here's a breakdown of the planned development phases:

1.  **Initial Setup:** Establishing the basic HTML markup and CSS styles.
2.  **Data Fetching:** Implementing asynchronous functions (`async function + initApp()`) to retrieve tasks and user data from the server.
3.  **Task Rendering:** Displaying the fetched tasks on the page using helper functions (`createUserOption() + printTodo()`).
4.  **User Dropdown Population:** Dynamically adding available users to the selection dropdown in the form.
5.  **Add Task Logic:** Developing the functionality to handle new task submissions.
6.  **Status Change Logic:** Implementing the logic for updating task completion status.
7.  **Delete Task Logic:** Creating the functionality for removing tasks.
8.  **Error Handling:** Integrating mechanisms to inform users about any errors that occur.