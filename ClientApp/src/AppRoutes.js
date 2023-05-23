import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Chart } from "./components/Chart";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/charting',
    element: <Chart />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  }
];

export default AppRoutes;
