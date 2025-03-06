export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string | undefined;
  confirmPassword: string;
  bio?: string;
  profileUrl?: string;
  bannerUrl?: string;
  joinedDate?: string;
}
