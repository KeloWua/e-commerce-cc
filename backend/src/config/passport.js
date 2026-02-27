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
      const email = profile.emails[0].value;
      const name = profile.displayName;

      // Buscar usuario en DB
      const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      let user = rows[0];

      if (!user) {
        // Si no existe, crear usuario nuevo
        const insert = await pool.query(
          "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
          [name, email]
        );
        user = insert.rows[0];
      }

      // Aquí generamos JWT para el usuario
      const token = generateToken({ id: user.id, email: user.email });

      // Lo pasamos a done para que lo maneje la ruta callback
      done(null, { user, token });
    } catch (err) {
      done(err, null);
    }
  }
));

export default passport;