import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Product } from "./Product";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text", { nullable: true })
    content!: string;

    @Column({ type: "int" })
    rating!: number;

    @ManyToOne(() => Users, (user) => user.reviews, { onDelete: "CASCADE" })
    user!: Users;

    @ManyToOne(() => Product, (product) => product.reviews, { onDelete: "CASCADE" })
    product!: Product;
}
