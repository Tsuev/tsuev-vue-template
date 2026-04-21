import { useSupabase } from '@/composables/useSupabase'

const { supabase } = useSupabase()

const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { nickname: '' } },
  })
  if (error) {
    console.error('Error signUp in:', error.message)
    return null
  }
  if (data) {
    console.log('User sigsignUpned in:', data.user)
    return data.user
  }
  return null
}

export { signUp }
