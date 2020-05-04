const passport = require("passport");
const db = require("../../models");
const { Strategy, ExtractJwt } = require("passport-jwt");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "codecamp5",
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  const user = await db.User.findOne({ where: { id: payload.id } });

  if (user) {
    done(null, user); // user ที่มาจาก database นี้ไปไปแปะให้ใน req.user
  } else {
    done(null, false);
  }
});

passport.use("jwt-authentication", jwtStrategy);
