import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsString } from "class-validator";

export class V1GetListTaskQueryDto {
    @ApiPropertyOptional()
    id: string | undefined;

    @ApiPropertyOptional()
    completed: string | undefined;
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
    @Transform(({ value }) => (value === undefined ? '' : value))
    title!: string;

    @ApiProperty()
    @IsBoolean()
    @Transform(({ value }) => (value === undefined ? false : value))
    completed!: boolean;
}