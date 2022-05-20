import { IsOptional, IsString } from 'class-validator';
class CreateUserDto {

  @IsString()
  public firstname: string;

  @IsString()
  public lastname: string;

  @IsString()
  public password: string;

  @IsString()
  public username: string;

  @IsString()
  public phone: string;

  @IsString()
  @IsOptional()
  public avatar?: string;

  @IsString()
  @IsOptional()
  public machineId?: string;
}

export default CreateUserDto;
