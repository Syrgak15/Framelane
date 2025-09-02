import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ unique: true, type: "text" })
    slug!: string;

    @Column()
    image!: string;

    @Column("real", { nullable: true })
    price!: number | null;

    @Column({ type: "float", nullable: true })
    rating?: number | null;
}
