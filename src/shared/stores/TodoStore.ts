import { defineStore } from "pinia";
import type { Todo } from "@/shared/types/Todo.Interface";
import type { TodoStore } from "@/shared/types/TodoStore.Interface";
import { addNewTodo } from "../services/add_todo";
import { deleteExistingTodo } from "../services/delete_todo";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase_sdk";
import { updateCompleted, updateFav, updateTitle } from "../services/update_todo";

export const useTodoStore = defineStore("useTodoStore", {
  state: (): TodoStore => ({
    todos     : [],
    isLoading : false,
    showToast : false,
  }),

  getters: {
    getAllFavorites(state) {
      return state.todos.filter((f) => f.isFav == true);
    },
    getAllCompleted(state) {
      return state.todos.filter((f) => f.isCompleted == true);
    },
  },

  actions: {
    async getTodos() {
      this.isLoading = true;

      const resData: Todo[] = [];

      const querySnapshot = await getDocs(collection(db, "todos"));

      querySnapshot.forEach((res: any) => {
        const tempData = {
          id          : res.id,
          title       : res.data().title,
          isFav       : res.data().isFav,
          isCompleted : res.data().isCompleted,
        };
        resData.push(tempData);
      });

      this.todos = resData;

      this.todos.sort((a) => (a.isCompleted == true ? 1 : -1));

      this.isLoading = false;
    },

    addTodo(newTodo: string) {
      const tempData = {
        id          : `${Math.floor(Math.random() * 100)}`,
        title       : newTodo,
        isFav       : false,
        isCompleted : false,
      };

      addNewTodo(newTodo);

      this.todos.push(tempData);

      this.getTodos();
    },

    deleteTodo(id: string) {
      this.todos = this.todos.filter((d) => d.id != id);

      deleteExistingTodo(id);
      
      this.showToast = true;
      setTimeout(() => (this.showToast = false), 2000);
    },

    handleFavorite(id: string) {
      const todo = this.todos.find((f) => f.id === id);
      if (todo) {
        todo.isFav = !todo.isFav;
        updateFav(id, todo.isFav);
      }
      this.getTodos();
    },

    handleCompleted(id: string) {
      const todo = this.todos.find((f) => f.id === id);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
        updateCompleted(id, todo.isCompleted);
      }
      this.getTodos();
    },

    editTodo(id: string, newTodo: string) {
      const todo = this.todos.find((f) => f.id === id);
      if (todo) {
        todo.title = newTodo;
        updateTitle(id, todo.title);
      }
    },
  },
});
