import { Images } from "@/constants/Images";
import { PlatformType } from "@/state/playlists/types";

export function groupBy<T, K extends string | number | symbol>(
  array: T[],
  keyGetter: (item: T) => K
): Record<K, T[]> {
  return array.reduce((result, item) => {
    const key = keyGetter(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {} as Record<K, T[]>);
}

export function randomizeArray<T>(array: T[]): T[] {
  const randomizedArray = [...array];
  let currentIndex = randomizedArray.length;
  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [randomizedArray[currentIndex], randomizedArray[randomIndex]] = [
      randomizedArray[randomIndex],
      randomizedArray[currentIndex],
    ];
  }
  return randomizedArray;
}

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
