import { atomFamily, selectorFamily } from "recoil";

export const todosAtomsfamily = atomFamily({
  key: "todosAtomsfamily",
  default: selectorFamily({
    key:"todoSelectorFamily",
    get:(id) => async ({ get }) => {
        await new Promise(r=>setTimeout(r,3000)); //artificial delay of 3 secs
        const res = await fetch(`https://sum-server.100xdevs.com/todo?id=${id}`);
        const todos=await res.json();
        console.log(todos.todo);
        return todos.todo;
      },
  }),
});
