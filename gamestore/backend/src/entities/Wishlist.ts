import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    slug!: string;

    @Column({ nullable: true })
    image!: string;

    @Column({ type: "float", nullable: true })
    price!: number | null;

    @Column({ type: "float", nullable: true })
    rating!: number | null;

    @ManyToOne(() => Users, (user) => user.wishlist, { onDelete: "CASCADE" })
    user!: Users;
}
