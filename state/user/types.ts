export type UserType = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  providerData: {
    providerId: string;
  }[];
} | null;
