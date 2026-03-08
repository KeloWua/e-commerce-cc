import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import pool from "./db.js";
import { generateToken } from "../utils/jwt.js";

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
          // Si el usuario existe, nos aseguramos de que tenga el google_id y actualizamos el nombre si está vacío
          const updated = await pool.query(
            "UPDATE users SET google_id = $1, name = CASE WHEN name IS NULL OR name = '' THEN $2 ELSE name END WHERE id = $3 RETURNING *",
            [googleId, name, user.id]
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

      const token = generateToken({ id: user.id, name: user.name, email: user.email, role: user.role });

      done(null, { user, token });

    } catch (err) {
      done(err, null);
    }
  }
));

export default passport;