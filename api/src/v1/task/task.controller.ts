import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { V1GetTask } from "./entities/get-task.entity";
import { TaskService } from "./task.service";
import { V1PostTaskBodyDto, V1DeleteTaskParamDto, V1GetListTaskQueryDto, V1GetTaskParamDto } from "./dto/get-task.dto";

@ApiTags('task')
@Controller()
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'OK', type: [V1GetTask] })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async getTasks(
        @Query() query: V1GetListTaskQueryDto
    ): Promise<V1GetTask[]> {
        return this.taskService.getListTask(query);
    }

    @Get('/:id')
    @ApiResponse({ status: 200, description: 'OK', type: V1GetTask })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async getTask(
        @Param() param: V1GetTaskParamDto
    ): Promise<V1GetTask> {
        return this.taskService.getTaskById(param);
    }

    @Delete('/:id')
    @ApiResponse({ status: 204, description: 'OK' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async deleteTask(
        @Param() param: V1DeleteTaskParamDto
    ): Promise<void> {
        return this.taskService.deleteTask(param);
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Created', type: V1GetTask })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async createTask(
        @Body() body: V1PostTaskBodyDto
    ): Promise<V1GetTask> {
        return this.taskService.createTask(body);
    }
}