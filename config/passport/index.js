const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import { generateAccessToken, generateRefreshToken } from "../../app/generateTokens";
import User from "../../models/User"
import StoreToken from "../../models/StoreToken";
import cookie from "cookie";


passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/auth/google/callback"
    },
        async (access, refresh, profile, done) => {
            try {
                const currentUser = await User.findOne({ email: profile._json.email });
                if (!currentUser) {
                    const newUser = await User.create({
                        googleId: profile.id,
                        email: profile._json.email,
                        username: profile.displayName,
                        image: profile._json.picture,
                    });
                    // const accessToken = generateAccessToken(newUser);
                    // const refreshToken =  generateRefreshToken(newUser);
                    // await StoreToken.create({ _id: newUser._id, refreshToken: refreshToken });
                    return done(null, newUser, { message: 'Auth successful' });
                } else {
                    // const accessToken = generateAccessToken(currentUser);
                    // const refreshToken = generateRefreshToken(currentUser);
                    // await StoreToken.create({ _id: currentUser._id, refreshToken: refreshToken });
                    return done(null, currentUser, { message: 'Auth successful' });
                }

            } catch (error) {
                console.log(error);
                done(error, false, {message: 'Server error!'});
            }
        }
    )
);