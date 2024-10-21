export const dbkeys = {
  dbUrl: process.env.DATABASE_URL as string
}

export const jwtKeys = {
  secret: process.env.JWT_SECRET ?? '',
  expires: process.env.JWT_EXPIRE ?? ''
}

export const sessionKeys = {
  secret: process.env.SESSION_SECRET ?? ''
}

export const cookiesKeys = {
  secret: process.env.COOKIE_SECRET ?? '',
}

