module.exports.sessionizeUser = user => {
    return { userId: user._id, isLoggedIn: true, firstName: user.firstName, email: user.email };
  }
