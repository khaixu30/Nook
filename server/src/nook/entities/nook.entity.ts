import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId,
    Unique,
    UpdateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { User } from "../../user/entities/user.entity.js";
import { Slug } from "../../slug/entities/slug.entity.js";

@Entity('nooks')
@Unique(['user', 'slug'])
export class Nook {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(() => User, (user) => user.nooks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    @RelationId((nook: Nook) => nook.user)
    userId: string;

    @ManyToOne(() => Slug, (slug) => slug.nooks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'slug_id' })
    slug: Relation<Slug>;

    @RelationId((nook: Nook) => nook.slug)
    slugId: string;

    @Column()
    name?: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    contentUrl?: string;

    @Column({ nullable: true })
    clickToViewUrl?: string;

    @Column({ default: false })
    isPublic?: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}