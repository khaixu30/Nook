import {IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength} from "class-validator";

export class createUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @IsStrongPassword()
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    username: string;
    password_confirmation: string;
}