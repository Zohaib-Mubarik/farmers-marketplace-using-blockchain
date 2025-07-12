CREATE TABLE "cropCategories" (
	"id" serial PRIMARY KEY NOT NULL,
	"categoryName" varchar NOT NULL,
	"defaultPrice" varchar NOT NULL,
	CONSTRAINT "cropCategories_categoryName_unique" UNIQUE("categoryName")
);
--> statement-breakpoint
CREATE TABLE "cropImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"imageUrl" varchar NOT NULL,
	"cropListingId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cropListing" (
	"id" serial PRIMARY KEY NOT NULL,
	"listingTitle" varchar NOT NULL,
	"originalPrice" varchar NOT NULL,
	"category" varchar NOT NULL,
	"listingDescription" varchar NOT NULL,
	"createdBy" varchar NOT NULL,
	"userName" varchar NOT NULL,
	"userImageUrl" varchar,
	"postedOn" varchar,
	"isVisible" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cropImages" ADD CONSTRAINT "cropImages_cropListingId_cropListing_id_fk" FOREIGN KEY ("cropListingId") REFERENCES "public"."cropListing"("id") ON DELETE no action ON UPDATE no action;