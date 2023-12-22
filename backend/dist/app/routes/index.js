"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const category_routes_1 = require("../modules/category/category.routes");
const quiz_routes_1 = require("../modules/quiz/quiz.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        routes: auth_routes_1.AuthRoute,
    },
    {
        path: '/user',
        routes: user_routes_1.UserRoutes,
    },
    {
        path: '/category',
        routes: category_routes_1.CategoryRoutes,
    },
    {
        path: '/quiz',
        routes: quiz_routes_1.QuizRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
