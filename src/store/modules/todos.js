// Todos modules with State, Getters, Actions, Mutations
// Vue Components dispatch Actions, they commit Mutations and mutations Mutate the State which Renders the Vue Component
import axios from "axios";

const state = {
  todos: []
};

const getters = {
    // arrow function for returning the todos from the state
    allTodos: (state) => state.todos
};

const actions = {
    async fetchTodos({ commit }) {
        // we use await since we use async
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        console.log(response.data);
        commit('setTodos', response.data);
    }
};

const mutations = {
    // todos are response.data from actions commit
    setTodos: (state, todos) => (state.todos = todos)
};

export default {
  // state: state
  // with ES6 only state
  state,
  getters,
  actions,
  mutations
};
