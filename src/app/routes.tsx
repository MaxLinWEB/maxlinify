import { createBrowserRouter } from "react-router";
import { AppLayout } from "./components/layout/AppLayout";
import { HomeScreen } from "./components/screens/HomeScreen";
import { SearchScreen } from "./components/screens/SearchScreen";
import { LibraryScreen } from "./components/screens/LibraryScreen";
import { CommunityScreen } from "./components/screens/CommunityScreen";
import { PlayerScreenWrapper } from "./components/screens/PlayerScreenWrapper";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: HomeScreen },
      { path: "search", Component: SearchScreen },
      { path: "library", Component: LibraryScreen },
      { path: "community", Component: CommunityScreen },
      { path: "player", Component: PlayerScreenWrapper },
    ],
  },
]);
