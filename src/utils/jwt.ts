const crypto = require('crypto');

const createJWT = () => crypto.randomBytes(64).toString('hex');

export {
  createJWT
};
