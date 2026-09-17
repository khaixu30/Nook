import {IsNotEmpty, IsString} from "class-validator";

export class loginUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}