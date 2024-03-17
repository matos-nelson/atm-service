export const config = {
    HOST: "localhost",
    USER: String(process.env.POSTGRES_USER),
    PASSWORD: String(process.env.POSTGRES_PASSWORD),
    DB: String(process.env.POSTGRES_DB),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};

export const dialect = "postgres";