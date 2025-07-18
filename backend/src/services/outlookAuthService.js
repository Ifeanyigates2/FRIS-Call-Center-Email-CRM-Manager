
require('dotenv').config();
console.log('AZURE_CLIENT_ID:', process.env.AZURE_CLIENT_ID);
const passport = require('passport');
const { OIDCStrategy } = require('passport-azure-ad');

passport.serializeUser((user, done) => {
  done(null, user.oid);
});

passport.deserializeUser((oid, done) => {
  // In production, fetch user from DB or persistent store
  done(null, { oid });
});

passport.use(new OIDCStrategy(
  {
    identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration`,
    clientID: process.env.AZURE_CLIENT_ID,
    clientSecret: process.env.AZURE_CLIENT_SECRET,
    responseType: 'code',
    responseMode: 'form_post',
    redirectUrl: 'http://localhost:3000/auth/callback',
    allowHttpForRedirectUrl: true,
    scope: ['profile', 'email', 'openid'],
    passReqToCallback: false,
  },
  (iss, sub, profile, accessToken, refreshToken, done) => {
    if (!profile.oid) return done(new Error('No OID found'), null);
    // Attach email for role checking
    profile.email = profile._json.preferred_username;
    return done(null, profile);
  }
));

module.exports = passport;
