import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../user/entities/user.entity.js";
import {Slug} from "../../slug/entities/slug.entity.js";

@Entity()
export class Nook{
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name?: string;

    @Column()
    userId?: string;

    @Column()
    sludId?: string;

    @Column()
    description?: string;

    @Column()
    contentUrl?: string;

    @Column()
    clickToViewUrl?: string;

    @Column()
    isPublic?: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.nooks)
    user: User;

    @ManyToOne(() => Slug, (slug) => slug.nooks)
    slug: Slug;
}