'use server'
import { signIn, signOut } from '@/auth'

export async function login(data: { username: string; password: string }) {
  await signIn('credentials', { ...data, redirect: false })
}

export async function logOut() {
  await signOut({ redirectTo: '/login' })
}
