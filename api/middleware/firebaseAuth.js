const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("../firebaseServiceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

// Middleware to verify Firebase ID Token
const verifyFirebaseToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!idToken) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Add Firebase user data to request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token", error });
  }
};

module.exports = verifyFirebaseToken;
