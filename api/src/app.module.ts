import { MiddlewareConsumer, Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { routes } from "./route";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TaskModule } from "./v1/task/task.module";

@Module({
    imports: [
        RouterModule.register(routes),
        TaskModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}