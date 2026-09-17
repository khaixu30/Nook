import {IsBoolean, IsString} from "class-validator";

export class UpdateNookDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    slugId: string;

    @IsString()
    contentUrl: string;

    @IsString()
    clickToViewUrl: string;

    @IsBoolean()
    isPublic: boolean;
}