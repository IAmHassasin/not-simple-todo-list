import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsIn, IsString } from "class-validator";

export class V1GetListTaskQueryDto {
    @ApiPropertyOptional()
    id: string | undefined;

    @ApiPropertyOptional()
    @IsIn(['To Do', 'In Progress', 'Done', 'Cancelled'])
    @Transform(({ value }) => (value === undefined ? 'To Do' : value))
    status: string | undefined;
}

export class V1GetTaskParamDto {
    @ApiPropertyOptional()
    id!: string;
}

export class V1DeleteTaskParamDto {
    @ApiPropertyOptional()
    id!: string;
}

export class V1PostTaskBodyDto {
    @ApiProperty()
    @IsString()
    @Transform(({ value }) => (value === undefined ? 'No Title' : value))
    title!: string;

    @ApiProperty()
    @IsString()
    @Transform(({ value }) => (value === undefined ? 'ToDo' : value))
    status!: string;
}