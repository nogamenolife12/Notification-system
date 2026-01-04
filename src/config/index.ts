import "dotenv/config";

export const config = {
    port : process.env.PORT || 3000,
    mongoURI : process.env.MONGO_URI || "",
    JWT_secret: process.env.JWT_SECRET,
}