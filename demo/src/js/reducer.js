import produce from "immer"

export const FILTER_ALL = "filter_all"
export const FILTER_ACTIVE = "filter_active"
export const FILTER_DONE = "filter_done"

const initialState = {
  todos: [],
  filter: FILTER_ALL
}

for (let i = 0; i <= 100; i++) {
  initialState.todos.push({
    id: i,
    title: "wfwefewfqw we",
    done: Math.random() < 0.5 ? true : false
  })
}

export default produce((draft = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_DONE":
      draft.todos.map(t => {
        if (t.id === action.todo.id) {
          t.done = !t.done
        }
      })
      return draft
    case "ADD":
      draft.todos.push({
        id: Math.round(Math.random() * 9999999),
        title: action.title,
        done: false
      })
      return draft
    case "REMOVE":
      const todos = draft.todos.filter(t => t.id !== action.todo.id)
      draft.todos = todos
      return draft
    case "EDIT":
      draft.todos.map(t => {
        if (t.id === action.todo.id) {
          t.title = action.todo.title
        }
      })
      return draft
    case "CHANGE_FILTER":
      draft.filter = action.filter
      return draft
    default:
      return draft
  }
})
