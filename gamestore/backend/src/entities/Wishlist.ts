import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique} from "typeorm";
import { Users } from "./Users";

@Entity()
@Unique(["slug", "user"])
export class Wishlist {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    slug!: string;

    @Column({ nullable: true })
    image!: string;

    @Column({ type: "real", nullable: true })
    price!: number | null;

    @Column({ type: "real", nullable: true })
    rating!: number | null;

    @ManyToOne(() => Users, (user) => user.wishlist, { onDelete: "CASCADE" })
    user!: Users;
}
