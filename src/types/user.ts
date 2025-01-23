export type UserAuth = {
  token: {
    tokenType: "Bearer";
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    picture?: string;
    role: "user" | "lawyer";
    createdAt: string;
  };
};
