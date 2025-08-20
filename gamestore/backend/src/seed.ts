import { Product } from "./entities/Product";
import "reflect-metadata";
import {DataSource} from "typeorm";

const products = [
    {
        "title": "Clubmaster sunglasses",
        "slug": "clubmaster-sunglasses",
        "image": "https://www.darlingstopt.com.au/wp-content/uploads/2024/03/moscot-dahven.jpg",
        "price": "$11.5",
        "product": {
            "description": "The Clubmaster sunglasses are a perfect fusion of retro charm and modern sophistication. With their semi-rim frame, they deliver a look that has stood the test of time and continues to be favored by tastemakers around the world. The lenses offer full UV protection and anti-glare technology, making them reliable for daily wear in all light conditions. Designed with durable acetate and stainless steel, they combine strength with lightweight comfort. A versatile accessory, these sunglasses transition seamlessly from casual streetwear to more formal outfits. Ideal for anyone seeking classic style with modern functionality.",
            "features": [
                "Durable acetate and stainless steel frame",
                "UV400 protective lenses with anti-glare finish",
                "Adjustable nose pads for personalized fit",
                "Lightweight and comfortable for all-day wear"
            ],
            "materials": "Premium acetate, stainless steel, UV400 lenses",
            "size": "Medium fit – lens width 49mm, bridge 21mm, temple length 145mm"
        },
        "delivery": {
            "shipping_options": ["Standard delivery (3–5 business days)", "Express delivery (1–2 business days)"],
            "cost": "Free standard shipping on orders over $50. Express delivery from $6.95.",
            "returns": "30-day return policy. Items must be unworn and in original packaging.",
            "international": "Worldwide delivery available – costs calculated at checkout."
        }
    },
    {
        "title": "Aviator sunglasses",
        "slug": "aviator-sunglasses",
        "image": "https://moscot.com/cdn/shop/products/hyman-color-black-pos-2.jpg?v=1691335558&width=1024",
        "price": "$22.15",
        "product": {
            "description": "These Aviator sunglasses embody the adventurous spirit of travel and freedom. Originally designed for pilots, their timeless silhouette has become a global fashion icon. The polarized lenses reduce glare and enhance clarity, providing exceptional comfort in bright sunlight. The lightweight alloy frame ensures durability while maintaining a comfortable fit for long hours. Suitable for both men and women, they pair effortlessly with any style, from casual weekend wear to sleek professional outfits. A must-have accessory for those who value both style and practicality.",
            "features": [
                "Lightweight alloy frame",
                "Polarized anti-glare UV400 lenses",
                "Classic double bridge design",
                "Comfortable fit for extended wear"
            ],
            "materials": "Metal alloy, polarized UV400 lenses",
            "size": "Large fit – lens width 58mm, bridge 14mm, temple length 135mm"
        },
        "delivery": {
            "shipping_options": ["Standard delivery (3–5 business days)", "Next-day courier (available in select regions)"],
            "cost": "Standard delivery $4.95, free on orders above $40. Next-day courier $9.95.",
            "returns": "Free returns within 30 days.",
            "international": "Available in EU, US, Canada – flat rate $12.95."
        }
    },
    {
        "title": "Wayfarer sunglasses",
        "slug": "wayfarer-sunglasses",
        "image": "https://voskins.com/cdn/shop/products/lemtosh-color-tobacco-pos-2_1200x_2c7c747c-9b04-47e7-81f8-4f43edd4473c_1200x.jpg?v=1570564523",
        "price": "$15.3",
        "product": {
            "description": "The Wayfarer sunglasses are a symbol of effortless cool and timeless design. Their bold square frame has been a cultural staple for decades, seen on artists, musicians, and icons worldwide. Featuring UV400 protection, the lenses ensure your eyes are shielded from harmful rays while offering a crisp visual experience. Built with durable acetate, these frames are designed to withstand daily wear without losing their shape. Whether you're heading to the beach, a concert, or a city café, the Wayfarer design complements every occasion. A must-have for anyone who values classic, enduring style.",
            "features": [
                "Iconic square frame design",
                "UV400 protective lenses",
                "Durable acetate frame construction",
                "Unisex design suitable for all occasions"
            ],
            "materials": "Premium acetate, UV400 lenses",
            "size": "Medium fit – lens width 52mm, bridge 18mm, temple length 145mm"
        },
        "delivery": {
            "shipping_options": ["Standard delivery (3–5 business days)", "Express delivery (1–2 business days)"],
            "cost": "Free shipping for orders over $45. Standard shipping $5.95.",
            "returns": "30-day hassle-free returns.",
            "international": "Worldwide delivery – rates shown at checkout."
        }
    },
    {
        "title": "Moyel",
        "slug": "moyel",
        "image": "https://dayalopticalsindia.com/cdn/shop/files/dahven-color-black-pos-2_1300x_63014558-cd19-4f98-ac57-e3d91b4d64e5.webp?v=1698818084",
        "price": "$15.5",
        "product": {
            "description": "The Moyel sunglasses deliver understated style with modern detailing. Their balanced frame design offers a perfect blend of comfort and elegance, making them suitable for everyday wear. The UV-protective lenses provide full coverage against harmful rays, ensuring eye health even in the brightest conditions. Constructed with premium-quality materials, these sunglasses are both lightweight and long-lasting. A versatile choice, the Moyel seamlessly adapts to both casual and professional looks. With their minimalist aesthetic, they’re a timeless staple for any eyewear collection.",
            "features": [
                "Balanced contemporary frame design",
                "UV400 protective lenses",
                "Durable and lightweight structure",
                "Comfortable fit for daily wear"
            ],
            "materials": "High-quality acetate, stainless steel, UV400 lenses",
            "size": "Standard fit – lens width 50mm, bridge 19mm, temple length 140mm"
        },
        "delivery": {
            "shipping_options": ["Standard delivery (3–5 business days)", "Priority shipping (1–2 business days)"],
            "cost": "Standard delivery $4.95, priority $7.95.",
            "returns": "Free 30-day return policy.",
            "international": "Worldwide delivery available."
        }
    },
    {
        "title": "Round Frame sunglasses",
        "slug": "round-frame-sunglasses",
        "image": "https://moscot.com/cdn/shop/files/lemtosh-sun-color-grey-pos-2.jpg?v=1723825039&width=2295",
        "price": "$18.99",
        "product": {
            "description": "Round Frame sunglasses bring a vintage-inspired aesthetic with modern enhancements for comfort and durability. Their circular lenses evoke classic 60s and 70s vibes while offering full UV400 protection. Lightweight yet sturdy, these frames are ideal for those who want to stand out with an iconic, intellectual style. The design complements all face shapes, adding softness and sophistication. Perfect for creative individuals and trendsetters, Round Frame sunglasses are versatile enough for both casual and chic settings. A timeless option with a fresh twist for the modern wardrobe.",
            "features": [
                "Retro circular lens design",
                "UV400 protective lenses",
                "Comfortable lightweight construction",
                "Unisex design suitable for all-day wear"
            ],
            "materials": "Acetate frame, UV400 lenses",
            "size": "Medium fit – lens width 47mm, bridge 21mm, temple length 145mm"
        },
        "delivery": {
            "shipping_options": ["Standard delivery (3–5 business days)", "Express delivery (1–2 business days)"],
            "cost": "Free delivery on orders above $50.",
            "returns": "30-day returns accepted.",
            "international": "Worldwide delivery with calculated rates."
        }
    },
    {
        "title": "Square Frame sunglasses",
        "slug": "square-frame-sunglasses",
        "image": "https://beseen.store/cdn/shop/files/vbnjkmljhygtfrftgyhuji.gif?v=1750492134",
        "price": "$20.75",
        "product": {
            "description": "Square Frame sunglasses deliver boldness and structure with their angular design. The strong silhouette flatters a wide range of face shapes and brings a confident edge to any outfit. With high-quality UV400 lenses, these sunglasses provide full eye protection without compromising on style. Built from durable materials, they’re made to withstand active lifestyles while maintaining elegance. Their versatile design makes them suitable for casual streetwear, business looks, or holiday outfits. A modern must-have for those who want to make a statement.",
            "features": [
                "Bold square-shaped design",
                "UV400 protective lenses",
                "Durable frame for everyday use",
                "Lightweight yet sturdy build"
            ],
            "materials": "Premium acetate, UV400 lenses",
            "size": "Large fit – lens width 55mm, bridge 17mm, temple length 145mm"
        },
        "delivery": {
            "shipping_options": ["Standard shipping (3–5 business days)", "Express courier (1–2 business days)"],
            "cost": "Free standard shipping above $60.",
            "returns": "30-day free returns.",
            "international": "International shipping available."
        }
    },
    {
        "title": "Gradient Lens sunglasses",
        "slug": "gradient-lens-sunglasses",
        "image": "https://moscot.com/cdn/shop/products/smendrik-sun-color-silver-pos-2.jpg?v=1691366940&width=1300",
        "price": "$19.60",
        "product": {
            "description": "Gradient Lens sunglasses combine fashion-forward design with superior functionality. Their gradient-tinted lenses offer eye protection while allowing for smoother vision transitions in different light conditions. The stylish look is enhanced by a slim and durable frame, making them a perfect choice for daily wear. These sunglasses are particularly suited for driving, city strolls, or enjoying the outdoors. Their sleek silhouette ensures they complement a wide range of outfits. A fashionable yet practical choice for those who demand more from their eyewear.",
            "features": [
                "Gradient-tinted UV400 lenses",
                "Durable slim frame design",
                "Ideal for driving and outdoor use",
                "Fashionable unisex design"
            ],
            "materials": "Metal alloy, gradient UV400 lenses",
            "size": "Standard fit – lens width 52mm, bridge 19mm, temple length 140mm"
        },
        "delivery": {
            "shipping_options": ["Standard delivery (3–5 business days)", "Next-day shipping available"],
            "cost": "Standard delivery $5.95, free above $50.",
            "returns": "Free returns within 30 days.",
            "international": "Available worldwide – shipping cost at checkout."
        }
    },
    {
        "title": "Classic Black Frame",
        "slug": "classic-black-frame",
        "image": "https://moscot.com/cdn/shop/files/mekler-sun-color-tobacco-pos-1_3d4ea48c-0b18-46b8-bfb5-3d3792ab0631_1800x.jpg?v=1737745345",
        "price": "$17.25",
        "size": "Medium fit – lens width 50mm, bridge 20mm, temple length 145mm",
        "delivery": {
            "shipping_options": ["Standard delivery (3–5 business days)", "Express delivery (1–2 business days)"],
            "cost": "Free delivery above $45.",
            "returns": "30-day satisfaction guarantee.",
            "international": "Worldwide shipping available."
        }
    },
    {
        "title": "Dahven - Vintage Style",
        "slug": "dahven-vintage-style",
        "image": "https://i.pinimg.com/1200x/25/2e/2f/252e2f28384fa20ce8ea099a5c2dac21.jpg",
        "price": "$14.80",
        "product": {
            "description": "The Dahven Vintage Style sunglasses are inspired by timeless mid-century designs that remain relevant today. With a classic rounded frame and subtle detailing, they capture a sense of heritage and authenticity. Their UV400 lenses protect your eyes while maintaining clear and comfortable vision. Built to last with quality materials, they combine old-world aesthetics with modern durability. Perfect for those who appreciate retro charm without sacrificing practicality. These sunglasses bring vintage elegance into the modern age effortlessly.",
            "features": [
                "Retro-inspired rounded frame",
                "UV400 protective lenses",
                "Durable and lightweight design",
                "Classic styling with modern comfort"
            ],
            "materials": "Premium acetate, UV400 lenses",
            "size": "Medium fit – lens width 49mm, bridge 20mm, temple length 145mm"
        },
        "delivery": {
            "shipping_options": ["Standard shipping (3–5 business days)", "Express option (1–2 business days)"],
            "cost": "Free standard shipping over $40.",
            "returns": "30-day free return policy.",
            "international": "Worldwide shipping calculated at checkout."
        }
    },
    {
        "title": "Hyman - Matte Finish",
        "slug": "hyman-matte-finish",
        "image": "https://i.pinimg.com/1200x/4e/36/08/4e36088e1fcb93403c83864320f33df6.jpg",
        "price": "$16.50",
        "product": {
            "description": "The Hyman Matte Finish sunglasses add a modern twist to a classic silhouette. With their smooth matte texture, they deliver a refined yet contemporary aesthetic. The UV400 protective lenses provide safe and crisp vision, suitable for both everyday use and outdoor adventures. Their sturdy yet lightweight construction ensures long-lasting comfort. Whether paired with casual or smart attire, they enhance your style with understated confidence. A versatile piece that adapts to multiple occasions seamlessly.",
            "features": [
                "Matte-textured finish for modern style",
                "UV400 protective lenses",
                "Durable and lightweight frame",
                "Comfortable all-day wear design"
            ],
            "materials": "Acetate frame, UV400 lenses",
            "size": "Medium fit – lens width 51mm, bridge 19mm, temple length 145mm"
        },
        "delivery": {
            "shipping_options": ["Standard delivery (3–5 business days)", "Fast delivery (1–2 business days)"],
            "cost": "Standard $4.95, fast $7.95.",
            "returns": "30-day return policy.",
            "international": "Available in EU, US, Asia with calculated rates."
        }
    },
    {
        "title": "Hyman - Everyday Fit",
        "slug": "hyman-everyday-fit",
        "image": "https://moscot.com/cdn/shop/products/hyman-color-black-pos-2.jpg?v=1691335558&width=1024",
        "price": "$21.40",
        "product": {
            "description": "The Hyman Everyday Fit sunglasses are crafted for maximum comfort without sacrificing style. Their ergonomic design adapts to a wide range of face shapes, ensuring a secure and natural fit. Featuring UV400 protection, the lenses block harmful rays while keeping your vision crisp and clear. Built with quality materials, they withstand daily wear with ease. Perfect for commuting, traveling, or enjoying a sunny afternoon outdoors. A reliable everyday accessory that balances practicality with fashion.",
            "features": [
                "Universal fit design",
                "UV400 protective lenses",
                "Durable build for daily use",
                "Comfortable lightweight frame"
            ],
            "materials": "Premium acetate, UV400 lenses",
            "size": "One-size fit – lens width 52mm, bridge 19mm, temple length 145mm"
        },
        "delivery": {
            "shipping_options": ["Standard shipping (3–5 business days)", "Next-day delivery available"],
            "cost": "Standard $5.95, free over $50.",
            "returns": "30-day free returns.",
            "international": "Worldwide shipping available."
        }
    }
];

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: false,
    entities: [Product],
});

AppDataSource.initialize().then(async () => {

    const repo = AppDataSource.getRepository(Product);

    await repo.clear();

    for (const product of products) {

        await repo.save(repo.create(product));
    }

    process.exit(0);


}).catch(err => console.error(err));
