import { Images } from "@/constants/Images";
import { PlatformType } from "@/state/playlists/types";

export function getPlatformIcon(platform: PlatformType) {
  switch (platform) {
    case "Spotify":
      return Images.streamingServices.spotify.icon;
    case "Apple Music":
      return Images.streamingServices.appleMusic.icon;
    case "YouTube Music":
      return Images.streamingServices.youtubeMusic.icon;
  }
}
