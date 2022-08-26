import { User } from '../users/user.entity';

export const sortByLogin = (a: User, b: User) => {
  if (a.login.toLowerCase() > b.login.toLowerCase()) {
    return 1;
  }
  if (a.login.toLowerCase() < b.login.toLowerCase()) {
    return -1;
  }
  return 0;
};
