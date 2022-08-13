import { atom, selector } from "recoil";

export const todoListState = atom({
  key: "todoListState",
    default: [
      { id: 1, name: "Learn Recoil", priority: "High", completed: false },
      { id: 2, name: "Learn Redux", priority: "Medium", completed: false },
      { id: 3, name: "Learn NextJs", priority: "Medium", completed: false },
      { id: 4, name: "Learn Axios", priority: "Low", completed: true },
    ],  
});

export const todoListFilterByStatus = atom({
  key: "todoListFilterByStatus",
  default: "All",
});

export const todoListFilterByPriorities = atom({
  key: "todoListFilterByPriorities",
  default: [],
});

export const todoListFilterBySearchText = atom({
  key: "todoListFilterBySearchText",
  default: "",
});

export const toggleTodoStatus = selector({
  key: "toggleTodoStatus",
  get: ({ get }) => get(todoListState),
  set: ({ set, get }, id) => {
    const oldTodoList = get(todoListState);
    const newTodoList = oldTodoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    return set(todoListState, newTodoList);
  },
});

export const addTodo = selector({
  key: "addTodo",
  get: ({ get }) => get(todoListState),
  set: ({ set, get }, todo) => {
    const oldTodoList = get(todoListState);
    return set(todoListState, [...oldTodoList, todo]);
  },
});

export const statusFilterList = selector({
  key: "statusFilterList",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const status = get(todoListFilterByStatus);
    const priorities = get(todoListFilterByPriorities);
    const searchText = get(todoListFilterBySearchText);

    return todoList.filter((todo) => {
      if (status === "All") {
        return priorities.length
          ? todo.name.includes(searchText) && priorities.includes(todo.priority)
          : todo.name.includes(searchText);
      };
      
      return (
        todo.name.includes(searchText) &&
        (status === "Completed" ? todo.completed : !todo.completed) &&
        (priorities.length ? priorities.includes(todo.priority) : true)
      );
    });
  },
});
