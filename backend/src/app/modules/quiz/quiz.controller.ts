/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import pick from '../../../shared/pick';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { Prisma } from '@prisma/client';

const createQuiz = catchAsync(async (req: Request, res: Response) => {
  const quizData = req.body;

  if (quizData.options.length < 3) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Three or more options required'
    );
  }

  const result = await prisma.quiz.create({
    data: quizData,
    include: {
      category: true,
    },
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllQuizzes = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['category']);

  const { category } = filters;

  const paginationOptions: Partial<IPaginationOptions> = pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ]);

  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: any = [];

  const whereCondition: Prisma.QuizWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  if (category) {
    whereCondition.categoryId = category as string;
  }

  const result = await prisma.quiz.findMany({
    include: {
      category: true,
    },
    where: whereCondition,
    skip,
    take: limit,
  });

  const total = await prisma.quiz.count({
    where: whereCondition,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
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
});

const getSingleQuiz = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.quiz.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quiz retrieved successfully',
    data: result,
  });
});

const updateQuiz = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (updatedData.options && updatedData.options.length < 3) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Three or more options required'
    );
  }
  const result = await prisma.quiz.update({
    where: {
      id,
    },
    data: updatedData,
    include: {
      category: true,
    },
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'This Quiz updated successfully',
    data: result,
  });
});

const deleteQuiz = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.quiz.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quiz Deleted successfully',
    data: result,
  });
});

export const QuizController = {
  createQuiz,
  getAllQuizzes,
  getSingleQuiz,
  updateQuiz,
  deleteQuiz,
};
