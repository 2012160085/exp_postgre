import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import client from '../prismaClient';
import UserWithThatPhoneAlreadyExistsException from '../exceptions/UserWithThatPhoneAlreadyExistsException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import TokenData from '../interfaces/tokenData.interface';
import CreateUserDto from '../user/user.dto';

class AuthenticationService {

  public async register(userData: CreateUserDto) {
    if (
      await client.user.findFirst({
        where:{
          phone : userData.phone
        }
      })
    ) {
      throw new UserWithThatPhoneAlreadyExistsException(userData.phone);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 11);
    const user = await client.user.create({
      data:{
        ...userData,
        password: hashedPassword
      }
    })

    
    const tokenData = this.createToken(user);
    return {
      tokenData,
      user
    }
  }

  public createToken(user: User): TokenData {
    const expiresIn = 60; // 1시간
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      userId: user.id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret as jwt.Secret, { expiresIn }),
    };
  }
}

export default AuthenticationService;
