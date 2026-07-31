import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`_verified\` integer,
  	\`_verificationtoken\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`category_pages_top_medusa_product_handles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`handle\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`category_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`category_pages_top_medusa_product_handles_order_idx\` ON \`category_pages_top_medusa_product_handles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_top_medusa_product_handles_parent_id_idx\` ON \`category_pages_top_medusa_product_handles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`category_pages_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section\` text NOT NULL,
  	\`is_enabled\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`category_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`category_pages_sections_order_idx\` ON \`category_pages_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_sections_parent_id_idx\` ON \`category_pages_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`category_pages\` (
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
  await db.run(sql`CREATE UNIQUE INDEX \`category_pages_slug_idx\` ON \`category_pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_header_image_idx\` ON \`category_pages\` (\`header_image_id\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_video_thumbnail_idx\` ON \`category_pages\` (\`video_thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_updated_at_idx\` ON \`category_pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`category_pages_created_at_idx\` ON \`category_pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`clef_edit_articles_questions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_handle\` text,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`clef_edit_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_questions_order_idx\` ON \`clef_edit_articles_questions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_questions_parent_id_idx\` ON \`clef_edit_articles_questions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`clef_edit_articles_product_suggestions\` (
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
  await db.run(sql`CREATE INDEX \`clef_edit_articles_product_suggestions_order_idx\` ON \`clef_edit_articles_product_suggestions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_product_suggestions_parent_id_idx\` ON \`clef_edit_articles_product_suggestions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_product_suggestions_image_idx\` ON \`clef_edit_articles_product_suggestions\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`clef_edit_articles\` (
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
  await db.run(sql`CREATE UNIQUE INDEX \`clef_edit_articles_slug_idx\` ON \`clef_edit_articles\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_author_image_idx\` ON \`clef_edit_articles\` (\`author_image_id\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_hero_image_idx\` ON \`clef_edit_articles\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_updated_at_idx\` ON \`clef_edit_articles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`clef_edit_articles_created_at_idx\` ON \`clef_edit_articles\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`category_pages_id\` integer,
  	\`clef_edit_articles_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`category_pages_id\`) REFERENCES \`category_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`clef_edit_articles_id\`) REFERENCES \`clef_edit_articles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_category_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`category_pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_clef_edit_articles_id_idx\` ON \`payload_locked_documents_rels\` (\`clef_edit_articles_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`homepage_best_seller_medusa_product_handles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`handle\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_best_seller_medusa_product_handles_order_idx\` ON \`homepage_best_seller_medusa_product_handles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_best_seller_medusa_product_handles_parent_id_idx\` ON \`homepage_best_seller_medusa_product_handles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_promotion_banners_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage_promotion_banners\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_promotion_banners_images_order_idx\` ON \`homepage_promotion_banners_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_promotion_banners_images_parent_id_idx\` ON \`homepage_promotion_banners_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_promotion_banners_images_image_idx\` ON \`homepage_promotion_banners_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_promotion_banners\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`image_id\` integer,
  	\`href\` text,
  	\`is_active\` integer DEFAULT true,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_promotion_banners_order_idx\` ON \`homepage_promotion_banners\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_promotion_banners_parent_id_idx\` ON \`homepage_promotion_banners\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_promotion_banners_image_idx\` ON \`homepage_promotion_banners\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_new_launch_medusa_product_handles\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`handle\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_new_launch_medusa_product_handles_order_idx\` ON \`homepage_new_launch_medusa_product_handles\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_new_launch_medusa_product_handles_parent_id_idx\` ON \`homepage_new_launch_medusa_product_handles\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section\` text NOT NULL,
  	\`is_enabled\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_sections_order_idx\` ON \`homepage_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_sections_parent_id_idx\` ON \`homepage_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_homepage_videos\` (
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
  await db.run(sql`CREATE INDEX \`homepage_homepage_videos_order_idx\` ON \`homepage_homepage_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_homepage_videos_parent_id_idx\` ON \`homepage_homepage_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_homepage_videos_thumbnail_idx\` ON \`homepage_homepage_videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_customer_reviews\` (
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
  await db.run(sql`CREATE INDEX \`homepage_customer_reviews_order_idx\` ON \`homepage_customer_reviews\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_customer_reviews_parent_id_idx\` ON \`homepage_customer_reviews\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_customer_reviews_avatar_idx\` ON \`homepage_customer_reviews\` (\`avatar_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_title\` text,
  	\`hero_subtitle\` text,
  	\`hero_image_id\` integer,
  	\`hero_button_label\` text,
  	\`hero_button_href\` text,
  	\`best_seller_title\` text,
  	\`new_launch_title\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_hero_image_idx\` ON \`homepage\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`video_section_videos\` (
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
  await db.run(sql`CREATE INDEX \`video_section_videos_order_idx\` ON \`video_section_videos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`video_section_videos_parent_id_idx\` ON \`video_section_videos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`video_section_videos_thumbnail_idx\` ON \`video_section_videos\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`video_section\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_title\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_social_links_order_idx\` ON \`footer_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_social_links_parent_id_idx\` ON \`footer_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_quick_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_quick_links_order_idx\` ON \`footer_quick_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_quick_links_parent_id_idx\` ON \`footer_quick_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`description\` text,
  	\`copyright_text\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_logo_idx\` ON \`footer\` (\`logo_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`category_pages_top_medusa_product_handles\`;`)
  await db.run(sql`DROP TABLE \`category_pages_sections\`;`)
  await db.run(sql`DROP TABLE \`category_pages\`;`)
  await db.run(sql`DROP TABLE \`clef_edit_articles_questions\`;`)
  await db.run(sql`DROP TABLE \`clef_edit_articles_product_suggestions\`;`)
  await db.run(sql`DROP TABLE \`clef_edit_articles\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`homepage_best_seller_medusa_product_handles\`;`)
  await db.run(sql`DROP TABLE \`homepage_promotion_banners_images\`;`)
  await db.run(sql`DROP TABLE \`homepage_promotion_banners\`;`)
  await db.run(sql`DROP TABLE \`homepage_new_launch_medusa_product_handles\`;`)
  await db.run(sql`DROP TABLE \`homepage_sections\`;`)
  await db.run(sql`DROP TABLE \`homepage_homepage_videos\`;`)
  await db.run(sql`DROP TABLE \`homepage_customer_reviews\`;`)
  await db.run(sql`DROP TABLE \`homepage\`;`)
  await db.run(sql`DROP TABLE \`video_section_videos\`;`)
  await db.run(sql`DROP TABLE \`video_section\`;`)
  await db.run(sql`DROP TABLE \`footer_social_links\`;`)
  await db.run(sql`DROP TABLE \`footer_quick_links\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
}
