const crypto = require('crypto');


const createJWT = (user : any) => {
  return crypto.randomBytes(64).toString('hex');

};


export {
  createJWT
};
