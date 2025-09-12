-- 1) На всякий случай: включить транзакцию и отключить FKs на время перестройки
BEGIN TRANSACTION;
PRAGMA foreign_keys=OFF;

-- 2) Создаём новую таблицу с нужным составным уникальным ключом
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

-- 3) Переносим данные из старой таблицы
INSERT INTO "wishlist_new" ("id","title","slug","image","price","rating","userId")
SELECT "id","title","slug","image","price","rating","userId"
FROM "wishlist";

-- 4) Сносим старую таблицу и переименовываем новую
DROP TABLE "wishlist";
ALTER TABLE "wishlist_new" RENAME TO "wishlist";

-- 5) Включаем обратно внешние ключи и коммитим транзакцию
PRAGMA foreign_keys=ON;
COMMIT;
