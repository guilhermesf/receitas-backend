export class CreateUserDto {
  name: string;
  email: string;
  password?: string; // A senha será hasheada no service, então aqui pode ser opcional ou string.
} 