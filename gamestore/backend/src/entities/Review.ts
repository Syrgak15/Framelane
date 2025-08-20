import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    rating!: number;

    @Column()
    review!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => Product, (product) => product.reviews, { nullable: false })
    product!: Product;

}
