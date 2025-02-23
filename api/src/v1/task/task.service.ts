import { V1GetTask } from "./entities/get-task.entity";
import { plainToInstance } from "class-transformer";
import { V1GetTaskDto, V1GetTasksDto } from "./dto/get-task.dto";
import { InvalidRequestException } from "src/common/exception/error.exception";
import { PrismaClient } from "@prisma/client";

export class TaskService {
    private prisma: PrismaClient = new PrismaClient();

    async getTasks(query: V1GetTasksDto): Promise<V1GetTask[]> {
        await this.prisma.$connect();
        if (!query.id || !query.completed)
            throw new InvalidRequestException();
        const task = await this.prisma.task.findMany({
            where: {
                id: Number(query.id),
                completed: query.completed
            }
        });
        await this.prisma.$disconnect();
        return plainToInstance(V1GetTask, task);
    }

    async getTask(query: V1GetTaskDto): Promise<V1GetTask> {
        await this.prisma.$connect();
        const task = await this.prisma.task.findUnique({
            where: {
                id: Number(query.id)
            }
        });
        await this.prisma.$disconnect();
        return plainToInstance(V1GetTask, task);
    }
}