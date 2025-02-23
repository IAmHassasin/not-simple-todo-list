import { V1GetTask } from "./entities/get-task.entity";
import { plainToInstance } from "class-transformer";
import { V1GetTaskParamDto, V1GetListTaskQueryDto, V1PostTaskBodyDto, V1DeleteTaskParamDto } from "./dto/get-task.dto";
import { Prisma } from "@prisma/client";
import { prismaService } from "src/main";

export class TaskService {
    async getListTask(query: V1GetListTaskQueryDto): Promise<V1GetTask[]> {
        // Build query condition
        const whereCondition: Prisma.TaskWhereInput[] = [];
        if (query.id)
            whereCondition.push({ id: Number(query.id) });
        if (query.completed) 
            whereCondition.push({ completed: query.completed === 'true' });

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
                completed: body.completed
            }
        });
        return plainToInstance(V1GetTask, task);
    }
}