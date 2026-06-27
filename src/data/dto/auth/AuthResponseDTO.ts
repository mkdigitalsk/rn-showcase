export interface AuthUserDTO {
  id: number;
  email: string;
  name: string;
  themeMode: string;
  locale: string;
}

export interface AuthResponseDTO {
  token: string;
  user: AuthUserDTO;
}
