import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity.js";
import {Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {createUserDto} from "./dto/create-user.dto.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {loginUserDto} from "./dto/login-user.dto.js";
import {UpdateUserDto} from "./dto/update-user.dto.js";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
    ) {}

    // REGISTER HANDLER;
    async create(data: createUserDto) {
        if(data.password !== data.password_confirmation){
            throw new BadRequestException('Passwords do not match.')
        }
        const foundUser = await this.userRepository.findOne({where: [{username: data.username}, {email: data.email}] })
        if(foundUser){
            throw new ConflictException('Username or email may not be available.')
        }

        const passwordHash = await bcrypt.hash(data.password, 10)

        const newUser = this.userRepository.create({
            username: data.username,
            email: data.email,
            password: passwordHash
        });

        await this.userRepository.save(newUser);

        const payload = {
            sub: newUser.id,
            email: newUser.email,
            username: data.username,
            loggedInAt: Date.now(),
        }

        const JWT_SECRET = this.configService.getOrThrow('JWT_SECRET')
        const JWT_EXPIRESIN = this.configService.getOrThrow('JWT_EXPIRESIN')

        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRESIN})

        return {
            token,
            data: {
                user: {
                    username: newUser.username,
                    email: newUser.email,
                    displayName: newUser.displayName,
                    avatar: newUser.avatar,
                    bio: newUser.bio,
                    id: newUser.id,
                }
            }
        };
    }

    // LOGIN HANDLER;
    async login(data: loginUserDto) {
        const foundUser = await this.userRepository.findOne({where: {username: data.username}})

        if(!foundUser || !foundUser.password){
            throw new NotFoundException('User does not exists.')
        }

        const isMatched = await bcrypt.compare(data.password, foundUser.password);
        if(!isMatched){
            throw new ForbiddenException('Incorrect password.')
        }

        const payload = {
            sub: foundUser.id,
            email: foundUser.email,
            username: foundUser.username,
            loggedInAt: Date.now(),
        }

        const JWT_SECRET = this.configService.getOrThrow('JWT_SECRET');
        const JWT_EXPIRESIN = this.configService.getOrThrow('JWT_EXPIRESIN')

        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRESIN});

        return {
            token,
            data: {
                user: {
                    username: foundUser.username,
                    email: foundUser.email,
                    displayName: foundUser.displayName,
                    avatar: foundUser.avatar,
                    bio: foundUser.bio,
                    id: foundUser.id,
                }
            }
        }
    }

    // UPDDATE USER;
    async update(data: UpdateUserDto, id: string) {
        const foundUser = await this.userRepository.findOne({where: {id}})
        if(!foundUser){
            throw new NotFoundException('User not found')
        }

        if(data.email){
            foundUser.email = data.email;
        }

        if(data.username){
            foundUser.username = data.username;
        }

        if(data.password){
            foundUser.password = data.password;
        }

        if(data.displayName){
            foundUser.displayName = data.displayName;
        }

        if(data.avatar){
            foundUser.avatar = data.avatar;
        }

        if(data.bio){
            foundUser.bio = data.bio;
        }

        await this.userRepository.save(foundUser);

        const payload = {
            sub: foundUser.id,
            email: foundUser.email,
            username: foundUser.username,
            loggedInAt: Date.now(),
        }

        const JWT_SECRET = this.configService.getOrThrow('JWT_SECRET')
        const JWT_EXPIRESIN = this.configService.getOrThrow('JWT_EXPIRESIN')

        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRESIN});

        return {
            token,
            data: {
                user: {
                    username: foundUser.username,
                    email: foundUser.email,
                    displayName: foundUser.displayName,
                    avatar: foundUser.avatar,
                    bio: foundUser.bio,
                    id: foundUser.id,
                }
            }
        }
    }

    async findById(id: string){
        const user = await this.userRepository.findOne({where: {id}});
        if(!user){
            throw new NotFoundException("User does not exist")
        }

        return {
            id: user.id,
            username: user.username,
            displayName: user.displayName,
            email: user.email,
            avatar: user.avatar,
            bio: user.bio
        }
    }



}
