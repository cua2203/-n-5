export const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME || "laptopstore1",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "thong tin khoa bi mat",
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  },
  apiKey:"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",
  fromEmail : 'pcua0064@gmail.com',
  imagePath:'D:\\Kì 1 năm 4\\Đồ án 5\\uploads\\category\\',
};
