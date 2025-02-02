import type { BaseCDNUrlOptions } from '../api';
import type { ReturnCache } from '../cache';
import type { GuildEmojiStructure, GuildStructure } from '../client';
import type { UsingClient } from '../commands';
import { type EmojiShorter, Formatter, type MethodContext, type ObjectToLower } from '../common';
import type { APIEmoji, RESTPatchAPIChannelJSONBody, RESTPatchAPIGuildEmojiJSONBody } from '../types';
import { DiscordBase } from './extra/DiscordBase';

export interface GuildEmoji extends DiscordBase, ObjectToLower<Omit<APIEmoji, 'id'>> {}

export class GuildEmoji extends DiscordBase {
	constructor(
		client: UsingClient,
		data: APIEmoji,
		readonly guildId: string,
	) {
		super(client, { ...data, id: data.id! });
	}

	guild(mode?: 'rest' | 'flow'): Promise<GuildStructure<'cached' | 'api'>>;
	guild(mode: 'cache'): ReturnCache<GuildStructure<'cached'> | undefined>;
	guild(mode: 'cache' | 'rest' | 'flow' = 'flow'): unknown {
		switch (mode) {
			case 'cache':
				return (
					this.client.cache.guilds?.get(this.guildId) ||
					(this.client.cache.adapter.isAsync ? (Promise.resolve() as any) : undefined)
				);
			default:
				return this.client.guilds.fetch(this.guildId, mode === 'rest');
		}
	}

	edit(body: RESTPatchAPIChannelJSONBody, reason?: string): Promise<GuildEmojiStructure> {
		return this.client.emojis.edit(this.guildId, this.id, body, reason);
	}

	delete(reason?: string) {
		return this.client.emojis.delete(this.guildId, this.id, reason);
	}

	fetch(force = false): Promise<GuildEmojiStructure> {
		return this.client.emojis.fetch(this.guildId, this.id, force);
	}

	url(options?: BaseCDNUrlOptions) {
		return this.rest.cdn.emojis(this.id).get(options);
	}

	toString() {
		return Formatter.emojiMention(this.id, this.name, this.animated);
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			animated: !!this.animated,
		};
	}

	static methods({ client, guildId }: MethodContext<{ guildId: string }>) {
		return {
			edit: (emojiId: string, body: RESTPatchAPIGuildEmojiJSONBody, reason?: string): Promise<GuildEmojiStructure> =>
				client.emojis.edit(guildId, emojiId, body, reason),
			create: (body: Parameters<EmojiShorter['create']>[1]): Promise<GuildEmojiStructure> =>
				client.emojis.create(guildId, body),
			fetch: (emojiId: string, force = false): Promise<GuildEmojiStructure> =>
				client.emojis.fetch(guildId, emojiId, force),
			list: (force = false): Promise<GuildEmojiStructure[]> => client.emojis.list(guildId, force),
		};
	}
}
