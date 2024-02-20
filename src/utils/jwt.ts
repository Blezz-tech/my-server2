import jwt from 'jsonwebtoken';
import { jwt_secret } from '../config';

const createJWT = (user : any) => {
  const token : string = jwt.sign(user, jwt_secret);
  return token;
};

const isTokenValid = (token : string) => jwt.verify(token, jwt_secret);

export {
  createJWT,
  isTokenValid,
};
