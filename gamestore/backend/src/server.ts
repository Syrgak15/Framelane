import "reflect-metadata";
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import cors from "cors";
import { DataSource, DeepPartial } from "typeorm";
import { Product } from "./entities/Product";
import { Review } from "./entities/Review";
import { Wishlist } from "./entities/Wishlist";
import { Users } from "./entities/Users";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: true,
    entities: [Product, Review, Wishlist, Users],
});

const server = createServer(app);
const wss = new WebSocketServer({ server });

function broadcast(data: any) {
    const msg = JSON.stringify(data);
    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(msg);
        }
    });
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// 🔹 middleware для проверки токена
function authMiddleware(req: any, res: any, next: any) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = decoded;
        next();
    });
}

AppDataSource.initialize()
    .then(async () => {
        const productRepo = AppDataSource.getRepository(Product);
        const wishlistRepo = AppDataSource.getRepository(Wishlist);
        const reviewRepo = AppDataSource.getRepository(Review);
        const userRepo = AppDataSource.getRepository(Users);

        const PORT = process.env.PORT || 5000;

        // 🔹 health check
        app.get("/", (_req, res) => {
            res.send("✅ Server is running");
        });

        // 🔹 Products
        app.get("/products", async (req, res) => {
            const limit = parseInt(req.query.limit as string) || 5;
            const products = await productRepo.find({ take: limit });
            res.json(products);
        });

        app.get("/product/:slug", async (req, res) => {
            const { slug } = req.params;
            const product = await productRepo.findOneBy({ slug });
            if (!product) return res.status(404).json({ error: "Product not found" });
            res.json(product);
        });

        // 🔹 Reviews
        app.post("/reviews/:slug", authMiddleware, async (req, res) => {
            try {
                const { rating, review } = req.body;
                const { slug } = req.params;

                if (!rating || !review) {
                    return res.status(400).json({ error: "Rating and review are required" });
                }

                const numRating = Math.round(Number(rating));
                if (!Number.isFinite(numRating) || numRating < 1 || numRating > 5) {
                    return res.status(400).json({ error: "Rating must be 1–5" });
                }

                const product = await productRepo.findOneBy({ slug });
                if (!product) {
                    return res.status(404).json({ error: "Product not found" });
                }

                const draft: DeepPartial<Review> = {
                    content: String(review).trim(),
                    rating: numRating,
                    product,
                    user: { id: req?.user?.id },
                };

                const entity = reviewRepo.create(draft);
                const saved = await reviewRepo.save(entity);

                const { product: _omit, user: _omit2, ...payload } = saved;
                return res.status(201).json(payload);
            } catch (e) {
                console.error(e);
                return res.status(500).json({ error: "Server error" });
            }
        });

        app.get("/reviews/:slug", async (req, res) => {
            try {
                const { slug } = req.params;
                const product = await productRepo.findOne({
                    where: { slug },
                    relations: ["reviews"],
                });

                if (!product) return res.status(404).json({ error: "Product not found" });
                return res.json(product.reviews);
            } catch (e) {
                console.error(e);
                return res.status(500).json({ error: "Server error" });
            }
        });

        app.get("/reviews", async (req, res) => {
            try {
                const limit = parseInt(req.query.limit as string) || 5;
                const reviews = await reviewRepo.find({
                    relations: ["product", "user"],
                    take: limit,
                });
                return res.json(reviews);
            } catch (e) {
                console.error(e);
                return res.status(500).json({ error: "Server error" });
            }
        });

        // 🔹 Wishlist
        app.get("/wishlist", authMiddleware, async (req, res) => {
            try {
                const items = await wishlistRepo.find({
                    where: { user: { id: req?.user?.id } },
                });
                res.json(items);
            } catch (e) {
                console.error(e);
                res.status(500).json({ error: "Server error" });
            }
        });

        app.post("/wishlist", authMiddleware, async (req, res) => {
            try {
                const { id: rawId, title, slug, image, price, rating } = req.body || {};

                if (!title?.trim()) return res.status(400).json({ error: "Title is required" });
                if (!slug?.trim()) return res.status(400).json({ error: "Slug is required" });

                let item;
                if (rawId) {
                    item = await wishlistRepo.findOne({ where: { id: rawId, user: { id: req?.user?.id } }, relations: ["user"] });
                    if (item) {
                        item.title = title.trim();
                        item.slug = slug.trim();
                        item.image = image ?? null;
                        item.price = price ? Number(price) : null;
                        item.rating = rating ? Number(rating) : null;

                        const updated = await wishlistRepo.save(item);
                        broadcast({ type: "wishlist_updated", item: updated });
                        return res.status(200).json({ status: "updated", item: updated });
                    }
                }

                const existing = await wishlistRepo.findOne({
                    where: { slug: slug.trim(), user: { id: req?.user?.id } },
                    relations: ["user"],
                });
                if (existing) return res.status(409).json({ error: "Item already exists in wishlist" });

                item = wishlistRepo.create({
                    title: title.trim(),
                    slug: slug.trim(),
                    image: image ?? null,
                    price: price ? Number(price) : null,
                    rating: rating ? Number(rating) : null,
                    user: { id: req?.user?.id },
                });

                const created = await wishlistRepo.save(item);
                broadcast({ type: "wishlist_created", item: created });
                return res.status(201).json({ status: "created", item: created });
            } catch (e) {
                console.error("Wishlist error:", e);
                return res.status(500).json({ error: "Server error" });
            }
        });

        app.delete("/wishlist", authMiddleware, async (req, res) => {
            try {
                const { slug } = req.body || {};
                if (!slug?.trim()) return res.status(400).json({ error: "Slug is required" });

                const item = await wishlistRepo.findOne({
                    where: { slug: slug.trim(), user: { id: req?.user?.id } },
                    relations: ["user"],
                });
                if (!item) return res.status(404).json({ error: "Item not found" });

                await wishlistRepo.remove(item);
                broadcast({ type: "wishlist_deleted", slug: slug.trim() });
                return res.status(200).json({ status: "deleted", slug: slug.trim() });
            } catch (e) {
                console.error("Wishlist delete error:", e);
                return res.status(500).json({ error: "Server error" });
            }
        });

        app.delete("/wishlist/all", authMiddleware, async (req, res) => {
            try {
                await wishlistRepo.delete({ user: { id: req?.user?.id } });
                broadcast({ type: "wishlist_cleared", userId: req?.user?.id });
                return res.status(200).json({ status: "all deleted" });
            } catch (e) {
                console.error("Wishlist clear error:", e);
                return res.status(500).json({ error: "Server error" });
            }
        });

        // 🔹 Auth
        app.post("/register", async (req, res) => {
            try {
                const { email, password, username } = req.body;

                if (!email || !password || !username) {
                    return res.status(400).json({ error: "Email, username and password are required" });
                }

                const existsEmail = await userRepo.findOne({ where: { email } });
                if (existsEmail) return res.status(409).json({ error: "User with this email already exists" });

                const existsUsername = await userRepo.findOne({ where: { username } });
                if (existsUsername) return res.status(409).json({ error: "Username already taken" });

                const hashedPassword = await hash(password, 10);

                const newUser = userRepo.create({ email, username, password: hashedPassword });
                await userRepo.save(newUser);

                res.status(201).json({ message: "User created successfully" });
            } catch (e) {
                console.error(e);
                res.status(500).json({ error: "Server error" });
            }
        });

        app.post("/login", async (req, res) => {
            try {
                const { email, password } = req.body;
                if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

                const user = await userRepo.findOne({ where: { email } });
                if (!user) return res.status(401).json({ error: "Invalid credentials" });

                const isPasswordValid = await compare(password, user.password);
                if (!isPasswordValid) return res.status(401).json({ error: "Invalid credentials" });

                const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, {
                    expiresIn: "1h",
                });

                res.json({
                    token,
                    user: { id: user.id, email: user.email, username: user.username },
                });
            } catch (e) {
                console.error(e);
                res.status(500).json({ error: "Server error" });
            }
        });

        server.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.error(err));
