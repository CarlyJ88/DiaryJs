import listEntriesPage from "./views/listEntriesPage";
import chooseCategory from "./views/chooseCategoryPage";
import showEntryPage from "./views/showEntryPage";
import createEntryPage from "./views/createEntryPage";
import calendarPage from "./views/calendarPage";

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
    { path: "/choose", view: chooseCategory },
    { path: "/list", view: listEntriesPage },
    { path: "/show", view: showEntryPage },
    { path: "/new", view: createEntryPage },
    { path: "/calendar", view: calendarPage },
    { path: "/calendar/:date", view: calendarPage },
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

  new match.route.view(getParams(match));
};
