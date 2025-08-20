import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Review} from "./Review";

type ProductInfo = {
    description: string;
    features: string[];
    materials: string;
    size: string;
};

type DeliveryInfo = {
    shipping_options: string[];
    cost: string;
    returns: string;
    international: string;
};

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ unique: true })
    slug!: string;

    @Column()
    image!: string;

    @Column()
    price!: string;

    @Column({ type: "simple-json", nullable: true })
    product!: ProductInfo;

    @Column({ type: "simple-json", nullable: true })
    delivery!: DeliveryInfo;

    @OneToMany(() => Review, (review) => review.product)
    reviews!: Review[];
}
