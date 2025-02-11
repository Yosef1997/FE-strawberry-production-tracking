import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          return null
        }
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/auth/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: credentials.username,
                password: credentials.password,
              }),
            }
          )
          if (!response.ok) {
            throw new Error('Authentication failed')
          }
          const data = await response.json()

          const cookieStore = await cookies()
          cookieStore.set('sid', data.data.token, {
            maxAge: 24 * 60 * 60,
          })

          return {
            id: data.data.user.id.toString(),
            username: data.data.user.username,
            role: data.data.user.role,
            name: data.data.user.fullName,
            token: data.data.token,
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token
        token.role = user.role
        token.name = user.name!
        token.username = user.username
        token.id = user.id
      }

      return token
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.accessToken = token.accessToken
        session.user.role = token.role
        session.user.name = token.name!
        session.user.username = token.username!
        session.user.id = token.id!
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/error',
  },
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `session-jwt`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
      },
    },
  },

  secret: process.env.AUTH_SECRET,
})
