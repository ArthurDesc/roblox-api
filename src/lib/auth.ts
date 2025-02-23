import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import mongoose from 'mongoose'
import dbConnect from './mongodb'
import RobloxProvider from "next-auth/providers/roblox"
import { Session } from "next-auth"
import { User } from "next-auth"

export const authOptions = {
  adapter: MongoDBAdapter(dbConnect()),
  providers: [
    RobloxProvider({
      clientId: process.env.ROBLOX_OAUTHID,
      clientSecret: process.env.ROBLOX_OAUTHSECRET,
      authorization: {
        params: {
          scope: 'openid profile',
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      session.user.id = user.id
      return session
    }
  }
} 