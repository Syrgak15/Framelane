import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Wishlist {
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

    @Column({ type: "float", nullable: true })
    rating?: number | null;
}
