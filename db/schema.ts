import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const subscribers=sqliteTable('subscribers',{email:text('email').primaryKey(),tokenHash:text('token_hash').notNull(),createdAt:integer('created_at').notNull(),consentVersion:text('consent_version').notNull()});
export const messages=sqliteTable('messages',{id:text('id').primaryKey(),name:text('name').notNull(),email:text('email').notNull(),message:text('message').notNull(),createdAt:integer('created_at').notNull()});
