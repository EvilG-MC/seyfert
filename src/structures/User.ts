import { calculateUserDefaultAvatarIndex } from '../api';
import type { DMChannelStructure, MessageStructure, UserStructure } from '../client';
import { Formatter, type MessageCreateBodyRequest, type ObjectToLower } from '../common';
import type { ImageOptions } from '../common/types/options';
import type { APIUser } from '../types';
import { DiscordBase } from './extra/DiscordBase';

export interface User extends ObjectToLower<APIUser> {}

export class User extends DiscordBase<APIUser> {
	get tag() {
		return this.globalName ?? `${this.username}#${this.discriminator}`;
	}

	get name() {
		return this.globalName ?? this.username;
	}

	/**
	 * Fetch user
	 */
	fetch(force = false): Promise<UserStructure> {
		return this.client.users.fetch(this.id, force);
	}

	/**
	 * Open a DM with the user
	 */
	dm(force = false): Promise<DMChannelStructure> {
		return this.client.users.createDM(this.id, force);
	}

	write(body: MessageCreateBodyRequest): Promise<MessageStructure> {
		return this.client.users.write(this.id, body);
	}

	defaultAvatarURL() {
		return this.rest.cdn.embed.avatars.get(calculateUserDefaultAvatarIndex(this.id, this.discriminator));
	}

	avatarURL(options?: ImageOptions) {
		if (!this.avatar) {
			return this.defaultAvatarURL();
		}

		return this.rest.cdn.avatars(this.id).get(this.avatar, options);
	}

	avatarDecorationURL(options?: ImageOptions) {
		if (!this.avatarDecorationData) return;
		return this.rest.cdn['avatar-decoration-presets'](this.avatarDecorationData.asset).get(options);
	}

	bannerURL(options?: ImageOptions) {
		if (!this.banner) return;
		return this.rest.cdn.banners(this.id).get(this.banner, options);
	}

	presence() {
		return this.client.members.presence(this.id);
	}

	toString() {
		return Formatter.userMention(this.id);
	}
}
