<template>
  <div>
    <h2>Todos</h2>
    <div class="todos">
      <div v-for="todo in allTodos" v-bind:key="todo.id" class="todo">{{todo.title}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Todos",
  methods: {
      // since we have more actions, we wrap these in curly braces with spread operator
      ...mapActions(["fetchTodos"])
  },

  // property for saying which getter we are going to use (array)
  computed: mapGetters(["allTodos"]),

  // created function is called before the component loads
  created() {
      this.fetchTodos();
  }
};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
</style>