import {IsNotEmpty, IsString} from "class-validator";

export class CreateSlugDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    iconUrl: string;
}