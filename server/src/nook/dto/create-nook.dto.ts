import {IsNotEmpty, IsString} from "class-validator";

export class CreateNookDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    slugId: string;

    @IsString()
    description: string;

    @IsString()
    clickToViewUrl: string;

    @IsString()
    contentUrl: string;
}