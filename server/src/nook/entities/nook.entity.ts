import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
    Unique,
    UpdateDateColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity.js";

@Entity('nooks')
@Unique(['user', 'slug'])
export class Nook {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ManyToOne(() => User, (user) => user.nooks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    @Column()
    name?: string;

    @Column()
    slug?: string;

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