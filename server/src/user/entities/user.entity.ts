import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { Nook } from "../../nook/entities/nook.entity.js";
import { Slug } from "../../slug/entities/slug.entity.js";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ unique: true, nullable: false })
    username?: string;

    @Column({ unique: true, nullable: false })
    email?: string;

    @Column({ nullable: false })
    password?: string;

    @Column({ nullable: false, default: 'Nook User', name: 'display_name' })
    displayName?: string;

    @Column({ nullable: true })
    avatar?: string;

    @Column({ nullable: true })
    bio?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => Nook, (nook) => nook.user)
    nooks: Relation<Nook[]>;

    @OneToMany(() => Slug, (slug) => slug.user)
    slugs: Relation<Slug[]>;
}