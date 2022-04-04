import listEntriesPage from "./views/listEntriesPage";
import chooseCategory from "./views/chooseCategoryPage";
import showEntryPage from "./views/showEntryPage";
import createEntryPage from "./views/newEntryPage";
import calendarPage from "./views/calendarPage";
import editEntryPage from "./views/editEntryPage";
import loginPage from "./views/loginPage";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

export const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

export const router = async () => {
  const routes = [
    { path: "/login", view: loginPage },
    { path: "/calendar", view: calendarPage },

    { path: "/calendar/:date", view: calendarPage },
    { path: "/choose", view: chooseCategory },
    { path: "/list/:date", view: listEntriesPage },
    { path: "/show/:id", view: showEntryPage },
    { path: "/new/:categoryId", view: createEntryPage },
    { path: "/edit/:id", view: editEntryPage },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  onAuthStateChanged(getAuth(), async (user) => {
    // console.log("mathc:", match);
    if (user || match.route.path == "/login") {
      try {
        const view = await match.route.view(getParams(match), user);
        // console.log(view, "view", user, "user in routing");
        const a = document.querySelector("#app");
        a.querySelectorAll("*").forEach((n) => n.remove());
        a.append(view);
      } catch (error) {
        console.error(error);
      }
    } else {
      navigateTo(`/login`);
    }
  });
};

// window.addEventListener("backward", router); // it doesn't seem to matter what I pass in here... actually this doesn't do anything...
// document.addEventListener("popstate", router); // this doesn't do anything either :/

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    if (event.target.matches("[data-link]")) {
      event.preventDefault();
      navigateTo(event.target.href);
    }
  });
  router();
});
