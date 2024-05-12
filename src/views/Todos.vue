<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
    <div class="container">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <h1 align="center" class="slide-in">My Routine App</h1>
      <h3 class="slide-in1">Daffa khaiza irawan</h3>
      <h3 class="slide-in2">223510613</h3>
      <div class="bg-dark dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div class="w-full md:w-1/2">
            <form class="flex items-center">
              <label for="simple-search" class="sr-only">Tambah Kegiatan</label>
              <div class="relative w-full">
                <input v-model="newTodo" type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Masukkan Kegiatan" required="">
              </div>
            </form>
          </div>
          <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <button @click="addTodo" type="button" id="createProductModalButton" data-modal-target="createProductModal" data-modal-toggle="createProductModal" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
              </svg>
              Tambah Kegiatan
            </button>
            <div class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              <button @click="hideCompleted = !hideCompleted" class="toggle-button">{{ hideCompleted ? 'Tampilkan Semua' : 'Sembunyikan yang sudah selesai' }}</button>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-4">Nama Kegiatan</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:border-gray-700">
              <ul class="todo-list">
                <li scope="row" v-for="todo in visibleTodos" :key="todo.id" class="px-4 py-3 font-medium whitespace-nowrap text-gray-900 todo-item border-b dark:border-gray-700">
                  <span :class="{ 'completed': todo.completed }" @click="toggleComplete(todo)">{{ todo.text }}</span>
                  <button v-if="!todo.completed" @click="completeTodo(todo.id)" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Selesai</button>
                  <button v-if="todo.completed" @click="unCompleteTodo(todo.id)" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Belum Selesai</button>
                  <button @click="removeTodo(todo.id)" style="color: #dc3545" class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Hapus</button>
                </li>
              </ul>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      todos: [],
      newTodo: '',
      nextId: 1,
      hideCompleted: false
    }
  },
  created() {
    this.loadFromLocalStorage();
  },
  computed: {
    visibleTodos() {
      if (this.hideCompleted) {
        return this.todos.filter(todo => !todo.completed);
      } else {
        return this.todos;
      }
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({
          id: this.nextId++,
          text: this.newTodo,
          completed: false
        });
        this.saveToLocalStorage();
        this.newTodo = '';
      }
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.saveToLocalStorage(); 
    },
    completeTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = true;
        this.saveToLocalStorage();
      }
    },
    unCompleteTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = false;
        this.saveToLocalStorage(); 
      }
    },
    toggleComplete(todo) {
      todo.completed = !todo.completed;
      this.saveToLocalStorage(); 
    },
    saveToLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    loadFromLocalStorage() {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
        this.nextId = Math.max(...this.todos.map(todo => todo.id)) + 1;
      }
    }
  }
}
</script>

<style scoped>

.container {
  max-width: 1000px;
  margin: auto;
  border: 3px solid gray;
  border-radius: 20px;
  padding: 20px;
  background-size: cover;
  background-position: center;
  background-color: rgba(255, 255, 255, 10);
  background-image: url('/src/assets/picnic.jpg');
}

.slide-in {
  animation: slideIn 0.5s ease-in-out;
  font-size: 2rem;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
}

.slide-in1 {
  animation: slideIn1 0.5s ease-in-out;
  font-size: 1.5rem;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.slide-in2 {
  animation: slideIn2 0.5s ease-in-out;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn1 {
  0% {
    opacity: 0;
    transform: translateY(-40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn2 {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.todo-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  color: #fff;
}

.completed {
  text-decoration: line-through;
}

.completed span {
  color: #ccc; 
}


.complete-button,
.uncomplete-button,
.remove-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}

.complete-button:hover,
.uncomplete-button:hover,
.remove-button:hover {
  text-decoration: underline;
}

.complete-button,
.uncomplete-button {
  color: #007bff;
}

.remove-button {
  color: #dc3545;
}

.toggle-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}

.toggle-button:hover {
  text-decoration: underline;
}
thead th {
  text-align: left;
}

</style>
