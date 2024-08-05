'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  console.log('Login function called')
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  console.log('Attempting to sign in with email:', data.email)

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Login error:', error.message)
    redirect('/error')
  }

  console.log('Login successful')
  revalidatePath('/', 'layout')
  console.log('Redirecting to home page')
  redirect('/')
}

export async function signup(formData: FormData) {
  console.log('Signup function called')
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  console.log('Attempting to sign up with email:', data.email)

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.error('Signup error:', error.message)
    redirect('/error')
  }

  console.log('Signup successful')
  revalidatePath('/', 'layout')
  console.log('Redirecting to home page')
  redirect('/')
}