import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Nook} from "./entities/nook.entity.js";
import {Repository} from "typeorm";
import {CreateNookDto} from "./dto/create-nook.dto.js";
import {UpdateNookDto} from "./dto/update-nook.dto.js";

@Injectable()
export class NookService {
    constructor(
        @InjectRepository(Nook)
        private readonly nookRepository: Repository<Nook>,
    ) {}

    async create(data: CreateNookDto, userId: string) {
        const nook = this.nookRepository.create({
            ...data,
            userId
        });

        await this.nookRepository.save(nook);

        return { data: nook }
    }

    async findAndUpdate(data: UpdateNookDto, nookId: string, userId: string){
        const nook = await this.nookRepository.findOne({where: {id: nookId, userId}})
        if(!nook){
            throw new NotFoundException('No nook found')
        }

        if(data.isPublic != nook.isPublic && data.isPublic != undefined)
            nook.isPublic = data.isPublic;
        if(data.clickToViewUrl)
            nook.clickToViewUrl = data.clickToViewUrl;
        if(data.name)
            nook.name = data.name;
        if(data.contentUrl)
            nook.contentUrl = data.contentUrl;
        if(data.slugId)
            nook.slugId = data.slugId;
        if(data.description)
            nook.description = data.description;

        await this.nookRepository.save(nook);
        return { data: nook }
    }

    async delete(nookId: string, userId: string){
        const nook = await this.nookRepository.findOne({where: {id: nookId, userId}});
        if(!nook){
            throw new NotFoundException('No nook found')
        }

        await this.nookRepository.delete({id: nookId})

        return { data: nook, message: 'Deleted successfully'};
    }

    async getMyNooks(userId: string){
        const nooks = await this.nookRepository.find({where: {userId}})
        if(nooks.length == 0){
            throw new NotFoundException('You don\'t have any nook')
        }

        return {data: nooks}
    }

    async getById(id: string, userId: string){
        const nook = await this.nookRepository.findOne({where: {id, userId}})
        if(!nook){
            throw new NotFoundException('Nook not found')
        }

        return {data: nook};
    }

}
