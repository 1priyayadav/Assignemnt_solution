const prisma = require('../config/prisma');

const createTask = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status: status || 'PENDING',
                createdBy: req.user.id,
            },
        });

        res.status(201).json({ success: true, message: 'Task created', data: task });
    } catch (error) {
        next(error);
    }
};

const getTasks = async (req, res, next) => {
    try {
        let where = {};
        if (req.user.role !== 'admin') {
            where.createdBy = req.user.id;
        }

        const tasks = await prisma.task.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { id: true, name: true, email: true } },
            },
        });

        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    } catch (error) {
        next(error);
    }
};

const getTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await prisma.task.findUnique({
            where: { id },
        });

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        if (req.user.role !== 'admin' && task.createdBy !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Forbidden, you cannot access this task' });
        }

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const task = await prisma.task.findUnique({ where: { id } });

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        if (req.user.role !== 'admin' && task.createdBy !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Forbidden, you cannot update this task' });
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(status !== undefined && { status }),
            },
        });

        res.status(200).json({ success: true, message: 'Task updated', data: updatedTask });
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await prisma.task.findUnique({ where: { id } });

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        if (req.user.role !== 'admin' && task.createdBy !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Forbidden, you cannot delete this task' });
        }

        await prisma.task.delete({ where: { id } });

        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
