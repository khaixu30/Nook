import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateSlugDto} from "./dto/create-slug.dto.js";
import {Repository} from "typeorm";
import {Slug} from "./entities/slug.entity.js";
import {InjectRepository} from "@nestjs/typeorm";
import {UpdateSlugDto} from "./dto/update-slug.dto.js";

@Injectable()
export class SlugService {
    constructor(
        @InjectRepository(Slug)
        private readonly slugRepository: Repository<Slug>
    ) {
    }

    async create(data: CreateSlugDto, userId: string) {
        const slug = this.slugRepository.create({
            userId,
            name: data.name,
            iconUrl: data.iconUrl
        });

        await this.slugRepository.save(slug);
        return {data: slug}
    }

    async findById(id: string, userId: string) {
        const slug = await this.slugRepository.findOne({where: {id, userId}});
        if (!slug) {
            throw new NotFoundException('Slug maybe removed or doesn\'t exists');
        }

        return {data: slug};
    }

    async getMySlugs(userId: string) {
        const slugs = await this.slugRepository.find({where: {userId}});
        if (!slugs) {
            throw new NotFoundException('You do not have any slug, try creating some');
        }

        return {data: slugs};
    }

    async update(id: string, userId: string, data: UpdateSlugDto) {
        const slug = await this.slugRepository.findOne({where: {id, userId}});

        if (!slug) {
            throw new NotFoundException('Slug maybe removed or does\'t exists');
        }

        if (data.name) {
            slug.name = data.name;
        }

        if (data.iconUrl) {
            slug.iconUrl = data.iconUrl;
        }

        await this.slugRepository.save(slug);

        return {data: slug};
    }

    async delete(id: string, userId: string) {
        const slug = await this.slugRepository.findOne({where: {id, userId}});

        if(!slug) {
            throw new NotFoundException('Slug maybe removed or doesn\'t exists');
        }

        await this.slugRepository.delete({id});

        return {data: slug, message: 'Slug deleted successfully'};
    }
}
