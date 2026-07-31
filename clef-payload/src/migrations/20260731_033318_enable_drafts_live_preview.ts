import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`_category_pages_v_version_top_medusa_product_handles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`handle\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_category_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_category_pages_v_version_top_medusa_product_handles_order_idx\` ON \`_category_pages_v_version_top_medusa_product_handles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_category_pages_v_version_top_medusa_product_handles_parent_id_idx\` ON \`_category_pages_v_version_top_medusa_product_handles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_category_pages_v_version_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section\` text,
  	\`is_enabled\` integer DEFAULT true,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_category_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_category_pages_v_version_sections_order_idx\` ON \`_category_pages_v_version_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_category_pages_v_version_sections_parent_id_idx\` ON \`_category_pages_v_version_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_category_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_parent_category\` text,
  	\`version_header_title\` text,
  	\`version_header_subtitle\` text,
  	\`version_header_image_id\` integer,
  	\`version_video_title\` text,
  	\`version_video_url\` text,
  	\`version_video_thumbnail_id\` integer,
  	\`version_is_active\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`category_pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_header_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_video_thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_category_pages_v_parent_idx\` ON \`_category_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_category_pages_v_version_version_slug_idx\` ON \`_category_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_category_pages_v_version_version_header_image_idx\` ON \`_category_pages_v\` (\`version_header_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_category_pages_v_version_version_video_thumbnail_idx\` ON \`_category_pages_v\` (\`version_video_thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`_category_pages_v_version_version_updated_at_idx\` ON \`_category_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_category_pages_v_version_version_created_at_idx\` ON \`_category_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_category_pages_v_version_version__status_idx\` ON \`_category_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_category_pages_v_created_at_idx\` ON \`_category_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_category_pages_v_updated_at_idx\` ON \`_category_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_category_pages_v_latest_idx\` ON \`_category_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_category_pages_v_autosave_idx\` ON \`_category_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_clef_edit_articles_v_version_questions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`product_handle\` text,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_clef_edit_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_clef_edit_articles_v_version_questions_order_idx\` ON \`_clef_edit_articles_v_version_questions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_clef_edit_articles_v_version_questions_parent_id_idx\` ON \`_clef_edit_articles_v_version_questions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_clef_edit_articles_v_version_product_suggestions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`price\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_clef_edit_articles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_clef_edit_articles_v_version_product_suggestions_order_idx\` ON \`_clef_edit_articles_v_version_product_suggestions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_clef_edit_articles_v_version_product_suggestions_parent_id_idx\` ON \`_clef_edit_articles_v_version_product_suggestions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_clef_edit_articles_v_version_product_suggestions_image_idx\` ON \`_clef_edit_articles_v_version_product_suggestions\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_clef_edit_articles_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_author_name\` text,
  	\`version_author_role\` text,
  	\`version_author_image_id\` integer,
  	\`version_published_date\` text,
  	\`version_category_label\` text DEFAULT 'Skincare',
  	\`version_read_time\` text DEFAULT '8 min read',
  	\`version_hero_image_id\` integer,
  	\`version_description\` text,
  	\`version_display_order\` numeric DEFAULT 1,
  	\`version_is_active\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`clef_edit_articles\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_author_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_clef_edit_articles_v_parent_idx\` ON \`_clef_edit_articles_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_clef_edit_articles_v_version_version_slug_idx\` ON \`_clef_edit_articles_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_clef_edit_articles_v_version_version_author_image_idx\` ON \`_clef_edit_articles_v\` (\`version_author_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_clef_edit_articles_v_version_version_hero_image_idx\` ON \`_clef_edit_articles_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_clef_edit_articles_v_version_version_updated_at_idx\` ON \`_clef_edit_articles_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_clef_edit_articles_v_version_version_created_at_idx\` ON \`_clef_edit_articles_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_clef_edit_articles_v_version_version__status_idx\` ON \`_clef_edit_articles_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_clef_edit_articles_v_created_at_idx\` ON \`_clef_edit_articles_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_clef_edit_articles_v_updated_at_idx\` ON \`_clef_edit_articles_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_clef_edit_articles_v_latest_idx\` ON \`_clef_edit_articles_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_clef_edit_articles_v_autosave_idx\` ON \`_clef_edit_articles_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_homepage_v_version_best_seller_medusa_product_handles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`handle\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_homepage_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_best_seller_medusa_product_handles_order_idx\` ON \`_homepage_v_version_best_seller_medusa_product_handles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_best_seller_medusa_product_handles_parent_id_idx\` ON \`_homepage_v_version_best_seller_medusa_product_handles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_homepage_v_version_promotion_banners_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_homepage_v_version_promotion_banners\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_promotion_banners_images_order_idx\` ON \`_homepage_v_version_promotion_banners_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_promotion_banners_images_parent_id_idx\` ON \`_homepage_v_version_promotion_banners_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_promotion_banners_images_image_idx\` ON \`_homepage_v_version_promotion_banners_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_homepage_v_version_promotion_banners\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`image_id\` integer,
  	\`href\` text,
  	\`is_active\` integer DEFAULT true,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_homepage_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_promotion_banners_order_idx\` ON \`_homepage_v_version_promotion_banners\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_promotion_banners_parent_id_idx\` ON \`_homepage_v_version_promotion_banners\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_promotion_banners_image_idx\` ON \`_homepage_v_version_promotion_banners\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_homepage_v_version_new_launch_medusa_product_handles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`handle\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_homepage_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_new_launch_medusa_product_handles_order_idx\` ON \`_homepage_v_version_new_launch_medusa_product_handles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_new_launch_medusa_product_handles_parent_id_idx\` ON \`_homepage_v_version_new_launch_medusa_product_handles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_homepage_v_version_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section\` text,
  	\`is_enabled\` integer DEFAULT true,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_homepage_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_sections_order_idx\` ON \`_homepage_v_version_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_sections_parent_id_idx\` ON \`_homepage_v_version_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_homepage_v_version_homepage_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`title\` text,
  	\`video_url\` text,
  	\`thumbnail_id\` integer,
  	\`description\` text,
  	\`is_active\` integer DEFAULT true,
  	\`display_order\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_homepage_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_homepage_videos_order_idx\` ON \`_homepage_v_version_homepage_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_homepage_videos_parent_id_idx\` ON \`_homepage_v_version_homepage_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_homepage_videos_thumbnail_idx\` ON \`_homepage_v_version_homepage_videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`_homepage_v_version_customer_reviews\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`role\` text,
  	\`review\` text,
  	\`avatar_id\` integer,
  	\`is_active\` integer DEFAULT true,
  	\`display_order\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`avatar_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_homepage_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_customer_reviews_order_idx\` ON \`_homepage_v_version_customer_reviews\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_customer_reviews_parent_id_idx\` ON \`_homepage_v_version_customer_reviews\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_customer_reviews_avatar_idx\` ON \`_homepage_v_version_customer_reviews\` (\`avatar_id\`);`)
  await db.run(sql`CREATE TABLE \`_homepage_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_title\` text,
  	\`version_hero_subtitle\` text,
  	\`version_hero_image_id\` integer,
  	\`version_hero_button_label\` text,
  	\`version_hero_button_href\` text,
  	\`version_best_seller_title\` text,
  	\`version_new_launch_title\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_version_hero_image_idx\` ON \`_homepage_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_version_version__status_idx\` ON \`_homepage_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_created_at_idx\` ON \`_homepage_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_updated_at_idx\` ON \`_homepage_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_latest_idx\` ON \`_homepage_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_homepage_v_autosave_idx\` ON \`_homepage_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_all_products_pages_v_version_skincare_category_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`image_id\` integer,
  	\`href\` text,
  	\`badge_label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_all_products_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_all_products_pages_v_version_skincare_category_cards_order_idx\` ON \`_all_products_pages_v_version_skincare_category_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_all_products_pages_v_version_skincare_category_cards_parent_id_idx\` ON \`_all_products_pages_v_version_skincare_category_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_all_products_pages_v_version_skincare_category_cards_im_idx\` ON \`_all_products_pages_v_version_skincare_category_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_all_products_pages_v_version_personal_care_category_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`image_id\` integer,
  	\`href\` text,
  	\`badge_label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_all_products_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_all_products_pages_v_version_personal_care_category_cards_order_idx\` ON \`_all_products_pages_v_version_personal_care_category_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_all_products_pages_v_version_personal_care_category_cards_parent_id_idx\` ON \`_all_products_pages_v_version_personal_care_category_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_all_products_pages_v_version_personal_care_category_car_idx\` ON \`_all_products_pages_v_version_personal_care_category_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_all_products_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_skincare_hero_title\` text,
  	\`version_skincare_hero_image_id\` integer,
  	\`version_skincare_hero_cta_label\` text,
  	\`version_personal_care_hero_title\` text,
  	\`version_personal_care_hero_image_id\` integer,
  	\`version_personal_care_hero_cta_label\` text,
  	\`version_fragrance_hero_title\` text,
  	\`version_fragrance_hero_image_id\` integer,
  	\`version_fragrance_hero_cta_label\` text,
  	\`version_fragrance_banner_eyebrow\` text,
  	\`version_fragrance_banner_title\` text,
  	\`version_fragrance_banner_description\` text,
  	\`version_fragrance_banner_video_url\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_skincare_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_personal_care_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_fragrance_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_all_products_pages_v_version_skincare_version_skincare__idx\` ON \`_all_products_pages_v\` (\`version_skincare_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_all_products_pages_v_version_personal_care_version_pers_idx\` ON \`_all_products_pages_v\` (\`version_personal_care_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_all_products_pages_v_version_fragrance_version_fragranc_idx\` ON \`_all_products_pages_v\` (\`version_fragrance_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_all_products_pages_v_version_version__status_idx\` ON \`_all_products_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_all_products_pages_v_created_at_idx\` ON \`_all_products_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_all_products_pages_v_updated_at_idx\` ON \`_all_products_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_all_products_pages_v_latest_idx\` ON \`_all_products_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_all_products_pages_v_autosave_idx\` ON \`_all_products_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_video_section_v_version_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`title\` text,
  	\`video_url\` text,
  	\`thumbnail_id\` integer,
  	\`description\` text,
  	\`is_active\` integer DEFAULT true,
  	\`display_order\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_video_section_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_video_section_v_version_videos_order_idx\` ON \`_video_section_v_version_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_video_section_v_version_videos_parent_id_idx\` ON \`_video_section_v_version_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_video_section_v_version_videos_thumbnail_idx\` ON \`_video_section_v_version_videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`_video_section_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_section_title\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_video_section_v_version_version__status_idx\` ON \`_video_section_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_video_section_v_created_at_idx\` ON \`_video_section_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_video_section_v_updated_at_idx\` ON \`_video_section_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_video_section_v_latest_idx\` ON \`_video_section_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_video_section_v_autosave_idx\` ON \`_video_section_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_social_links_order_idx\` ON \`_footer_v_version_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_social_links_parent_id_idx\` ON \`_footer_v_version_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_quick_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_quick_links_order_idx\` ON \`_footer_v_version_quick_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_quick_links_parent_id_idx\` ON \`_footer_v_version_quick_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_logo_id\` integer,
  	\`version_description\` text,
  	\`version_copyright_text\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_version_logo_idx\` ON \`_footer_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_version__status_idx\` ON \`_footer_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_created_at_idx\` ON \`_footer_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_updated_at_idx\` ON \`_footer_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_latest_idx\` ON \`_footer_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_autosave_idx\` ON \`_footer_v\` (\`autosave\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_category_pages_top_medusa_product_handles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`handle\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`category_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_category_pages_top_medusa_product_handles\`("_order", "_parent_id", "id", "handle") SELECT "_order", "_parent_id", "id", "handle" FROM \`category_pages_top_medusa_product_handles\`;`)
  await db.run(sql`DROP TABLE \`category_pages_top_medusa_product_handles\`;`)
  await db.run(sql`ALTER TABLE \`__new_category_pages_top_medusa_product_handles\` RENAME TO \`category_pages_top_medusa_product_handles\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`category_pages_top_medusa_product_handles_order_idx\` ON \`category_pages_top_medusa_product_handles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_top_medusa_product_handles_parent_id_idx\` ON \`category_pages_top_medusa_product_handles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_category_pages_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section\` text,
  	\`is_enabled\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`category_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_category_pages_sections\`("_order", "_parent_id", "id", "section", "is_enabled") SELECT "_order", "_parent_id", "id", "section", "is_enabled" FROM \`category_pages_sections\`;`)
  await db.run(sql`DROP TABLE \`category_pages_sections\`;`)
  await db.run(sql`ALTER TABLE \`__new_category_pages_sections\` RENAME TO \`category_pages_sections\`;`)
  await db.run(sql`CREATE INDEX \`category_pages_sections_order_idx\` ON \`category_pages_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_sections_parent_id_idx\` ON \`category_pages_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_category_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`parent_category\` text,
  	\`header_title\` text,
  	\`header_subtitle\` text,
  	\`header_image_id\` integer,
  	\`video_title\` text,
  	\`video_url\` text,
  	\`video_thumbnail_id\` integer,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`header_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_category_pages\`("id", "title", "slug", "parent_category", "header_title", "header_subtitle", "header_image_id", "video_title", "video_url", "video_thumbnail_id", "is_active", "updated_at", "created_at", "_status") SELECT "id", "title", "slug", "parent_category", "header_title", "header_subtitle", "header_image_id", "video_title", "video_url", "video_thumbnail_id", "is_active", "updated_at", "created_at", 'published' FROM \`category_pages\`;`)
  await db.run(sql`DROP TABLE \`category_pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_category_pages\` RENAME TO \`category_pages\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`category_pages_slug_idx\` ON \`category_pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_header_image_idx\` ON \`category_pages\` (\`header_image_id\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_video_thumbnail_idx\` ON \`category_pages\` (\`video_thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_updated_at_idx\` ON \`category_pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_created_at_idx\` ON \`category_pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`category_pages__status_idx\` ON \`category_pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new_clef_edit_articles_questions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_handle\` text,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`clef_edit_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_clef_edit_articles_questions\`("_order", "_parent_id", "id", "product_handle", "question", "answer") SELECT "_order", "_parent_id", "id", "product_handle", "question", "answer" FROM \`clef_edit_articles_questions\`;`)
  await db.run(sql`DROP TABLE \`clef_edit_articles_questions\`;`)
  await db.run(sql`ALTER TABLE \`__new_clef_edit_articles_questions\` RENAME TO \`clef_edit_articles_questions\`;`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_questions_order_idx\` ON \`clef_edit_articles_questions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_questions_parent_id_idx\` ON \`clef_edit_articles_questions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_clef_edit_articles_product_suggestions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`price\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`clef_edit_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_clef_edit_articles_product_suggestions\`("_order", "_parent_id", "id", "name", "price", "description", "image_id") SELECT "_order", "_parent_id", "id", "name", "price", "description", "image_id" FROM \`clef_edit_articles_product_suggestions\`;`)
  await db.run(sql`DROP TABLE \`clef_edit_articles_product_suggestions\`;`)
  await db.run(sql`ALTER TABLE \`__new_clef_edit_articles_product_suggestions\` RENAME TO \`clef_edit_articles_product_suggestions\`;`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_product_suggestions_order_idx\` ON \`clef_edit_articles_product_suggestions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_product_suggestions_parent_id_idx\` ON \`clef_edit_articles_product_suggestions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_product_suggestions_image_idx\` ON \`clef_edit_articles_product_suggestions\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_clef_edit_articles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`author_name\` text,
  	\`author_role\` text,
  	\`author_image_id\` integer,
  	\`published_date\` text,
  	\`category_label\` text DEFAULT 'Skincare',
  	\`read_time\` text DEFAULT '8 min read',
  	\`hero_image_id\` integer,
  	\`description\` text,
  	\`display_order\` numeric DEFAULT 1,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`author_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_clef_edit_articles\`("id", "title", "slug", "author_name", "author_role", "author_image_id", "published_date", "category_label", "read_time", "hero_image_id", "description", "display_order", "is_active", "updated_at", "created_at", "_status") SELECT "id", "title", "slug", "author_name", "author_role", "author_image_id", "published_date", "category_label", "read_time", "hero_image_id", "description", "display_order", "is_active", "updated_at", "created_at", 'published' FROM \`clef_edit_articles\`;`)
  await db.run(sql`DROP TABLE \`clef_edit_articles\`;`)
  await db.run(sql`ALTER TABLE \`__new_clef_edit_articles\` RENAME TO \`clef_edit_articles\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`clef_edit_articles_slug_idx\` ON \`clef_edit_articles\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_author_image_idx\` ON \`clef_edit_articles\` (\`author_image_id\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_hero_image_idx\` ON \`clef_edit_articles\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_updated_at_idx\` ON \`clef_edit_articles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_created_at_idx\` ON \`clef_edit_articles\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles__status_idx\` ON \`clef_edit_articles\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new_homepage_best_seller_medusa_product_handles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`handle\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage_best_seller_medusa_product_handles\`("_order", "_parent_id", "id", "handle") SELECT "_order", "_parent_id", "id", "handle" FROM \`homepage_best_seller_medusa_product_handles\`;`)
  await db.run(sql`DROP TABLE \`homepage_best_seller_medusa_product_handles\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage_best_seller_medusa_product_handles\` RENAME TO \`homepage_best_seller_medusa_product_handles\`;`)
  await db.run(sql`CREATE INDEX \`homepage_best_seller_medusa_product_handles_order_idx\` ON \`homepage_best_seller_medusa_product_handles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_best_seller_medusa_product_handles_parent_id_idx\` ON \`homepage_best_seller_medusa_product_handles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_homepage_promotion_banners_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage_promotion_banners\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage_promotion_banners_images\`("_order", "_parent_id", "id", "image_id") SELECT "_order", "_parent_id", "id", "image_id" FROM \`homepage_promotion_banners_images\`;`)
  await db.run(sql`DROP TABLE \`homepage_promotion_banners_images\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage_promotion_banners_images\` RENAME TO \`homepage_promotion_banners_images\`;`)
  await db.run(sql`CREATE INDEX \`homepage_promotion_banners_images_order_idx\` ON \`homepage_promotion_banners_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_promotion_banners_images_parent_id_idx\` ON \`homepage_promotion_banners_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_promotion_banners_images_image_idx\` ON \`homepage_promotion_banners_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_homepage_new_launch_medusa_product_handles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`handle\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage_new_launch_medusa_product_handles\`("_order", "_parent_id", "id", "handle") SELECT "_order", "_parent_id", "id", "handle" FROM \`homepage_new_launch_medusa_product_handles\`;`)
  await db.run(sql`DROP TABLE \`homepage_new_launch_medusa_product_handles\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage_new_launch_medusa_product_handles\` RENAME TO \`homepage_new_launch_medusa_product_handles\`;`)
  await db.run(sql`CREATE INDEX \`homepage_new_launch_medusa_product_handles_order_idx\` ON \`homepage_new_launch_medusa_product_handles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_new_launch_medusa_product_handles_parent_id_idx\` ON \`homepage_new_launch_medusa_product_handles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_homepage_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section\` text,
  	\`is_enabled\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage_sections\`("_order", "_parent_id", "id", "section", "is_enabled") SELECT "_order", "_parent_id", "id", "section", "is_enabled" FROM \`homepage_sections\`;`)
  await db.run(sql`DROP TABLE \`homepage_sections\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage_sections\` RENAME TO \`homepage_sections\`;`)
  await db.run(sql`CREATE INDEX \`homepage_sections_order_idx\` ON \`homepage_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_sections_parent_id_idx\` ON \`homepage_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_homepage_homepage_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`title\` text,
  	\`video_url\` text,
  	\`thumbnail_id\` integer,
  	\`description\` text,
  	\`is_active\` integer DEFAULT true,
  	\`display_order\` numeric DEFAULT 0,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage_homepage_videos\`("_order", "_parent_id", "id", "platform", "title", "video_url", "thumbnail_id", "description", "is_active", "display_order") SELECT "_order", "_parent_id", "id", "platform", "title", "video_url", "thumbnail_id", "description", "is_active", "display_order" FROM \`homepage_homepage_videos\`;`)
  await db.run(sql`DROP TABLE \`homepage_homepage_videos\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage_homepage_videos\` RENAME TO \`homepage_homepage_videos\`;`)
  await db.run(sql`CREATE INDEX \`homepage_homepage_videos_order_idx\` ON \`homepage_homepage_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_homepage_videos_parent_id_idx\` ON \`homepage_homepage_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_homepage_videos_thumbnail_idx\` ON \`homepage_homepage_videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_homepage_customer_reviews\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`role\` text,
  	\`review\` text,
  	\`avatar_id\` integer,
  	\`is_active\` integer DEFAULT true,
  	\`display_order\` numeric DEFAULT 0,
  	FOREIGN KEY (\`avatar_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage_customer_reviews\`("_order", "_parent_id", "id", "name", "role", "review", "avatar_id", "is_active", "display_order") SELECT "_order", "_parent_id", "id", "name", "role", "review", "avatar_id", "is_active", "display_order" FROM \`homepage_customer_reviews\`;`)
  await db.run(sql`DROP TABLE \`homepage_customer_reviews\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage_customer_reviews\` RENAME TO \`homepage_customer_reviews\`;`)
  await db.run(sql`CREATE INDEX \`homepage_customer_reviews_order_idx\` ON \`homepage_customer_reviews\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_customer_reviews_parent_id_idx\` ON \`homepage_customer_reviews\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_customer_reviews_avatar_idx\` ON \`homepage_customer_reviews\` (\`avatar_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_all_products_pages_skincare_category_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`image_id\` integer,
  	\`href\` text,
  	\`badge_label\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`all_products_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_all_products_pages_skincare_category_cards\`("_order", "_parent_id", "id", "title", "image_id", "href", "badge_label") SELECT "_order", "_parent_id", "id", "title", "image_id", "href", "badge_label" FROM \`all_products_pages_skincare_category_cards\`;`)
  await db.run(sql`DROP TABLE \`all_products_pages_skincare_category_cards\`;`)
  await db.run(sql`ALTER TABLE \`__new_all_products_pages_skincare_category_cards\` RENAME TO \`all_products_pages_skincare_category_cards\`;`)
  await db.run(sql`CREATE INDEX \`all_products_pages_skincare_category_cards_order_idx\` ON \`all_products_pages_skincare_category_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_skincare_category_cards_parent_id_idx\` ON \`all_products_pages_skincare_category_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_skincare_category_cards_image_idx\` ON \`all_products_pages_skincare_category_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_all_products_pages_personal_care_category_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`image_id\` integer,
  	\`href\` text,
  	\`badge_label\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`all_products_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_all_products_pages_personal_care_category_cards\`("_order", "_parent_id", "id", "title", "image_id", "href", "badge_label") SELECT "_order", "_parent_id", "id", "title", "image_id", "href", "badge_label" FROM \`all_products_pages_personal_care_category_cards\`;`)
  await db.run(sql`DROP TABLE \`all_products_pages_personal_care_category_cards\`;`)
  await db.run(sql`ALTER TABLE \`__new_all_products_pages_personal_care_category_cards\` RENAME TO \`all_products_pages_personal_care_category_cards\`;`)
  await db.run(sql`CREATE INDEX \`all_products_pages_personal_care_category_cards_order_idx\` ON \`all_products_pages_personal_care_category_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_personal_care_category_cards_parent_id_idx\` ON \`all_products_pages_personal_care_category_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_personal_care_category_cards_image_idx\` ON \`all_products_pages_personal_care_category_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_all_products_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`skincare_hero_title\` text,
  	\`skincare_hero_image_id\` integer,
  	\`skincare_hero_cta_label\` text,
  	\`personal_care_hero_title\` text,
  	\`personal_care_hero_image_id\` integer,
  	\`personal_care_hero_cta_label\` text,
  	\`fragrance_hero_title\` text,
  	\`fragrance_hero_image_id\` integer,
  	\`fragrance_hero_cta_label\` text,
  	\`fragrance_banner_eyebrow\` text,
  	\`fragrance_banner_title\` text,
  	\`fragrance_banner_description\` text,
  	\`fragrance_banner_video_url\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`skincare_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`personal_care_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fragrance_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_all_products_pages\`("id", "skincare_hero_title", "skincare_hero_image_id", "skincare_hero_cta_label", "personal_care_hero_title", "personal_care_hero_image_id", "personal_care_hero_cta_label", "fragrance_hero_title", "fragrance_hero_image_id", "fragrance_hero_cta_label", "fragrance_banner_eyebrow", "fragrance_banner_title", "fragrance_banner_description", "fragrance_banner_video_url", "_status", "updated_at", "created_at") SELECT "id", "skincare_hero_title", "skincare_hero_image_id", "skincare_hero_cta_label", "personal_care_hero_title", "personal_care_hero_image_id", "personal_care_hero_cta_label", "fragrance_hero_title", "fragrance_hero_image_id", "fragrance_hero_cta_label", "fragrance_banner_eyebrow", "fragrance_banner_title", "fragrance_banner_description", "fragrance_banner_video_url", 'published', "updated_at", "created_at" FROM \`all_products_pages\`;`)
  await db.run(sql`DROP TABLE \`all_products_pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_all_products_pages\` RENAME TO \`all_products_pages\`;`)
  await db.run(sql`CREATE INDEX \`all_products_pages_skincare_skincare_hero_image_idx\` ON \`all_products_pages\` (\`skincare_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_personal_care_personal_care_hero_imag_idx\` ON \`all_products_pages\` (\`personal_care_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_fragrance_fragrance_hero_image_idx\` ON \`all_products_pages\` (\`fragrance_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages__status_idx\` ON \`all_products_pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new_video_section_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`title\` text,
  	\`video_url\` text,
  	\`thumbnail_id\` integer,
  	\`description\` text,
  	\`is_active\` integer DEFAULT true,
  	\`display_order\` numeric DEFAULT 0,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`video_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_video_section_videos\`("_order", "_parent_id", "id", "platform", "title", "video_url", "thumbnail_id", "description", "is_active", "display_order") SELECT "_order", "_parent_id", "id", "platform", "title", "video_url", "thumbnail_id", "description", "is_active", "display_order" FROM \`video_section_videos\`;`)
  await db.run(sql`DROP TABLE \`video_section_videos\`;`)
  await db.run(sql`ALTER TABLE \`__new_video_section_videos\` RENAME TO \`video_section_videos\`;`)
  await db.run(sql`CREATE INDEX \`video_section_videos_order_idx\` ON \`video_section_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`video_section_videos_parent_id_idx\` ON \`video_section_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`video_section_videos_thumbnail_idx\` ON \`video_section_videos\` (\`thumbnail_id\`);`)
  await db.run(sql`ALTER TABLE \`homepage\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`homepage__status_idx\` ON \`homepage\` (\`_status\`);`)
  await db.run(sql`UPDATE \`homepage\` SET \`_status\` = 'published';`)
  await db.run(sql`ALTER TABLE \`video_section\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`video_section__status_idx\` ON \`video_section\` (\`_status\`);`)
  await db.run(sql`UPDATE \`video_section\` SET \`_status\` = 'published';`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`footer__status_idx\` ON \`footer\` (\`_status\`);`)
  await db.run(sql`UPDATE \`footer\` SET \`_status\` = 'published';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`_category_pages_v_version_top_medusa_product_handles\`;`)
  await db.run(sql`DROP TABLE \`_category_pages_v_version_sections\`;`)
  await db.run(sql`DROP TABLE \`_category_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_clef_edit_articles_v_version_questions\`;`)
  await db.run(sql`DROP TABLE \`_clef_edit_articles_v_version_product_suggestions\`;`)
  await db.run(sql`DROP TABLE \`_clef_edit_articles_v\`;`)
  await db.run(sql`DROP TABLE \`_homepage_v_version_best_seller_medusa_product_handles\`;`)
  await db.run(sql`DROP TABLE \`_homepage_v_version_promotion_banners_images\`;`)
  await db.run(sql`DROP TABLE \`_homepage_v_version_promotion_banners\`;`)
  await db.run(sql`DROP TABLE \`_homepage_v_version_new_launch_medusa_product_handles\`;`)
  await db.run(sql`DROP TABLE \`_homepage_v_version_sections\`;`)
  await db.run(sql`DROP TABLE \`_homepage_v_version_homepage_videos\`;`)
  await db.run(sql`DROP TABLE \`_homepage_v_version_customer_reviews\`;`)
  await db.run(sql`DROP TABLE \`_homepage_v\`;`)
  await db.run(sql`DROP TABLE \`_all_products_pages_v_version_skincare_category_cards\`;`)
  await db.run(sql`DROP TABLE \`_all_products_pages_v_version_personal_care_category_cards\`;`)
  await db.run(sql`DROP TABLE \`_all_products_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_video_section_v_version_videos\`;`)
  await db.run(sql`DROP TABLE \`_video_section_v\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_social_links\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_quick_links\`;`)
  await db.run(sql`DROP TABLE \`_footer_v\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_category_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`parent_category\` text NOT NULL,
  	\`header_title\` text,
  	\`header_subtitle\` text,
  	\`header_image_id\` integer,
  	\`video_title\` text,
  	\`video_url\` text,
  	\`video_thumbnail_id\` integer,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`header_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_category_pages\`("id", "title", "slug", "parent_category", "header_title", "header_subtitle", "header_image_id", "video_title", "video_url", "video_thumbnail_id", "is_active", "updated_at", "created_at") SELECT "id", "title", "slug", "parent_category", "header_title", "header_subtitle", "header_image_id", "video_title", "video_url", "video_thumbnail_id", "is_active", "updated_at", "created_at" FROM \`category_pages\`;`)
  await db.run(sql`DROP TABLE \`category_pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_category_pages\` RENAME TO \`category_pages\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`category_pages_slug_idx\` ON \`category_pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_header_image_idx\` ON \`category_pages\` (\`header_image_id\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_video_thumbnail_idx\` ON \`category_pages\` (\`video_thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_updated_at_idx\` ON \`category_pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_created_at_idx\` ON \`category_pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_clef_edit_articles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`author_name\` text NOT NULL,
  	\`author_role\` text,
  	\`author_image_id\` integer,
  	\`published_date\` text NOT NULL,
  	\`category_label\` text DEFAULT 'Skincare' NOT NULL,
  	\`read_time\` text DEFAULT '8 min read',
  	\`hero_image_id\` integer,
  	\`description\` text NOT NULL,
  	\`display_order\` numeric DEFAULT 1 NOT NULL,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`author_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_clef_edit_articles\`("id", "title", "slug", "author_name", "author_role", "author_image_id", "published_date", "category_label", "read_time", "hero_image_id", "description", "display_order", "is_active", "updated_at", "created_at") SELECT "id", "title", "slug", "author_name", "author_role", "author_image_id", "published_date", "category_label", "read_time", "hero_image_id", "description", "display_order", "is_active", "updated_at", "created_at" FROM \`clef_edit_articles\`;`)
  await db.run(sql`DROP TABLE \`clef_edit_articles\`;`)
  await db.run(sql`ALTER TABLE \`__new_clef_edit_articles\` RENAME TO \`clef_edit_articles\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`clef_edit_articles_slug_idx\` ON \`clef_edit_articles\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_author_image_idx\` ON \`clef_edit_articles\` (\`author_image_id\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_hero_image_idx\` ON \`clef_edit_articles\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_updated_at_idx\` ON \`clef_edit_articles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_created_at_idx\` ON \`clef_edit_articles\` (\`created_at\`);`)
  await db.run(sql`DROP INDEX \`homepage__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`homepage\` DROP COLUMN \`_status\`;`)
  await db.run(sql`CREATE TABLE \`__new_all_products_pages\` (
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
  await db.run(sql`INSERT INTO \`__new_all_products_pages\`("id", "skincare_hero_title", "skincare_hero_image_id", "skincare_hero_cta_label", "personal_care_hero_title", "personal_care_hero_image_id", "personal_care_hero_cta_label", "fragrance_hero_title", "fragrance_hero_image_id", "fragrance_hero_cta_label", "fragrance_banner_eyebrow", "fragrance_banner_title", "fragrance_banner_description", "fragrance_banner_video_url", "updated_at", "created_at") SELECT "id", "skincare_hero_title", "skincare_hero_image_id", "skincare_hero_cta_label", "personal_care_hero_title", "personal_care_hero_image_id", "personal_care_hero_cta_label", "fragrance_hero_title", "fragrance_hero_image_id", "fragrance_hero_cta_label", "fragrance_banner_eyebrow", "fragrance_banner_title", "fragrance_banner_description", "fragrance_banner_video_url", "updated_at", "created_at" FROM \`all_products_pages\`;`)
  await db.run(sql`DROP TABLE \`all_products_pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_all_products_pages\` RENAME TO \`all_products_pages\`;`)
  await db.run(sql`CREATE INDEX \`all_products_pages_skincare_skincare_hero_image_idx\` ON \`all_products_pages\` (\`skincare_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_personal_care_personal_care_hero_imag_idx\` ON \`all_products_pages\` (\`personal_care_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_fragrance_fragrance_hero_image_idx\` ON \`all_products_pages\` (\`fragrance_hero_image_id\`);`)
  await db.run(sql`DROP INDEX \`video_section__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`video_section\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`footer__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`_status\`;`)
  await db.run(sql`CREATE TABLE \`__new_category_pages_top_medusa_product_handles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`handle\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`category_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_category_pages_top_medusa_product_handles\`("_order", "_parent_id", "id", "handle") SELECT "_order", "_parent_id", "id", "handle" FROM \`category_pages_top_medusa_product_handles\`;`)
  await db.run(sql`DROP TABLE \`category_pages_top_medusa_product_handles\`;`)
  await db.run(sql`ALTER TABLE \`__new_category_pages_top_medusa_product_handles\` RENAME TO \`category_pages_top_medusa_product_handles\`;`)
  await db.run(sql`CREATE INDEX \`category_pages_top_medusa_product_handles_order_idx\` ON \`category_pages_top_medusa_product_handles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_top_medusa_product_handles_parent_id_idx\` ON \`category_pages_top_medusa_product_handles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_category_pages_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section\` text NOT NULL,
  	\`is_enabled\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`category_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_category_pages_sections\`("_order", "_parent_id", "id", "section", "is_enabled") SELECT "_order", "_parent_id", "id", "section", "is_enabled" FROM \`category_pages_sections\`;`)
  await db.run(sql`DROP TABLE \`category_pages_sections\`;`)
  await db.run(sql`ALTER TABLE \`__new_category_pages_sections\` RENAME TO \`category_pages_sections\`;`)
  await db.run(sql`CREATE INDEX \`category_pages_sections_order_idx\` ON \`category_pages_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_sections_parent_id_idx\` ON \`category_pages_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_clef_edit_articles_questions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_handle\` text,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`clef_edit_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_clef_edit_articles_questions\`("_order", "_parent_id", "id", "product_handle", "question", "answer") SELECT "_order", "_parent_id", "id", "product_handle", "question", "answer" FROM \`clef_edit_articles_questions\`;`)
  await db.run(sql`DROP TABLE \`clef_edit_articles_questions\`;`)
  await db.run(sql`ALTER TABLE \`__new_clef_edit_articles_questions\` RENAME TO \`clef_edit_articles_questions\`;`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_questions_order_idx\` ON \`clef_edit_articles_questions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_questions_parent_id_idx\` ON \`clef_edit_articles_questions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_clef_edit_articles_product_suggestions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`price\` text,
  	\`description\` text NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`clef_edit_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_clef_edit_articles_product_suggestions\`("_order", "_parent_id", "id", "name", "price", "description", "image_id") SELECT "_order", "_parent_id", "id", "name", "price", "description", "image_id" FROM \`clef_edit_articles_product_suggestions\`;`)
  await db.run(sql`DROP TABLE \`clef_edit_articles_product_suggestions\`;`)
  await db.run(sql`ALTER TABLE \`__new_clef_edit_articles_product_suggestions\` RENAME TO \`clef_edit_articles_product_suggestions\`;`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_product_suggestions_order_idx\` ON \`clef_edit_articles_product_suggestions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_product_suggestions_parent_id_idx\` ON \`clef_edit_articles_product_suggestions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_product_suggestions_image_idx\` ON \`clef_edit_articles_product_suggestions\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_homepage_best_seller_medusa_product_handles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`handle\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage_best_seller_medusa_product_handles\`("_order", "_parent_id", "id", "handle") SELECT "_order", "_parent_id", "id", "handle" FROM \`homepage_best_seller_medusa_product_handles\`;`)
  await db.run(sql`DROP TABLE \`homepage_best_seller_medusa_product_handles\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage_best_seller_medusa_product_handles\` RENAME TO \`homepage_best_seller_medusa_product_handles\`;`)
  await db.run(sql`CREATE INDEX \`homepage_best_seller_medusa_product_handles_order_idx\` ON \`homepage_best_seller_medusa_product_handles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_best_seller_medusa_product_handles_parent_id_idx\` ON \`homepage_best_seller_medusa_product_handles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_homepage_promotion_banners_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage_promotion_banners\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage_promotion_banners_images\`("_order", "_parent_id", "id", "image_id") SELECT "_order", "_parent_id", "id", "image_id" FROM \`homepage_promotion_banners_images\`;`)
  await db.run(sql`DROP TABLE \`homepage_promotion_banners_images\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage_promotion_banners_images\` RENAME TO \`homepage_promotion_banners_images\`;`)
  await db.run(sql`CREATE INDEX \`homepage_promotion_banners_images_order_idx\` ON \`homepage_promotion_banners_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_promotion_banners_images_parent_id_idx\` ON \`homepage_promotion_banners_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_promotion_banners_images_image_idx\` ON \`homepage_promotion_banners_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_homepage_new_launch_medusa_product_handles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`handle\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage_new_launch_medusa_product_handles\`("_order", "_parent_id", "id", "handle") SELECT "_order", "_parent_id", "id", "handle" FROM \`homepage_new_launch_medusa_product_handles\`;`)
  await db.run(sql`DROP TABLE \`homepage_new_launch_medusa_product_handles\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage_new_launch_medusa_product_handles\` RENAME TO \`homepage_new_launch_medusa_product_handles\`;`)
  await db.run(sql`CREATE INDEX \`homepage_new_launch_medusa_product_handles_order_idx\` ON \`homepage_new_launch_medusa_product_handles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_new_launch_medusa_product_handles_parent_id_idx\` ON \`homepage_new_launch_medusa_product_handles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_homepage_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section\` text NOT NULL,
  	\`is_enabled\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage_sections\`("_order", "_parent_id", "id", "section", "is_enabled") SELECT "_order", "_parent_id", "id", "section", "is_enabled" FROM \`homepage_sections\`;`)
  await db.run(sql`DROP TABLE \`homepage_sections\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage_sections\` RENAME TO \`homepage_sections\`;`)
  await db.run(sql`CREATE INDEX \`homepage_sections_order_idx\` ON \`homepage_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_sections_parent_id_idx\` ON \`homepage_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_homepage_homepage_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`title\` text,
  	\`video_url\` text,
  	\`thumbnail_id\` integer,
  	\`description\` text,
  	\`is_active\` integer DEFAULT true,
  	\`display_order\` numeric DEFAULT 0,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage_homepage_videos\`("_order", "_parent_id", "id", "platform", "title", "video_url", "thumbnail_id", "description", "is_active", "display_order") SELECT "_order", "_parent_id", "id", "platform", "title", "video_url", "thumbnail_id", "description", "is_active", "display_order" FROM \`homepage_homepage_videos\`;`)
  await db.run(sql`DROP TABLE \`homepage_homepage_videos\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage_homepage_videos\` RENAME TO \`homepage_homepage_videos\`;`)
  await db.run(sql`CREATE INDEX \`homepage_homepage_videos_order_idx\` ON \`homepage_homepage_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_homepage_videos_parent_id_idx\` ON \`homepage_homepage_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_homepage_videos_thumbnail_idx\` ON \`homepage_homepage_videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_homepage_customer_reviews\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`review\` text NOT NULL,
  	\`avatar_id\` integer,
  	\`is_active\` integer DEFAULT true,
  	\`display_order\` numeric DEFAULT 0,
  	FOREIGN KEY (\`avatar_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage_customer_reviews\`("_order", "_parent_id", "id", "name", "role", "review", "avatar_id", "is_active", "display_order") SELECT "_order", "_parent_id", "id", "name", "role", "review", "avatar_id", "is_active", "display_order" FROM \`homepage_customer_reviews\`;`)
  await db.run(sql`DROP TABLE \`homepage_customer_reviews\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage_customer_reviews\` RENAME TO \`homepage_customer_reviews\`;`)
  await db.run(sql`CREATE INDEX \`homepage_customer_reviews_order_idx\` ON \`homepage_customer_reviews\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_customer_reviews_parent_id_idx\` ON \`homepage_customer_reviews\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_customer_reviews_avatar_idx\` ON \`homepage_customer_reviews\` (\`avatar_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_all_products_pages_skincare_category_cards\` (
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
  await db.run(sql`INSERT INTO \`__new_all_products_pages_skincare_category_cards\`("_order", "_parent_id", "id", "title", "image_id", "href", "badge_label") SELECT "_order", "_parent_id", "id", "title", "image_id", "href", "badge_label" FROM \`all_products_pages_skincare_category_cards\`;`)
  await db.run(sql`DROP TABLE \`all_products_pages_skincare_category_cards\`;`)
  await db.run(sql`ALTER TABLE \`__new_all_products_pages_skincare_category_cards\` RENAME TO \`all_products_pages_skincare_category_cards\`;`)
  await db.run(sql`CREATE INDEX \`all_products_pages_skincare_category_cards_order_idx\` ON \`all_products_pages_skincare_category_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_skincare_category_cards_parent_id_idx\` ON \`all_products_pages_skincare_category_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_skincare_category_cards_image_idx\` ON \`all_products_pages_skincare_category_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_all_products_pages_personal_care_category_cards\` (
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
  await db.run(sql`INSERT INTO \`__new_all_products_pages_personal_care_category_cards\`("_order", "_parent_id", "id", "title", "image_id", "href", "badge_label") SELECT "_order", "_parent_id", "id", "title", "image_id", "href", "badge_label" FROM \`all_products_pages_personal_care_category_cards\`;`)
  await db.run(sql`DROP TABLE \`all_products_pages_personal_care_category_cards\`;`)
  await db.run(sql`ALTER TABLE \`__new_all_products_pages_personal_care_category_cards\` RENAME TO \`all_products_pages_personal_care_category_cards\`;`)
  await db.run(sql`CREATE INDEX \`all_products_pages_personal_care_category_cards_order_idx\` ON \`all_products_pages_personal_care_category_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_personal_care_category_cards_parent_id_idx\` ON \`all_products_pages_personal_care_category_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`all_products_pages_personal_care_category_cards_image_idx\` ON \`all_products_pages_personal_care_category_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_video_section_videos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`title\` text,
  	\`video_url\` text,
  	\`thumbnail_id\` integer,
  	\`description\` text,
  	\`is_active\` integer DEFAULT true,
  	\`display_order\` numeric DEFAULT 0,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`video_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_video_section_videos\`("_order", "_parent_id", "id", "platform", "title", "video_url", "thumbnail_id", "description", "is_active", "display_order") SELECT "_order", "_parent_id", "id", "platform", "title", "video_url", "thumbnail_id", "description", "is_active", "display_order" FROM \`video_section_videos\`;`)
  await db.run(sql`DROP TABLE \`video_section_videos\`;`)
  await db.run(sql`ALTER TABLE \`__new_video_section_videos\` RENAME TO \`video_section_videos\`;`)
  await db.run(sql`CREATE INDEX \`video_section_videos_order_idx\` ON \`video_section_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`video_section_videos_parent_id_idx\` ON \`video_section_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`video_section_videos_thumbnail_idx\` ON \`video_section_videos\` (\`thumbnail_id\`);`)
}
