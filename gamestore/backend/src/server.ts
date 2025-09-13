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
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
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

// 🔑 секреты для токенов
const JWT_SECRET = process.env.JWT_SECRET || "supersecret"; // access
const JWT_REFRESH_SECRET =
    process.env.JWT_REFRESH_SECRET || "superrefresh"; // refresh

// Middleware для проверки accessToken
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

        // 🔹 Health check
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
            if (!product)
                return res.status(404).json({ error: "Product not found" });
            res.json(product);
        });

        // 🔹 Reviews
        app.post("/reviews/:slug", authMiddleware, async (req, res) => {
            try {
                const { name, surname, email, review, rating } = req.body;
                const { slug } = req.params;

                if (!review || !rating || !name || !email) {
                    return res.status(400).json({ error: "Name, email, rating and review are required" });
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
                    name: String(name).trim(),
                    surname: surname ? String(surname).trim() : undefined,
                    email: String(email).trim(),
                };


                const entity = reviewRepo.create(draft);
                const saved = await reviewRepo.save(entity);

                return res.status(201).json({
                    id: saved.id,
                    name,
                    surname: surname ?? null,
                    email,
                    review: saved.content,
                    rating: saved.rating,
                    userId: req?.user?.id,
                });
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
                    relations: ["reviews", "reviews.user"],
                });

                if (!product) {
                    return res.status(404).json({ error: "Product not found" });
                }

                const reviews = product.reviews.map(r => ({
                    id: r.id,
                    content: r.content,
                    rating: r.rating,
                    userId: r.user?.id ?? null,
                    name: r.name,
                    surname: r.surname,
                    email: r.email,
                    createdAt: r.createdAt,
                }));

                return res.json(reviews);
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
                const { id: rawId, title, slug, image, price, rating } =
                req.body || {};

                if (!title?.trim())
                    return res.status(400).json({ error: "Title is required" });
                if (!slug?.trim())
                    return res.status(400).json({ error: "Slug is required" });

                let item;
                if (rawId) {
                    item = await wishlistRepo.findOne({
                        where: { id: rawId, user: { id: req?.user?.id } },
                        relations: ["user"],
                    });
                    if (item) {
                        item.title = title.trim();
                        item.slug = slug.trim();
                        item.image = image ?? null;
                        item.price = price ? Number(price) : null;
                        item.rating = rating ? Number(rating) : null;

                        const updated = await wishlistRepo.save(item);
                        broadcast({ type: "wishlist_updated", item: updated });
                        return res
                            .status(200)
                            .json({ status: "updated", item: updated });
                    }
                }

                const normalizeNumber = (value: any): number | null => {
                    if (
                        value === undefined ||
                        value === null ||
                        value === ""
                    )
                        return null;

                    const cleaned = String(value).replace(/[^0-9.]/g, "");
                    const parsed = Number(cleaned);

                    return isNaN(parsed) ? null : parsed;
                };

                const existing = await wishlistRepo.findOne({
                    where: { slug: slug.trim(), user: { id: req?.user?.id } },
                    relations: ["user"],
                });
                if (existing)
                    return res
                        .status(409)
                        .json({ error: "Item already exists in wishlist" });

                const parsedPrice = normalizeNumber(price);
                const parsedRating = normalizeNumber(rating);

                item = wishlistRepo.create({
                    title: title.trim(),
                    slug: slug.trim(),
                    image: image ?? null,
                    price: parsedPrice,
                    rating: parsedRating,
                    user: { id: req?.user?.id },
                });

                const created = await wishlistRepo.save(item);
                broadcast({ type: "wishlist_created", item: created });
                return res
                    .status(201)
                    .json({ status: "created", item: created });
            } catch (e) {
                console.error("Wishlist error:", (e as any).message);
                return res.status(500).json({
                    error: "Server error",
                    details: (e as any).message,
                });
            }
        });

        app.delete("/wishlist", authMiddleware, async (req, res) => {
            try {
                const { slug } = req.body || {};
                if (!slug?.trim())
                    return res.status(400).json({ error: "Slug is required" });

                const item = await wishlistRepo.findOne({
                    where: { slug: slug.trim(), user: { id: req?.user?.id } },
                    relations: ["user"],
                });
                if (!item)
                    return res.status(404).json({ error: "Item not found" });

                await wishlistRepo.remove(item);
                broadcast({ type: "wishlist_deleted", slug: slug.trim() });
                return res
                    .status(200)
                    .json({ status: "deleted", slug: slug.trim() });
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
                    return res
                        .status(400)
                        .json({ error: "Email, username and password are required" });
                }

                const existsEmail = await userRepo.findOne({ where: { email } });
                if (existsEmail)
                    return res
                        .status(409)
                        .json({ error: "User with this email already exists" });

                const existsUsername = await userRepo.findOne({ where: { username } });
                if (existsUsername)
                    return res.status(409).json({ error: "Username already taken" });

                const hashedPassword = await hash(password, 10);

                const newUser = userRepo.create({
                    email,
                    username,
                    password: hashedPassword,
                });
                await userRepo.save(newUser);

                res
                    .status(201)
                    .json({ message: "User created successfully" });
            } catch (e) {
                console.error(e);
                res.status(500).json({ error: "Server error" });
            }
        });

        // login теперь отдаёт access + refresh
        app.post("/login", async (req, res) => {
            try {
                const { email, password } = req.body;
                if (!email || !password)
                    return res
                        .status(400)
                        .json({ error: "Email and password are required" });

                const user = await userRepo.findOne({ where: { email } });
                if (!user)
                    return res.status(401).json({ error: "Invalid credentials" });

                const isPasswordValid = await compare(password, user.password);
                if (!isPasswordValid)
                    return res.status(401).json({ error: "Invalid credentials" });

                const accessToken = jwt.sign(
                    { id: user.id, email: user.email, username: user.username },
                    JWT_SECRET,
                    { expiresIn: "15m" }
                );

                const refreshToken = jwt.sign(
                    { id: user.id },
                    JWT_REFRESH_SECRET,
                    { expiresIn: "7d" }
                );

                res.json({
                    accessToken,
                    refreshToken,
                    expiresIn: 15 * 60,
                    user: { id: user.id, email: user.email, username: user.username },
                });
            } catch (e) {
                console.error(e);
                res.status(500).json({ error: "Server error" });
            }
        });

        // refresh токен
        app.post("/refresh", async (req, res) => {
            const { refreshToken } = req.body;
            if (!refreshToken)
                return res
                    .status(401)
                    .json({ error: "No refresh token provided" });

            try {
                const decoded: any = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

                const newAccessToken = jwt.sign(
                    { id: decoded.id, email: decoded.email, username: decoded.username },
                    JWT_SECRET,
                    { expiresIn: "15m" }
                );

                return res.json({
                    accessToken: newAccessToken,
                    refreshToken, // можно ротацию сделать
                    expiresIn: 15 * 60,
                });
            } catch (e) {
                return res
                    .status(403)
                    .json({ error: "Invalid or expired refresh token" });
            }
        });

        server.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.error(err));
