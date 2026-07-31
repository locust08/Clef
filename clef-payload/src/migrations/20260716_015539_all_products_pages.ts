import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`all_products_pages_skincare_category_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`image_id\` integer,
  	\`href\` text NOT NULL,
  	\`badge_label\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`all_products_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`all_products_pages_skincare_category_cards_order_idx\` ON \`all_products_pages_skincare_category_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_skincare_category_cards_parent_id_idx\` ON \`all_products_pages_skincare_category_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_skincare_category_cards_image_idx\` ON \`all_products_pages_skincare_category_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`all_products_pages_personal_care_category_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`image_id\` integer,
  	\`href\` text NOT NULL,
  	\`badge_label\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`all_products_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`all_products_pages_personal_care_category_cards_order_idx\` ON \`all_products_pages_personal_care_category_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_personal_care_category_cards_parent_id_idx\` ON \`all_products_pages_personal_care_category_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_personal_care_category_cards_image_idx\` ON \`all_products_pages_personal_care_category_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`all_products_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`skincare_hero_title\` text NOT NULL,
  	\`skincare_hero_image_id\` integer,
  	\`skincare_hero_cta_label\` text NOT NULL,
  	\`personal_care_hero_title\` text NOT NULL,
  	\`personal_care_hero_image_id\` integer,
  	\`personal_care_hero_cta_label\` text NOT NULL,
  	\`fragrance_hero_title\` text NOT NULL,
  	\`fragrance_hero_image_id\` integer,
  	\`fragrance_hero_cta_label\` text NOT NULL,
  	\`fragrance_banner_eyebrow\` text NOT NULL,
  	\`fragrance_banner_title\` text NOT NULL,
  	\`fragrance_banner_description\` text NOT NULL,
  	\`fragrance_banner_video_url\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`skincare_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`personal_care_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fragrance_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`all_products_pages_skincare_skincare_hero_image_idx\` ON \`all_products_pages\` (\`skincare_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_personal_care_personal_care_hero_imag_idx\` ON \`all_products_pages\` (\`personal_care_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_fragrance_fragrance_hero_image_idx\` ON \`all_products_pages\` (\`fragrance_hero_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`all_products_pages_skincare_category_cards\`;`)
  await db.run(sql`DROP TABLE \`all_products_pages_personal_care_category_cards\`;`)
  await db.run(sql`DROP TABLE \`all_products_pages\`;`)
}
