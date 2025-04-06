import { Prisma } from "@prisma/client";

export const taskData: Prisma.TaskCreateManyInput[] = [
    {
        title: 'Task 1',
        status: 'ToDo',
    },
    {
        title: 'Task 2',
        status: 'InProgress',
    },
    {
        title: 'Task 3',
        status: 'Done',
    },
    {
        title: 'Task 4',
        status: 'Cancelled',
    }
];