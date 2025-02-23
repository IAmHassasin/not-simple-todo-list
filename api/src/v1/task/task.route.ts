import { RouteTree } from "@nestjs/core";
import { TaskModule } from "./task.module";

export const TaskRoute: RouteTree[] = [{
    path: '/v1/task',
    module: TaskModule,
}]