window.addEventListener("load", () => {
    const form = document.getElementById("add-task-form");
    const addtask = document.getElementById("add-task-input");
    const todotask_el = document.getElementById("todo-tasks");
  
    // Load tasks from local storage on page load
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskText => {
      addTaskToList(taskText);
    });
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskvalue = addtask.value;
      if (!taskvalue) {
        alert("Please fill out the task");
      } else {
        todotask_el.classList.add("add-task-wrap");
        addTaskToList(taskvalue);
  
        // Save tasks to local storage
        saveTasksToLocalStorage();
  
        addtask.value = "";
      }
    });
  
    function addTaskToList(taskText) {
      const list_input_box_el = document.createElement("div");
      list_input_box_el.classList.add("list-input-box");
      const input_filed_element = document.createElement("input");
      input_filed_element.type = "text";
      input_filed_element.classList.add("input-filed");
      input_filed_element.setAttribute("readonly", "readonly");
      input_filed_element.value = taskText;
      const edit_el = document.createElement("button");
      edit_el.classList.add("btn-sub");
      edit_el.innerHTML = "edit";
      const delete_el = document.createElement("button");
      delete_el.classList.add("btn-sub");
      delete_el.innerHTML = "delete";
  
      list_input_box_el.appendChild(input_filed_element);
      list_input_box_el.appendChild(edit_el);
      list_input_box_el.appendChild(delete_el);
      todotask_el.appendChild(list_input_box_el);
  
      edit_el.addEventListener("click", () => {
        toggleEdit(edit_el, input_filed_element);
      });
  
      delete_el.addEventListener("click", () => {
        todotask_el.removeChild(list_input_box_el);
        saveTasksToLocalStorage();
      });
    }
  
    function toggleEdit(editButton, inputElement) {
      if (editButton.innerHTML == "edit") {
        editButton.innerHTML = "save";
        inputElement.removeAttribute("readonly");
        inputElement.focus();
      } else {
        inputElement.setAttribute("readonly", "readonly");
        editButton.innerHTML = "edit";
  
        // Save tasks to local storage when editing is done
        saveTasksToLocalStorage();
      }
    }
  
    function saveTasksToLocalStorage() {
      const tasks = Array.from(todotask_el.children).map(task => task.querySelector('.input-filed').value);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
  