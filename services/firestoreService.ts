import { Mode, ModeType, MusicTempo } from "@/state/mode/types";
import { PlaylistType } from "@/state/playlists/types";
import { StreamingServiceCredentialsType } from "@/state/streaming/types";
import {
  UserModeType,
  UserPlaylistsType,
  UserStreamingType,
} from "@/types/firebase";
import firestore from "@react-native-firebase/firestore";

// User mode settings
export async function getUserModeInfo(userId: string) {
  const modes = await firestore().collection("user_mode").doc(userId).get();
  return modes.data() as UserModeType;
}

export async function initUserModeInfo(userId: string) {
  await firestore()
    .collection("user_mode")
    .doc(userId)
    .set({
      selectedMode: Mode.TIMER,
      modsInfo: {
        [Mode.TIMER]: [
          {
            indicator: "00:00",
            musicTempo: MusicTempo.MEDIUM,
          },
        ],
        [Mode.MAP]: [
          {
            indicator: "A",
            musicTempo: MusicTempo.MEDIUM,
          },
        ],
        [Mode.LENGTH]: [
          {
            indicator: "0",
            musicTempo: MusicTempo.MEDIUM,
          },
        ],
        [Mode.PACE]: [
          {
            indicator: "00:00",
            musicTempo: MusicTempo.MEDIUM,
          },
        ],
      },
    });
}

export async function setUserModeInfo(userId: string, mode: ModeType) {
  await firestore().collection("user_mode").doc(userId).set(mode);
}
// User Streaming info
export async function getUserStreamingInfo(userId: string) {
  const streamingServices = await firestore()
    .collection("user_streaming")
    .doc(userId)
    .get();
  return streamingServices.data() as UserStreamingType;
}

export async function initUserStreamingInfo(userId: string) {
  await firestore().collection("user_streaming").doc(userId).set({});
}

export async function setUserStreamingInfo(
  userId: string,
  service: StreamingServiceCredentialsType
) {
  await firestore().collection("user_streaming").doc(userId).set(service);
}
// Playlists
export async function getUserPlaylistInfo(userId: string) {
  const playlists = await firestore()
    .collection("user_playlists")
    .doc(userId)
    .get();
  return playlists.data() as UserPlaylistsType;
}

export async function initUserPlaylistInfo(userId: string) {
  await firestore().collection("user_playlists").doc(userId).set({
    playlists: [],
  });
}

export async function setUserPlaylistInfo(
  userId: string,
  playlists: Array<PlaylistType>
) {
  await firestore()
    .collection("user_playlists")
    .doc(userId)
    .set({
      playlists: playlists.map((v) => ({
        id: v.id,
        active: v.active,
        streamingServiceId: v.streamingServiceId,
      })),
    });
}
