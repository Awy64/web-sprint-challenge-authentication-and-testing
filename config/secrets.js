module.exports = {
  jwtSecrets: process.env.JWT_SEC || "not so secure secret in place here",
  hash: process.env.HASH_CYCLES || 11
}