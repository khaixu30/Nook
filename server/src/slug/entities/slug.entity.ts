import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import type { Relation } from "typeorm";
import { Nook } from "../../nook/entities/nook.entity.js";
import { User } from "../../user/entities/user.entity.js";

@Entity()
export class Slug {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    name?: string;

    @Column()
    iconUrl?: string;

    @Column()
    userId?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Nook, (nook) => nook.slug)
    nooks: Relation<Nook[]>;

    @ManyToOne(() => User, (user) => user.slugs)
    user: Relation<User>;
}