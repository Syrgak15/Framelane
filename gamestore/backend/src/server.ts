import "reflect-metadata";
import express from "express";
import cors from "cors";
import {DataSource, DeepPartial } from "typeorm";
import { Product } from "./entities/Product";
import {Review} from "./entities/Review";
import {Wishlist} from "./entities/Wishlist";

const app = express();
app.use(cors());
app.use(express.json());

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: true,
    entities: [Product, Review, Wishlist],
});

AppDataSource.initialize().then(async () => {
    const repo = AppDataSource.getRepository(Product);
    const wishlistRepo = AppDataSource.getRepository(Wishlist);
    const PORT = process.env.PORT || 5000;
    app.get("/", (req, res) => {
        res.send(`Server is running on port✅`);
    });

    app.get("/products", async (req, res) => {
        const limit = parseInt(req.query.limit as string) || 5;
        const products = await repo.find({take: limit});
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
            const limit = parseInt(req.query.limit as string) || 5;
            const reviewRepo = AppDataSource.getRepository(Review);
            const reviews = await reviewRepo.find({
                relations: ["product"],
                take: limit,
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

    app.post("/wishlist", async (req, res) => {
        try {
            const { id, title, image, price, rating } = req.body || {};

            if (!title || typeof title !== "string" || !title.trim()) {
                return res.status(400).json({ error: 'Field "title" is required' });
            }

            let numericRating: number | null = null;
            if (rating !== undefined && rating !== null && rating !== "") {
                const n = Number(rating);
                if (!Number.isFinite(n)) {
                    return res.status(400).json({ error: 'Field "rating" must be a number' });
                }
                numericRating = n;
            }

            let item;
            if (id) {
                // если указан id → ищем и обновляем
                item = await wishlistRepo.findOne({ where: { id } });
                if (item) {
                    item.title = title.trim();
                    if (image !== undefined) item.image = image;
                    if (price !== undefined) item.price = price;
                    if (numericRating !== null) item.rating = numericRating;

                    item = await wishlistRepo.save(item);
                    return res.status(200).json({ status: "updated", item });
                }
            }

            // если нет id или не нашли → создаём новый
            const draft: DeepPartial<Wishlist> = {
                id: typeof id === "number" ? id : undefined,
                title: title.trim(),
                image: image ?? null,
                price: price ?? null,
                rating: numericRating,
            };

            const created = await wishlistRepo.save(wishlistRepo.create(draft));
            return res.status(201).json({ status: "created", item: created });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: "Server error" });
        }
    });

    app.get("/wishlist", async (_req, res) => {
        try {
            const wishlistItems = await wishlistRepo.find();
            res.json(wishlistItems);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    });



    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}).catch(err => console.error(err));
