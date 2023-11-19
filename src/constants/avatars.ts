export const avatar = (avatar: string) => `${process.env.PUBLIC_URL}/images/avatars/${avatar}.png`;

export enum AvatarName {
  BEAR = "bear",
  FOX = "fox",
  PEACOCK = "peacock",
  PELICAN = "pelican",
  RED_PANDA = "redpanda"
}