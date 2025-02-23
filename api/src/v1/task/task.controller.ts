import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { V1GetTask } from "./entities/get-task.entity";
import { V1GetTaskDto, V1GetTasksDto } from "./dto/get-task.dto";
import { TaskService } from "./task.service";

@ApiTags('task')
@Controller()
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'OK', type: V1GetTask })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async getTask(
        @Query() query: V1GetTaskDto
    ): Promise<V1GetTask> {
        return this.taskService.getTask(query);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'OK', type: [V1GetTask] })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async getTasks(
        @Query() query: V1GetTasksDto
    ): Promise<V1GetTask[]> {
        return this.taskService.getTasks(query);
    }
}