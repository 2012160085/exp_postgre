import HttpException from './HttpException';

class UserWithThatPhoneAlreadyExistsException extends HttpException {
  constructor(phone: string) {
    super(400, `User with email ${phone} already exists`);
  }
}

export default UserWithThatPhoneAlreadyExistsException;
