import { ApiProperty } from "@nestjs/swagger";

export class V1GetTask {
    @ApiProperty()
    id: string | undefined;

    @ApiProperty()
    title: string | undefined;

    @ApiProperty()
    completed: boolean | undefined;
}