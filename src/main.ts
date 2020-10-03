import App from "./App.svelte";

const target = document.getElementById("fragment");

target.innerHTML = "";

const app = new App({
  target,
  props: {
    name: "LEO",
  },
  hydrate: true,
});

export default app;
