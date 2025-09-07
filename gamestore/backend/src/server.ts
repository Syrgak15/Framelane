import "reflect-metadata";
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import cors from "cors";
import { DataSource, DeepPartial } from "typeorm";
import { Product } from "./entities/Product";
import { Review } from "./entities/Review";
import { Wishlist } from "./entities/Wishlist";

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

// общий сервер (Express + WebSocket)
const server = createServer(app);
const wss = new WebSocketServer({ server });

// рассылка всем клиентам
function broadcast(data: any) {
    const msg = JSON.stringify(data);
    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(msg);
        }
    });
}

AppDataSource.initialize()
    .then(async () => {
        const repo = AppDataSource.getRepository(Product);
        const wishlistRepo = AppDataSource.getRepository(Wishlist);
        const PORT = process.env.PORT || 5000;

        app.get("/", (_req, res) => {
            res.send("✅ Server is running");
        });


        app.get("/products", async (req, res) => {
            const limit = parseInt(req.query.limit as string) || 5;
            const products = await repo.find({ take: limit });
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
            const toNumberOrNull = (v: unknown): number | null | "NaN" => {
                if (v === undefined || v === null || v === "") return null;
                const cleaned = String(v).replace(/[^\d.\-+]/g, "");
                const n = Number(cleaned);
                return Number.isFinite(n) ? n : "NaN";
            };

            const toIntOrNull = (v: unknown): number | null => {
                if (v === undefined || v === null || v === "") return null;
                const n = Number(v);
                return Number.isInteger(n) ? n : null;
            };

            try {
                const { id: rawId, title, slug, image, price, rating } = req.body || {};

                if (!title || typeof title !== "string" || !title.trim()) {
                    return res.status(400).json({ error: 'Field "title" is required' });
                }
                if (!slug || typeof slug !== "string" || !slug.trim()) {
                    return res.status(400).json({ error: 'Field "slug" is required' });
                }

                const numericPrice = toNumberOrNull(price);
                if (numericPrice === "NaN") {
                    return res.status(400).json({ error: 'Field "price" must be a number' });
                }

                const numericRating = toNumberOrNull(rating);
                if (numericRating === "NaN") {
                    return res.status(400).json({ error: 'Field "rating" must be a number' });
                }

                const id = toIntOrNull(rawId);

                if (id !== null) {
                    const item = await wishlistRepo.findOne({ where: { id } });
                    if (item) {
                        item.title = title.trim();
                        item.slug = slug.trim();

                        if (image !== undefined) item.image = image ?? null;

                        if (price !== undefined) {
                            item.price = numericPrice as number | null;
                        }

                        if (rating !== undefined) {
                            item.rating = (numericRating as number | null) ?? null;
                        }

                        const saved = await wishlistRepo.save(item);
                        return res.status(200).json({ status: "updated", item: saved });
                    }
                }

                const draft: DeepPartial<Wishlist> = {
                    title: title.trim(),
                    slug: slug.trim(),
                    image: image ?? null,
                    price: (numericPrice as number | null) ?? null,
                    rating: (numericRating as number | null) ?? null,
                };

                const created = await wishlistRepo.save(wishlistRepo.create(draft));
                return res.status(201).json({ status: "created", item: created });
            } catch (e: any) {
                console.error("Wishlist error:", {
                    name: e?.name,
                    code: e?.code,
                    message: e?.message,
                    detail: e?.detail,
                    stack: e?.stack,
                });

                if (e?.code === "SQLITE_CONSTRAINT") {
                    const msg = String(e?.message || "");
                    if (/UNIQUE constraint failed/i.test(msg)) {
                        return res.status(409).json({ error: "Unique constraint violated (likely slug or title already exists)" });
                    }
                    if (/NOT NULL constraint failed/i.test(msg)) {
                        return res.status(400).json({ error: "NOT NULL constraint failed (check required fields)" });
                    }
                    return res.status(409).json({ error: "Constraint violation" });
                }

                if (e?.code === "SQLITE_MISMATCH") {
                    return res.status(400).json({ error: "Datatype mismatch (check numeric fields)" });
                }

                return res.status(500).json({ error: "Server error" });
            }
        });

        app.post("/wishlist", async (req, res) => {
            try {
                const { id: rawId, title, slug, image, price, rating } = req.body || {};
                if (!title?.trim()) return res.status(400).json({ error: 'Field "title" is required' });
                if (!slug?.trim()) return res.status(400).json({ error: 'Field "slug" is required' });

                if (rawId) {
                    const item = await wishlistRepo.findOne({ where: { id: rawId } });
                    if (item) {
                        item.title = title.trim();
                        item.slug = slug.trim();
                        if (image !== undefined) item.image = image ?? null;
                        if (price !== undefined) item.price = Number(price) || null;
                        if (rating !== undefined) item.rating = Number(rating) || null;

                        const updated = await wishlistRepo.save(item);
                        broadcast({ type: "wishlist_updated", item: updated });
                        return res.status(200).json({ status: "updated", item: updated });
                    }
                }

                const existing = await wishlistRepo.findOne({ where: { slug: slug.trim() } });
                if (existing) return res.status(409).json({ error: "Item already exists in wishlist" });

                const draft: DeepPartial<Wishlist> = {
                    title: title.trim(),
                    slug: slug.trim(),
                    image: image ?? null,
                    price: Number(price) || null,
                    rating: Number(rating) || null,
                };

                const created = await wishlistRepo.save(wishlistRepo.create(draft));
                broadcast({ type: "wishlist_created", item: created });
                return res.status(201).json({ status: "created", item: created });
            } catch (e) {
                console.error("Wishlist error:", e);
                return res.status(500).json({ error: "Server error" });
            }
        });

        app.delete("/wishlist", async (req, res) => {
            try {
                const { slug } = req.body || {};
                if (!slug?.trim()) return res.status(400).json({ error: 'Field "slug" is required' });

                const item = await wishlistRepo.findOne({ where: { slug: slug.trim() } });
                if (!item) return res.status(404).json({ error: "Item not found" });

                await wishlistRepo.remove(item);
                broadcast({ type: "wishlist_deleted", slug: slug.trim() });

                return res.status(200).json({ status: "deleted", slug: slug.trim() });
            } catch (e) {
                console.error("Wishlist delete error:", e);
                return res.status(500).json({ error: "Server error" });
            }
        });

        app.delete("/wishlist/all", async (_req, res) => {
            try {
                await wishlistRepo.clear(); // удаляет все записи из таблицы
                broadcast({ type: "wishlist_cleared" });

                return res.status(200).json({ status: "all deleted" });
            } catch (e) {
                console.error("Wishlist clear error:", e);
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

        // слушаем сервер (Express + WS)
        server.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.error(err));
