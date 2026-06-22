export type StreamerPlatform = {
  type: string
  stream_url: string
  channel_url: string
  is_live: boolean
  is_main_live_platform: boolean
}

export type Streamer = {
  username: string
  avatar: string
  twitch_url: string
  url: string
  is_live: boolean
  is_community_streamer: boolean
  platforms: StreamerPlatform[]
}

export type StreamersResponse = {
  streamers: Streamer[]
}
