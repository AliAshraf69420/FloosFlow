const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const prisma = require("../prisma/prisma-client");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("=== Google OAuth Strategy Called ===");
                console.log("Profile ID:", profile.id);
                console.log("Profile Email:", profile.emails?.[0]?.value);

                const googleId = profile.id;
                const email = profile.emails[0].value;
                const firstName = profile.name?.givenName || "";
                const lastName = profile.name?.familyName || "";
                const profileImage = profile.photos[0]?.value || null;

                // 1) Check user by googleId
                let user = await prisma.user.findUnique({ where: { googleId } });
                if (user) {
                    console.log("Found existing user by googleId:", user.id);
                    return done(null, user);
                }

                // 2) Check by email
                user = await prisma.user.findUnique({ where: { email } });
                if (user) {
                    console.log("Found existing user by email, linking googleId:", user.id);
                    user = await prisma.user.update({
                        where: { id: user.id },
                        data: { googleId },
                    });
                    return done(null, user);
                }

                // 3) Create NEW Google user
                console.log("Creating new Google user for email:", email);
                user = await prisma.user.create({
                    data: {
                        googleId,
                        email,
                        firstName,
                        lastName,
                        profileImage,
                    },
                });
                console.log("Created new user:", user.id);

                return done(null, user);
            } catch (err) {
                console.error("OAuth Strategy Error:", err);
                return done(err, null);
            }
        }
    )
);



module.exports = passport;
