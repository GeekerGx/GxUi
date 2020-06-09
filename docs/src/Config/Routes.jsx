import Home from '../Home';
import Test from '../Test';

export default [
    {
        path: "/", component: Home,
        routes: [
            {
                path: "/Test", component: Test,
                routes: [
                    { path: "/Test/Test", component: Test },
                ]
            },
        ]
    },
];