import {IsEmail, IsString, IsStrongPassword, MaxLength, MinLength} from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    username: string;

    @IsString()
    displayName: string;

    @IsString()
    @IsStrongPassword()
    @MinLength(8)
    password: string;

    @IsString()
    avatar: string;

    @IsString()
    bio: string;
}