const getApplicationData = () => ({
  port: process.env.PORT,
  baseUrl: process.env.BASE_URL
});

const getSecurityData = () => ({
  CryptoSecretKey: process.env.CRYPTO_PRIVATE_KEY,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
  jwtExpirationTime: +process.env.JWT_EXPIRATION_TIME
});

const getMongoData = () => ({
  uri: process.env.MONGO_URI,
});

module.exports = {
  application: getApplicationData(),
  security: getSecurityData(),
  mongo: getMongoData(),
};