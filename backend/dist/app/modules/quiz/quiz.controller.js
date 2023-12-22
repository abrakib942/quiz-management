"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createQuiz = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quizData = req.body;
    if (quizData.options.length < 3) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Three or more options required');
    }
    const result = yield prisma_1.default.quiz.create({
        data: quizData,
        include: {
            category: true,
        },
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category created successfully',
        data: result,
    });
}));
const getAllQuizzes = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ['category']);
    const { category } = filters;
    const paginationOptions = (0, pick_1.default)(req.query, [
        'page',
        'limit',
        'sortBy',
        'sortOrder',
    ]);
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    if (category) {
        whereCondition.categoryId = category;
    }
    const result = yield prisma_1.default.quiz.findMany({
        include: {
            category: true,
        },
        where: whereCondition,
        skip,
        take: limit,
    });
    const total = yield prisma_1.default.quiz.count({
        where: whereCondition,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'quizzes retrieved successfully',
        data: {
            meta: {
                page,
                limit,
                total,
            },
            data: result,
        },
    });
}));
const getSingleQuiz = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield prisma_1.default.quiz.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Quiz retrieved successfully',
        data: result,
    });
}));
const updateQuiz = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    if (updatedData.options && updatedData.options.length < 3) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Three or more options required');
    }
    const result = yield prisma_1.default.quiz.update({
        where: {
            id,
        },
        data: updatedData,
        include: {
            category: true,
        },
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'This Quiz updated successfully',
        data: result,
    });
}));
const deleteQuiz = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield prisma_1.default.quiz.delete({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Quiz Deleted successfully',
        data: result,
    });
}));
exports.QuizController = {
    createQuiz,
    getAllQuizzes,
    getSingleQuiz,
    updateQuiz,
    deleteQuiz,
};
