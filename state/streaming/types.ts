export type StreamingServiceType = {
  id: string;
  info: StreamingServiceInfoType;
  credentials: StreamingServiceCredentialsType;
};

export type StreamingServiceInfoType = {
  name: string;
  profileImage: string;
};

export type StreamingServiceCredentialsType = {
  accessToken: string;
  expiresIn: number;
  issuedAt: number;
  refreshToken: string;
};
