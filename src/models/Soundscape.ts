import { Track } from "./Track";

export type Soundscape = {
  id: number,
  name: string,
  tracks: Track[],
  cloneFrom?: string
};