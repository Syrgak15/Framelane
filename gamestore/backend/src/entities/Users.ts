import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Wishlist } from "./Wishlist";
import { Review } from "./Review";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
    wishlist!: Wishlist[];

    @OneToMany(() => Review, (review) => review.user)
    reviews!: Review[];
}
