const createTokenUser = ({ name, email, region, _id, userID }) => {
  let id = _id?.toString() || userID;
  return { name, email, region, userID: id };
};

module.exports = createTokenUser;
