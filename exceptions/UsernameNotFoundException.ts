import HttpException from './HttpException';

class UsernameNotFoundException extends HttpException {
  constructor() {
    super(401, 'Username not found');
  }
}

export default UsernameNotFoundException;
