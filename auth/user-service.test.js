const {isValid} = require('./user-services.js');

describe('user-services', () => {
  describe('isValid', () => {
    it('should return false if username is missing', () => {
      const user = {username: "", password: "1234"}
      expect(isValid(user)).toBeFalsy();
    })
    it("should return false if password is missing", () => {
      const user = {username: "user", password: ""}
      expect(isValid(user)).toBeFalsy();
    })
    it('should return false if password is not a string', () => {
      const user = {username: "user", password: {password: "password"}}
      expect(isValid(user)).toBeFalsy();
    })
    it('should return true if username and password are present.', () => {
      const user = {username: "user", password: "1234"}
      expect(isValid(user)).toBeTruthy();
    })
    it("should return false if both username and password are missing", () => {
      const user = {username: "", password: ""}
      expect(isValid(user)).toBeFalsy();
    })
  })
})