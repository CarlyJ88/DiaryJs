import "regenerator-runtime/runtime.js";

import { navigateTo, router } from "./routing";

window.addEventListener("popstate", router);

document.addEventListener("load", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
