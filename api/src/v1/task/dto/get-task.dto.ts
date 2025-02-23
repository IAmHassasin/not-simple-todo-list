import { ApiPropertyOptional } from "@nestjs/swagger";

export class V1GetTasksDto {
    @ApiPropertyOptional()
    id: string | undefined;

    @ApiPropertyOptional()
    completed: boolean | undefined;
}

export class V1GetTaskDto {
    @ApiPropertyOptional()
    id: string | undefined;
}