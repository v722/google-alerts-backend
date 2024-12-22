export const config = {
    NODE_ENV: process.env.NODE_ENV || 3002,
    DB: {
        URL: process.env.DB_URL || "mongodb://localhost:27017/GoogleAlert",
        NAME: process.env.DB_NAME || "GoogleAlert",
        POOL_SIZE: {
            MAX: 20,
            MIN: 5
        }
    }
};