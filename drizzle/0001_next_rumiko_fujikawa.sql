CREATE TABLE "contactMessages" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar NOT NULL,
	"lastName" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar,
	"message" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
