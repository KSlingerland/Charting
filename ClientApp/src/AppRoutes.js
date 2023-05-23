import {FetchData} from "./components/screens/FetchData";
import {Home} from "./components/screens/Home";
import {Chart} from "./components/screens/Chart";
import {Workshop} from "./workshop/Workshop";

const AppRoutes = [
    {
        index: true,
        element: <Home/>
    },
    {
        path: '/workshop',
        element: <Workshop/>
    },
    {
        path: '/charting',
        element: <Chart/>
    },
    {
        path: '/fetch-data',
        element: <FetchData/>
    }
];

export default AppRoutes;
