import Home from '../Home';
import MarkedShow from '../MarkedShow';

export default [
    {
        path: "/", component: Home,
        routes: [
            {
                path: "/:type/:mdName", component: MarkedShow,
            },
        ]
    },
];