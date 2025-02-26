export type imageObjectType = {
  url: string;
  height: number | null;
  width: number | null;
};

export type userProfileInfoType = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: Array<imageObjectType>;
  product: string;
  type: string;
  uri: string;
};

export type playlistInfoType = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<imageObjectType>;
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string | null;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string | null;
  };
  public: false;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
};

export type playlistTrackInfo = {
  track: {
    id: string;
    duration_ms: number;
  };
};

export type trackInfoType = {
  album: {
    album_type: string;
    total_tracks: number;
    available_markets: Array<string>;
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: Array<imageObjectType>;
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: { reason: string };
    type: string;
    uri: string;
    artists: [
      {
        external_urls: { spotify: string };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }
    ];
  };
  artists: [
    {
      external_urls: { spotify: string };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }
  ];
  available_markets: Array<string>;
  disc_number: number;
  duration_ms: number;
  explicit: false;
  external_ids: { isrc: string; ean: string; upc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: {};
  restrictions: { reason: string };
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};
