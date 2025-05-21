import { Mode, ModeOptionType, ModeType, MusicTempo } from "@/state/mode/types";
import { PlaylistType, TrackType } from "@/state/playlists/types";
import { StreamingServiceCredentialsType } from "@/state/streaming/types";
import { UserModeType, UserStreamingType } from "@/types/firebase";
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
            indicator: "0,0",
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
            indicator: "300:360",
            musicTempo: MusicTempo.MEDIUM,
          },
        ],
      },
    });
}

export async function setUserModeInfo(
  userId: string,
  mode: Omit<ModeType, "currentOptionIndex">
) {
  await firestore().collection("user_mode").doc(userId).set(mode);
}

export async function updateSelectedUserModeInfo(userId: string, mode: Mode) {
  await firestore()
    .collection("user_mode")
    .doc(userId)
    .update({ selectedMode: mode });
}

export async function updateUserModeInfo(
  userId: string,
  mode: Mode,
  modeOption: ModeOptionType[]
) {
  const key = "modsInfo." + mode;
  await firestore()
    .collection("user_mode")
    .doc(userId)
    .update({ [key]: modeOption });
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

export async function resetUserStreamingInfo(userId: string) {
  await firestore().collection("user_streaming").doc(userId).set({});
}

// Playlists
export async function getUserPlaylistInfo(
  userId: string
): Promise<PlaylistType[]> {
  const playlists = await firestore()
    .collection("user_playlists")
    .doc(userId)
    .collection("playlists")
    .get();
  const res = await Promise.all(
    playlists.docs.map(async (doc) => {
      const playlist = { ...doc.data(), id: doc.id } as PlaylistType;
      const tracks = await getUserPlaylistTracks(userId, playlist.id);
      return {
        ...playlist,
        tracks,
      };
    })
  );
  return res;
}

export async function initUserPlaylistInfo(userId: string) {
  const userPlaylistsRef = firestore().collection("user_playlists").doc(userId);
  await userPlaylistsRef.set({});
  await userPlaylistsRef.collection("playlists").doc().set({});
}

export async function addUserPlaylistInfo(
  userId: string,
  playlist: PlaylistType
) {
  await firestore()
    .collection("user_playlists")
    .doc(userId)
    .collection("playlists")
    .doc(playlist.id)
    .set({
      active: false,
      streamingServiceId: playlist.streamingServiceId,
    });
  if (playlist.tracks) {
    setUserPlaylistTracks(userId, playlist.id, playlist.tracks);
  }
}

export async function removeUserPlaylistInfo(
  userId: string,
  playlist: PlaylistType
) {
  await firestore()
    .collection("user_playlists")
    .doc(userId)
    .collection("playlists")
    .doc(playlist.id)
    .collection("tracks")
    .get()
    .then((docs) => {
      docs.docs.forEach((doc) => {
        doc.ref.delete();
      });
    });
  await firestore()
    .collection("user_playlists")
    .doc(userId)
    .collection("playlists")
    .doc(playlist.id)
    .delete();
}

export async function resetUserPlaylistInfo(userId: string) {
  await firestore()
    .collection("user_playlists")
    .doc(userId)
    .collection("playlists")
    .get()
    .then((docs) => {
      docs.docs.forEach(async (doc) => {
        await doc.ref
          .collection("tracks")
          .get()
          .then((docs) => {
            docs.docs.forEach((doc) => {
              doc.ref.delete();
            });
          });
        doc.ref.delete();
      });
    });
}

export async function setUserPlaylistActive(
  userId: string,
  playlistId: string,
  active: boolean
) {
  await firestore()
    .collection("user_playlists")
    .doc(userId)
    .collection("playlists")
    .doc(playlistId)
    .update({ active });
}

// Playlists Tracks
export async function getUserPlaylistTracks(
  userId: string,
  playlistId: string
): Promise<TrackType[]> {
  const tracks = await firestore()
    .collection("user_playlists")
    .doc(userId)
    .collection("playlists")
    .doc(playlistId)
    .collection("tracks")
    .get();
  return tracks.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as TrackType[];
}

export async function setUserPlaylistTracks(
  userId: string,
  playlistId: string,
  tracks: TrackType[]
) {
  tracks.forEach(async (track) => {
    await firestore()
      .collection("user_playlists")
      .doc(userId)
      .collection("playlists")
      .doc(playlistId)
      .collection("tracks")
      .doc(track.id)
      .set({
        active: track.active,
      });
  });
}

export async function removeUserPlaylistTracks(
  userId: string,
  playlistId: string,
  trackIds: string[]
) {
  trackIds.forEach(async (trackId) => {
    await firestore()
      .collection("user_playlists")
      .doc(userId)
      .collection("playlists")
      .doc(playlistId)
      .collection("tracks")
      .doc(trackId)
      .delete();
  });
}

export async function addUserPlaylistTracks(
  userId: string,
  playlistId: string,
  tracks: TrackType[]
) {
  tracks.forEach(async (track) => {
    await firestore()
      .collection("user_playlists")
      .doc(userId)
      .collection("playlists")
      .doc(playlistId)
      .collection("tracks")
      .doc(track.id)
      .set({
        active: track.active,
      });
  });
}

export async function toggleUserPlaylistTrackActive(
  userId: string,
  playlistId: string,
  trackId: string,
  active: boolean
) {
  await firestore()
    .collection("user_playlists")
    .doc(userId)
    .collection("playlists")
    .doc(playlistId)
    .collection("tracks")
    .doc(trackId)
    .update({ active });
}

export async function deleteUserData(userId: string) {
  await resetUserPlaylistInfo(userId);
  await firestore().collection("user_playlists").doc(userId).delete();
  await firestore().collection("user_streaming").doc(userId).delete();
  await firestore().collection("user_mode").doc(userId).delete();
}
