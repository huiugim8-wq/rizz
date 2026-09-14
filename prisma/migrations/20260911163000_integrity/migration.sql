CREATE UNIQUE INDEX "one_owner" ON "User" ("role") WHERE "role" = 'OWNER';
CREATE UNIQUE INDEX "one_featured_news" ON "News" ("isFeatured") WHERE "isFeatured" = true;
ALTER TABLE "User" ADD CONSTRAINT "user_role" CHECK ("role" IN ('OWNER','STAFF'));
ALTER TABLE "User" ADD CONSTRAINT "user_status" CHECK ("status" IN ('PENDING','ACTIVE','REJECTED','SUSPENDED'));
ALTER TABLE "User" ADD CONSTRAINT "owner_active" CHECK ("role" <> 'OWNER' OR "status" = 'ACTIVE');
ALTER TABLE "News" ADD CONSTRAINT "news_status" CHECK ("status" IN ('DRAFT','PUBLISHED','HIDDEN'));
ALTER TABLE "Creator" ADD CONSTRAINT "creator_status" CHECK ("status" IN ('DRAFT','PUBLISHED','HIDDEN'));
ALTER TABLE "Creator" ADD CONSTRAINT "creator_focal" CHECK ("focalX" BETWEEN 0 AND 100 AND "focalY" BETWEEN 0 AND 100);
