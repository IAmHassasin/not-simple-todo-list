import { RouteTree } from "@nestjs/core";
import { TaskRoute } from "./v1/task/task.route";

export const routes: RouteTree[] = [
    ...TaskRoute,
]