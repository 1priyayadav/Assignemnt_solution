const { z } = require('zod');

const createTaskSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title is required'),
        description: z.string().optional(),
        status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
    }),
});

const updateTaskSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title cannot be empty').optional(),
        description: z.string().optional(),
        status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
    }),
});

module.exports = {
    createTaskSchema,
    updateTaskSchema,
};
