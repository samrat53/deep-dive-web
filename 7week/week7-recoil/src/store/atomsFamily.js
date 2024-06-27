import { atomFamily } from "recoil";
import { TODOS } from "../todos";

export const todosAtomsFamily = atomFamily({
  key: "todosAtomsFamily",
  default: (id) => {
    return TODOS.find((item) => item.id === id);
  },
});
