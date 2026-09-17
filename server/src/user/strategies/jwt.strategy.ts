import {PassportStrategy} from "@nestjs/passport";
import {ConfigService} from "@nestjs/config";
import {UserService} from "../../user/user.service.js";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable, UnauthorizedException} from "@nestjs/common";

export interface JwtPayload{
    sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ){
        const JWT_SECRET = configService.get('JWT_SECRET')
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET
        })
    }

    async validate(payload: JwtPayload){
        const user = await this.userService.findById(payload.sub);
        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}