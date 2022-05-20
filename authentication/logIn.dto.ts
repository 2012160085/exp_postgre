import { IsString } from 'class-validator';

class LogInDto {
  public username: string;
  public password: string;
}

export default LogInDto;
