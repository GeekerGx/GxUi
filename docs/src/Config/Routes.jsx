import Home from '../Home';
import Test from '../Test';

export default [
    { path: "/", component: Home },
    { path: "/Home", component: Home },
    {
        path: "/Test", component: Test,
        routes: [
            { path: "/Test/Home", component: Home },
            {
                path: "/Test/Test", component: Test,
                routes: [
                    { path: "/Test/Test/Home", component: Home },
                    { path: "/Test/Test/Test", component: Test },
                ]
            },
        ]
    }
];