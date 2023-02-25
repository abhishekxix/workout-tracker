const createTokenUser = ({ name, email, region, _id: userID }) => {
  return { name, email, region, userID };
};

module.exports = createTokenUser;
