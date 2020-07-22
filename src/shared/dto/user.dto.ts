export class CreateUserDto {
  email: string;
  password: string;
  repeatPassword: string;
}

export class UserDto {
  _id: string;
  email: string;
  password: string;
  role: string;
}
