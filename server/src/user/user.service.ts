import {ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity.js";
import {Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {createUserDto} from "./dto/createUser.dto.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
    ) {}

    async create(data: createUserDto) {
        if(data.password !== data.password_confirmation){
            throw new ConflictException('Passwords do not match.')
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
            _id: newUser.id,
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
                user: newUser
            }
        };
    }
}
