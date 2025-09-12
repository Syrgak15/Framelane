import "reflect-metadata";
import { AppDataSource } from "../backend/src/data-source";

async function fixWishlist() {
    await AppDataSource.initialize();

    console.log("⚡ Запускаем миграцию таблицы wishlist...");
    await AppDataSource.query(`
    BEGIN TRANSACTION;
    PRAGMA foreign_keys=OFF;

    CREATE TABLE "wishlist_new" (
      "id"      INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      "title"   VARCHAR NOT NULL,
      "slug"    VARCHAR NOT NULL,
      "image"   VARCHAR,
      "price"   REAL,
      "rating"  REAL,
      "userId"  INTEGER,
      CONSTRAINT "FK_wishlist_user" FOREIGN KEY("userId") REFERENCES "users"("id") ON DELETE CASCADE,
      CONSTRAINT "UQ_wishlist_slug_user" UNIQUE ("slug","userId")
    );

    INSERT INTO "wishlist_new" ("id","title","slug","image","price","rating","userId")
    SELECT "id","title","slug","image","price","rating","userId" FROM "wishlist";

    DROP TABLE "wishlist";
    ALTER TABLE "wishlist_new" RENAME TO "wishlist";

    PRAGMA foreign_keys=ON;
    COMMIT;
  `);

    console.log("✅ Таблица wishlist обновлена: теперь UNIQUE(slug, userId)");
    await AppDataSource.destroy();
}

fixWishlist().catch((err) => {
    console.error("❌ Ошибка миграции:", err);
    process.exit(1);
});
