import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Nook} from "../../nook/entities/nook.entity.js";
import {Slug} from "../../slug/entities/slug.entity.js";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({unique: true, nullable: false})
    username?: string;

    @Column({unique: true, nullable: false})
    email?: string;

    @Column({nullable: false})
    password?: string;

    @Column({nullable: false, default: 'Nook User', name: 'display_name'})
    displayName?: string;

    @Column()
    avatar?: string;

    @Column()
    bio?: string;

    @Column({name: 'created_at'})
    @CreateDateColumn()
    createdAt: Date;

    @Column({name: 'updated_at'})
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Nook, (nook) => nook.user)
    nooks: Nook[]

    @OneToMany(() => Slug, (slug) => slug.user)
    slugs: Slug[];
}