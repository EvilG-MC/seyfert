import type { Snowflake } from '../index';
import type { APIGuildMember } from './guild';

/**
 * https://discord.com/developers/docs/resources/stage-instance#stage-instance-object
 */
export interface APIStageInstance {
	/**
	 * The id of the stage instance
	 */
	id: Snowflake;
	/**
	 * The guild id of the associated stage channel
	 */
	guild_id: Snowflake;
	/**
	 * The id of the associated stage channel
	 */
	channel_id: Snowflake;
	/**
	 * The topic of the stage instance (1-120 characters)
	 */
	topic: string;
	/**
	 * The privacy level of the stage instance
	 *
	 * See https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level
	 */
	privacy_level: StageInstancePrivacyLevel;
	/**
	 * The id of the scheduled event for this stage instance
	 */
	guild_scheduled_event_id?: Snowflake;
}

/**
 * https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level
 */
export enum StageInstancePrivacyLevel {
	/**
	 * The stage instance is visible to only guild members
	 */
	GuildOnly = 2,
}

/**
 * https://discord.com/developers/docs/resources/invite#invite-stage-instance-object-invite-stage-instance-structure
 */
export interface APIInviteStageInstance {
	/**
	 * The topic of the stage instance (1-120 characters)
	 */
	topic: string;
	/**
	 * The number of users in the stage
	 */
	participant_count: number;
	/**
	 * The number of users speaking in the stage
	 */
	speaker_count: number;
	/**
	 * The members speaking in the stage
	 *
	 * See https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure
	 */
	members: APIGuildMember[];
}
