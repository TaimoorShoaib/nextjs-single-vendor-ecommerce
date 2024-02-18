class userDTO {
  constructor(user) {
    this._id = user._id;
    this.username = user.username;
    this.email = user.email;
    this.isVerified = user.isVerified;
    this.isAdmin = user.isAdmin;
  }
}
module.exports = userDTO;
