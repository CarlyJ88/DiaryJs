import listEntriesPage from "./views/listEntriesPage";
import chooseCategory from "./views/chooseCategoryPage";
import showEntryPage from "./views/showEntryPage";
import createEntryPage from "./views/newEntryPage";
import calendarPage from "./views/calendarPage";
import editEntryPage from "./views/editEntryPage";

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
    //   { path: "/", view: Dashboard },
    { path: "/calendar", view: calendarPage },
    { path: "/choose", view: chooseCategory },
    { path: "/list", view: listEntriesPage },
    { path: "/show/:id", view: showEntryPage },
    { path: "/new", view: createEntryPage },
    { path: "/calendar/:date", view: calendarPage },
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

  const view = await match.route.view(getParams(match));

  const a = document.querySelector("#app");

  a.querySelectorAll("*").forEach((n) => n.remove());

  a.append(view);
  // document.querySelector(
  //   "#app"
  // ).innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    if (event.target.matches("[data-link]")) {
      /* if clicked link has a data-link attribute then prevent page reload and run navigateTo function*/
      event.preventDefault();
      navigateTo(event.target.href);
    }
  });
  router();
});
