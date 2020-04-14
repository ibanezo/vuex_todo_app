// Todos modules with State, Getters, Actions, Mutations
// Vue Components dispatch Actions, they commit Mutations and mutations Mutate the State which Renders the Vue Component
import axios from "axios";

const state = {
  todos: []
};

const getters = {
  // arrow function for returning the todos from the state
  allTodos: state => state.todos
};

const actions = {
  async fetchTodos({ commit }) {
    // we use await since we use async
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    commit("setTodos", response.data);
  },
  async addTodo({ commit }, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { title, completed: false }
    );
    console.log(response.data);
    commit("newTodo", response.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit("removeTodo", id);
  },
  async filterTodos({ commit }, e) {
    // Get selected number
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );
    commit("setTodos", response.data);
  },
  async updateTodo({ commit }, updTodo) {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo);
    // console.log(response.data);
    commit("updateTodo", response.data);
  }
};

const mutations = {
  // todos are response.data from actions commit
  setTodos: (state, todos) => (state.todos = todos),
  // we use unshift for putting the new todo first on the list
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter(todo => todo.id !== id)),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex( todo => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  }
};

export default {
  // state: state
  // with ES6 only state
  state,
  getters,
  actions,
  mutations
};
