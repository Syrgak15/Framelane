import "reflect-metadata";
import express from "express";
import cors from "cors";
import {DataSource, DeepPartial } from "typeorm";
import { Product } from "./entities/Product";
import {Review} from "./entities/Review";

const app = express();
app.use(cors());
app.use(express.json());

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: true,
    entities: [Product, Review],
});

AppDataSource.initialize().then(async () => {
    const repo = AppDataSource.getRepository(Product);
    const PORT = process.env.PORT || 5000;
    app.get("/", (req, res) => {
        res.send(`Server is running on port✅`);
    });

    app.get("/products", async (req, res) => {
        const products = await repo.find();
        res.json(products);
    });

    app.post("/reviews/:slug", async (req, res) => {
        try {
            const { name, surname, rating, review, email } = req.body;
            const { slug } = req.params;

            if (!name || !surname || !rating || !review || !email) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const numRating = Math.round(Number(rating));
            if (!Number.isFinite(numRating) || numRating < 1 || numRating > 5) {
                return res.status(400).json({ error: "Rating must be an integer 1–5" });
            }

            const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email));
            if (!emailValid) {
                return res.status(400).json({ error: "Invalid email" });
            }

            const product = await repo.findOneBy({ slug });
            if (!product) {
                return res.status(400).json({ error: "Product not found" });
            }

            const reviewRepo = AppDataSource.getRepository(Review);

            const draft: DeepPartial<Review> = {
                name: String(name).trim(),
                email: String(email).trim(),
                rating: Math.round(Number(rating)),
                review: String(review).trim(),
                product: { id: product.id },
            };

            const entity = reviewRepo.create(draft);
            const saved  = await reviewRepo.save(entity);

            const { product: _omit, ...payload } = saved;

            return res.status(201).json(payload);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: "Server error" });
        }
    });

    app.get("/reviews/:slug", async (req, res) => {
        try {
            const { slug } = req.params;
            const product = await repo.findOne({
                where: { slug },
                relations: ["reviews"],
            });

            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            return res.json(product.reviews);

        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: "Server error" });
        }
    });

    app.get("/reviews", async (req, res) => {
        try {
            const reviewRepo = AppDataSource.getRepository(Review);
            const reviews = await reviewRepo.find({
                relations: ["product"],
            });

            return res.json(reviews);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: "Server error" });
        }
    });


    app.get("/product/:slug", async (req, res) => {
        const { slug } = req.params;
        const product = await repo.findOneBy({ slug });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    });

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}).catch(err => console.error(err));
