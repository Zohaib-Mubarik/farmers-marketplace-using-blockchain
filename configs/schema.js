import { integer, pgTable, serial, varchar, boolean, timestamp } from "drizzle-orm/pg-core";

// Table for User Listings
export const cropListing = pgTable('cropListing', {
  id: serial('id').primaryKey(),
  listingTitle: varchar('listingTitle').notNull(),
  originalPrice: varchar('originalPrice').notNull(),
  category: varchar('category').notNull(),
  listingDescription: varchar('listingDescription').notNull(),
  createdBy: varchar('createdBy').notNull(),
  userName: varchar('userName').notNull(),
  userImageUrl: varchar('userImageUrl'),
  postedOn: varchar('postedOn'),

  // Visibility Status
  isVisible: boolean('isVisible').notNull().default(true),  // By default visible on website
});

// Table for Uploaded Images (Per Listing)
export const cropImages = pgTable('cropImages', {
  id: serial('id').primaryKey(),
  imageUrl: varchar('imageUrl').notNull(),
  cropListingId: integer('cropListingId').notNull().references(() => cropListing.id),
});

// Admin Editable Table: Crop Categories with Default Price
export const cropCategories = pgTable('cropCategories', {
  id: serial('id').primaryKey(),
  categoryName: varchar('categoryName').notNull().unique(),
  defaultPrice: varchar('defaultPrice').notNull(),
});

// 🆕 Table for Contact Messages
export const contactMessages = pgTable('contactMessages', {
  id: serial('id').primaryKey(),
  firstName: varchar('firstName').notNull(),
  lastName: varchar('lastName').notNull(),
  email: varchar('email').notNull(),
  phone: varchar('phone'),
  message: varchar('message').notNull(),
  userImageUrl: varchar('userImageUrl'), 
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});
