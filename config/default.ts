export default {
    port: process.env.PORT,
    mongoDBUrl: process.env.MONGO_DB_URL,
    accessTokenExpiresIn: 15,
    origin: `http://localhost:${process.env.PORT}`,
    logLevel: "debug",
    accessTokenPrivateKey: "",
    refreshTokenPrivateKey: "",
    smtp: {
        user: "qxa5fi4qlnnzhw43@ethereal.email",
        pass: "b3CyCwGZCndHJbbHGF",
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
    },
};
