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
    if (error.message.includes('Invalid login credentials')) {
      redirect('/?error=invalid_credentials')
    } else if (error.message.includes('User not found')) {
      redirect('/?error=user_not_found')
    } else {
      redirect(`/?error=${encodeURIComponent(error.message)}`)
    }
  }

  console.log('Login successful')
  revalidatePath('/i', 'layout')
  console.log('Redirecting to home page')
  redirect('/i')
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
    redirect('/i')
  }

  console.log('Signup successful')
  // revalidatePath('/i', 'layout')
  console.log('Redirecting to home page')
  // redirect('/i')
}