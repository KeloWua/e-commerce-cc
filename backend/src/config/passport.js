import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pool from "./db.js";
import { generateToken } from "../utils/jwt.js";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,        // lo obtendrás de Google Cloud
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,// idem
    callbackURL: "/auth/google/callback"
  },
async (accessToken, refreshToken, profile, done) => {
  try {
    const googleId = profile.id;
    const email = profile.emails[0].value;
    const name = profile.displayName;

    let { rows } = await pool.query(
      "SELECT * FROM users WHERE google_id = $1",
      [googleId]
    );

    let user = rows[0];

    if (!user) {

      const emailSearch = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      user = emailSearch.rows[0];

      if (user) {

        const updated = await pool.query(
          "UPDATE users SET google_id = $1 WHERE id = $2 RETURNING *",
          [googleId, user.id]
        );

        user = updated.rows[0];
      } else {
        
        const insert = await pool.query(
          "INSERT INTO users (name, email, google_id) VALUES ($1, $2, $3) RETURNING *",
          [name, email, googleId]
        );

        user = insert.rows[0];
      }
    }

    const token = generateToken({ id: user.id, email: user.email });

    done(null, { user, token });

  } catch (err) {
    done(err, null);
  }
}
));

export default passport;