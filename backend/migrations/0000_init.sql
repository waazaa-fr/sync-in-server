CREATE TABLE `cache` (
	`key` varchar(768) NOT NULL,
	`value` json,
	`expiration` int NOT NULL DEFAULT -1,
	CONSTRAINT `cache_key` PRIMARY KEY(`key`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`login` varchar(255) NOT NULL,
	`firstName` varchar(255),
	`lastName` varchar(255),
	`password` varchar(255) NOT NULL,
	`passwordAttempts` tinyint unsigned NOT NULL DEFAULT 0,
	`role` tinyint unsigned NOT NULL DEFAULT 1,
	`isActive` boolean NOT NULL DEFAULT true,
	`language` char(2),
	`permissions` varchar(255) NOT NULL DEFAULT '',
	`storageUsage` bigint unsigned DEFAULT 0,
	`storageQuota` bigint unsigned,
	`notification` tinyint unsigned NOT NULL DEFAULT 1,
	`onlineStatus` tinyint unsigned NOT NULL DEFAULT 0,
	`currentIp` char(15),
	`lastIp` char(15),
	`currentAccess` datetime,
	`lastAccess` datetime,
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_idx` UNIQUE(`email`),
	CONSTRAINT `login_idx` UNIQUE(`login`)
);
--> statement-breakpoint
CREATE TABLE `groups` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(255),
	`type` tinyint unsigned NOT NULL DEFAULT 0,
	`visibility` tinyint unsigned NOT NULL DEFAULT 0,
	`parentId` bigint unsigned,
	`permissions` varchar(255) NOT NULL DEFAULT '',
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`modifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `groups_id` PRIMARY KEY(`id`),
	CONSTRAINT `name_idx` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `users_groups` (
	`userId` bigint unsigned NOT NULL,
	`groupId` bigint unsigned NOT NULL,
	`role` tinyint unsigned NOT NULL DEFAULT 0,
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `users_groups_userId_groupId_pk` PRIMARY KEY(`userId`,`groupId`)
);
--> statement-breakpoint
CREATE TABLE `users_guests` (
	`userId` bigint unsigned NOT NULL,
	`guestId` bigint unsigned NOT NULL,
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `users_guests_userId_guestId_pk` PRIMARY KEY(`userId`,`guestId`),
	CONSTRAINT `user_guest_check` CHECK(`users_guests`.`userId` <> `users_guests`.`guestId`)
);
--> statement-breakpoint
CREATE TABLE `spaces` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`alias` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(255),
	`enabled` boolean NOT NULL DEFAULT true,
	`storageUsage` bigint unsigned NOT NULL DEFAULT 0,
	`storageQuota` bigint unsigned,
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`modifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`disabledAt` datetime,
	CONSTRAINT `spaces_id` PRIMARY KEY(`id`),
	CONSTRAINT `alias_idx` UNIQUE(`alias`)
);
--> statement-breakpoint
CREATE TABLE `spaces_members` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`spaceId` bigint unsigned NOT NULL,
	`userId` bigint unsigned,
	`groupId` bigint unsigned,
	`linkId` bigint unsigned,
	`role` tinyint unsigned NOT NULL DEFAULT 0,
	`permissions` varchar(32) DEFAULT '',
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`modifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `spaces_members_id` PRIMARY KEY(`id`),
	CONSTRAINT `space_user_uniq` UNIQUE(`spaceId`,`userId`),
	CONSTRAINT `space_group_uniq` UNIQUE(`spaceId`,`groupId`),
	CONSTRAINT `space_link_uniq` UNIQUE(`spaceId`,`linkId`)
);
--> statement-breakpoint
CREATE TABLE `spaces_roots` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`spaceId` bigint unsigned NOT NULL,
	`fileId` bigint unsigned,
	`alias` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`externalPath` varchar(4096),
	`permissions` varchar(32) DEFAULT '',
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`modifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `spaces_roots_id` PRIMARY KEY(`id`),
	CONSTRAINT `space_root_alias_uniq` UNIQUE(`id`,`alias`)
);
--> statement-breakpoint
CREATE TABLE `shares` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`ownerId` bigint unsigned,
	`parentId` bigint unsigned,
	`spaceId` bigint unsigned,
	`spaceRootId` bigint unsigned,
	`fileId` bigint unsigned,
	`externalPath` varchar(4096),
	`type` tinyint unsigned NOT NULL DEFAULT 0,
	`alias` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`enabled` boolean NOT NULL DEFAULT true,
	`description` varchar(255),
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`modifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`disabledAt` datetime,
	CONSTRAINT `shares_id` PRIMARY KEY(`id`),
	CONSTRAINT `alias_idx` UNIQUE(`alias`)
);
--> statement-breakpoint
CREATE TABLE `shares_members` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`shareId` bigint unsigned NOT NULL,
	`userId` bigint unsigned,
	`groupId` bigint unsigned,
	`linkId` bigint unsigned,
	`permissions` varchar(32) DEFAULT '',
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`modifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `shares_members_id` PRIMARY KEY(`id`),
	CONSTRAINT `share_user_uniq` UNIQUE(`shareId`,`userId`),
	CONSTRAINT `share_group_uniq` UNIQUE(`shareId`,`groupId`),
	CONSTRAINT `share_link_uniq` UNIQUE(`shareId`,`linkId`)
);
--> statement-breakpoint
CREATE TABLE `files` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`ownerId` bigint unsigned,
	`spaceId` bigint unsigned,
	`spaceExternalRootId` bigint unsigned,
	`shareExternalId` bigint unsigned,
	`path` varchar(4096) NOT NULL,
	`name` varchar(255) NOT NULL,
	`isDir` boolean NOT NULL,
	`inTrash` boolean NOT NULL DEFAULT false,
	`mime` varchar(255),
	`size` bigint unsigned DEFAULT 0,
	`mtime` bigint unsigned DEFAULT 0,
	`ctime` bigint unsigned DEFAULT 0,
	CONSTRAINT `files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `files_recents` (
	`id` bigint,
	`ownerId` bigint unsigned,
	`spaceId` bigint unsigned,
	`shareId` bigint unsigned,
	`path` varchar(4096) NOT NULL,
	`name` varchar(255) NOT NULL,
	`mime` varchar(255),
	`mtime` bigint unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `links` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`uuid` varchar(32) NOT NULL,
	`userId` bigint unsigned NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255),
	`requireAuth` boolean NOT NULL DEFAULT false,
	`nbAccess` int unsigned NOT NULL DEFAULT 0,
	`limitAccess` int unsigned NOT NULL DEFAULT 0,
	`expiresAt` date,
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `links_id` PRIMARY KEY(`id`),
	CONSTRAINT `uuid_idx` UNIQUE(`uuid`)
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`userId` bigint unsigned NOT NULL,
	`fileId` bigint unsigned NOT NULL,
	`content` text,
	`modifiedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`fromUserId` bigint unsigned,
	`toUserId` bigint unsigned NOT NULL,
	`content` json,
	`wasRead` boolean NOT NULL DEFAULT false,
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sync_clients` (
	`id` char(36) NOT NULL,
	`ownerId` bigint unsigned NOT NULL,
	`token` char(36) NOT NULL,
	`tokenExpiration` bigint unsigned NOT NULL,
	`info` json NOT NULL,
	`enabled` boolean NOT NULL DEFAULT true,
	`currentIp` char(15),
	`lastIp` char(15),
	`currentAccess` datetime,
	`lastAccess` datetime,
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `sync_clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sync_paths` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`clientId` char(36) NOT NULL,
	`ownerId` bigint unsigned,
	`spaceId` bigint unsigned,
	`spaceRootId` bigint unsigned,
	`shareId` bigint unsigned,
	`fileId` bigint unsigned,
	`settings` json NOT NULL,
	`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `sync_paths_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `groups` ADD CONSTRAINT `groups_parentId_groups_id_fk` FOREIGN KEY (`parentId`) REFERENCES `groups`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users_groups` ADD CONSTRAINT `users_groups_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users_groups` ADD CONSTRAINT `users_groups_groupId_groups_id_fk` FOREIGN KEY (`groupId`) REFERENCES `groups`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users_guests` ADD CONSTRAINT `users_guests_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users_guests` ADD CONSTRAINT `users_guests_guestId_users_id_fk` FOREIGN KEY (`guestId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `spaces_members` ADD CONSTRAINT `spaces_members_spaceId_spaces_id_fk` FOREIGN KEY (`spaceId`) REFERENCES `spaces`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `spaces_members` ADD CONSTRAINT `spaces_members_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `spaces_members` ADD CONSTRAINT `spaces_members_groupId_groups_id_fk` FOREIGN KEY (`groupId`) REFERENCES `groups`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `spaces_members` ADD CONSTRAINT `spaces_members_linkId_links_id_fk` FOREIGN KEY (`linkId`) REFERENCES `links`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `spaces_roots` ADD CONSTRAINT `spaces_roots_spaceId_spaces_id_fk` FOREIGN KEY (`spaceId`) REFERENCES `spaces`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `spaces_roots` ADD CONSTRAINT `spaces_roots_fileId_files_id_fk` FOREIGN KEY (`fileId`) REFERENCES `files`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shares` ADD CONSTRAINT `shares_ownerId_users_id_fk` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shares` ADD CONSTRAINT `shares_parentId_shares_id_fk` FOREIGN KEY (`parentId`) REFERENCES `shares`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shares` ADD CONSTRAINT `shares_spaceId_spaces_id_fk` FOREIGN KEY (`spaceId`) REFERENCES `spaces`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shares` ADD CONSTRAINT `shares_spaceRootId_spaces_roots_id_fk` FOREIGN KEY (`spaceRootId`) REFERENCES `spaces_roots`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shares` ADD CONSTRAINT `shares_fileId_files_id_fk` FOREIGN KEY (`fileId`) REFERENCES `files`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shares_members` ADD CONSTRAINT `shares_members_shareId_shares_id_fk` FOREIGN KEY (`shareId`) REFERENCES `shares`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shares_members` ADD CONSTRAINT `shares_members_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shares_members` ADD CONSTRAINT `shares_members_groupId_groups_id_fk` FOREIGN KEY (`groupId`) REFERENCES `groups`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shares_members` ADD CONSTRAINT `shares_members_linkId_links_id_fk` FOREIGN KEY (`linkId`) REFERENCES `links`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `files` ADD CONSTRAINT `files_ownerId_users_id_fk` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `files` ADD CONSTRAINT `files_spaceId_spaces_id_fk` FOREIGN KEY (`spaceId`) REFERENCES `spaces`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `files` ADD CONSTRAINT `files_spaceExternalRootId_spaces_roots_id_fk` FOREIGN KEY (`spaceExternalRootId`) REFERENCES `spaces_roots`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `files` ADD CONSTRAINT `files_shareExternalId_shares_id_fk` FOREIGN KEY (`shareExternalId`) REFERENCES `shares`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `files_recents` ADD CONSTRAINT `files_recents_ownerId_users_id_fk` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `files_recents` ADD CONSTRAINT `files_recents_spaceId_spaces_id_fk` FOREIGN KEY (`spaceId`) REFERENCES `spaces`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `files_recents` ADD CONSTRAINT `files_recents_shareId_shares_id_fk` FOREIGN KEY (`shareId`) REFERENCES `shares`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `links` ADD CONSTRAINT `links_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_fileId_files_id_fk` FOREIGN KEY (`fileId`) REFERENCES `files`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_fromUserId_users_id_fk` FOREIGN KEY (`fromUserId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_toUserId_users_id_fk` FOREIGN KEY (`toUserId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sync_clients` ADD CONSTRAINT `sync_clients_ownerId_users_id_fk` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sync_paths` ADD CONSTRAINT `sync_paths_clientId_sync_clients_id_fk` FOREIGN KEY (`clientId`) REFERENCES `sync_clients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sync_paths` ADD CONSTRAINT `sync_paths_ownerId_users_id_fk` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sync_paths` ADD CONSTRAINT `sync_paths_spaceId_spaces_id_fk` FOREIGN KEY (`spaceId`) REFERENCES `spaces`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sync_paths` ADD CONSTRAINT `sync_paths_spaceRootId_spaces_roots_id_fk` FOREIGN KEY (`spaceRootId`) REFERENCES `spaces_roots`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sync_paths` ADD CONSTRAINT `sync_paths_shareId_shares_id_fk` FOREIGN KEY (`shareId`) REFERENCES `shares`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sync_paths` ADD CONSTRAINT `sync_paths_fileId_files_id_fk` FOREIGN KEY (`fileId`) REFERENCES `files`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `expiration_idx` ON `cache` (`expiration`);--> statement-breakpoint
CREATE INDEX `role_idx` ON `users` (`role`);--> statement-breakpoint
CREATE INDEX `parent_idx` ON `groups` (`parentId`);--> statement-breakpoint
CREATE INDEX `type_idx` ON `groups` (`type`);--> statement-breakpoint
CREATE INDEX `visibility_idx` ON `groups` (`visibility`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `users_groups` (`userId`);--> statement-breakpoint
CREATE INDEX `group_idx` ON `users_groups` (`groupId`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `users_guests` (`userId`);--> statement-breakpoint
CREATE INDEX `guest_id` ON `users_guests` (`guestId`);--> statement-breakpoint
CREATE INDEX `space_idx` ON `spaces_members` (`spaceId`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `spaces_members` (`userId`);--> statement-breakpoint
CREATE INDEX `group_idx` ON `spaces_members` (`groupId`);--> statement-breakpoint
CREATE INDEX `link_idx` ON `spaces_members` (`linkId`);--> statement-breakpoint
CREATE INDEX `role_idx` ON `spaces_members` (`role`);--> statement-breakpoint
CREATE INDEX `alias_idx` ON `spaces_roots` (`alias`);--> statement-breakpoint
CREATE INDEX `space_idx` ON `spaces_roots` (`spaceId`);--> statement-breakpoint
CREATE INDEX `file_idx` ON `spaces_roots` (`fileId`);--> statement-breakpoint
CREATE INDEX `parent_idx` ON `shares` (`parentId`);--> statement-breakpoint
CREATE INDEX `owner_idx` ON `shares` (`ownerId`);--> statement-breakpoint
CREATE INDEX `space_idx` ON `shares` (`spaceId`);--> statement-breakpoint
CREATE INDEX `space_root_idx` ON `shares` (`spaceRootId`);--> statement-breakpoint
CREATE INDEX `file_idx` ON `shares` (`fileId`);--> statement-breakpoint
CREATE INDEX `type_idx` ON `shares` (`type`);--> statement-breakpoint
CREATE INDEX `share_idx` ON `shares_members` (`shareId`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `shares_members` (`userId`);--> statement-breakpoint
CREATE INDEX `group_idx` ON `shares_members` (`groupId`);--> statement-breakpoint
CREATE INDEX `link_idx` ON `shares_members` (`linkId`);--> statement-breakpoint
CREATE INDEX `owner_idx` ON `files` (`ownerId`);--> statement-breakpoint
CREATE INDEX `space_idx` ON `files` (`spaceId`);--> statement-breakpoint
CREATE INDEX `space_external_root_idx` ON `files` (`spaceExternalRootId`);--> statement-breakpoint
CREATE INDEX `share_external_idx` ON `files` (`shareExternalId`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `files` (`name`);--> statement-breakpoint
CREATE INDEX `path_idx` ON `files` (`path`);--> statement-breakpoint
CREATE INDEX `owner_idx` ON `files_recents` (`ownerId`);--> statement-breakpoint
CREATE INDEX `space_idx` ON `files_recents` (`spaceId`);--> statement-breakpoint
CREATE INDEX `share_idx` ON `files_recents` (`shareId`);--> statement-breakpoint
CREATE INDEX `mtime_idx` ON `files_recents` (`mtime`);--> statement-breakpoint
CREATE INDEX `path_idx` ON `files_recents` (`path`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `links` (`userId`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `comments` (`userId`);--> statement-breakpoint
CREATE INDEX `file_idx` ON `comments` (`fileId`);--> statement-breakpoint
CREATE INDEX `from_user_idx` ON `notifications` (`fromUserId`);--> statement-breakpoint
CREATE INDEX `to_user_idx` ON `notifications` (`toUserId`);--> statement-breakpoint
CREATE INDEX `owner_idx` ON `sync_clients` (`ownerId`);--> statement-breakpoint
CREATE INDEX `token_idx` ON `sync_clients` (`token`);--> statement-breakpoint
CREATE INDEX `client_idx` ON `sync_paths` (`clientId`);--> statement-breakpoint
CREATE INDEX `owner_idx` ON `sync_paths` (`ownerId`);--> statement-breakpoint
CREATE INDEX `space_idx` ON `sync_paths` (`spaceId`);--> statement-breakpoint
CREATE INDEX `space_root_idx` ON `sync_paths` (`spaceRootId`);--> statement-breakpoint
CREATE INDEX `share_idx` ON `sync_paths` (`shareId`);--> statement-breakpoint
CREATE INDEX `file_idx` ON `sync_paths` (`fileId`);