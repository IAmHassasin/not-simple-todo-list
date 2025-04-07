import { V1GetTask } from "./entities/get-task.entity";
import { plainToInstance } from "class-transformer";
import { V1GetTaskParamDto, V1GetListTaskQueryDto, V1PostTaskBodyDto, V1DeleteTaskParamDto } from "./dto/get-task.dto";
import { Prisma, taskStatus } from "@prisma/client";
import { prismaService } from "src/main";

// This service is not completely RESTful, but it is a good start. It uses Prisma to interact with the database and transform the data using class-transformer.
// TODO: Bulk Delete, Put
export class TaskService {
    async getListTask(query: V1GetListTaskQueryDto): Promise<V1GetTask[]> {
        // Build query condition
        const whereCondition: Prisma.TaskWhereInput[] = [];
        if (query.id)
            whereCondition.push({ id: Number(query.id) });
        if (query.status && [`To Do`, `In Progress`, `Done`, `Cancelled`].includes(query.status)) 
            whereCondition.push({ status: query.status as Prisma.EnumtaskStatusFilter });

        const task = await prismaService.task.findMany({
            where: whereCondition.length ? { OR: whereCondition } : undefined,
        });
        return plainToInstance(V1GetTask, task);
    }

    async getTaskById(param: V1GetTaskParamDto): Promise<V1GetTask> {
        const task = await prismaService.task.findUnique({
            where: {
                id: Number(param.id)
            }
        });
        return plainToInstance(V1GetTask, task);
    }

    async deleteTask(param: V1DeleteTaskParamDto): Promise<void> {
        await prismaService.task.delete({
            where: {
                id: Number(param.id)
            }
        });
    }

    async createTask(body: V1PostTaskBodyDto): Promise<V1GetTask> {
        const task = await prismaService.task.create({
            data: {
                title: body.title,
                status: body.status as taskStatus,
            }
        });
        return plainToInstance(V1GetTask, task);
    }
}