import { Result } from '@/common/models/result.type'
import { supabase } from '@/lib/supabase/config'
import { User } from '@supabase/supabase-js'

/**
 * サインアップ処理（Email/Password）
 * @param email
 * @param password
 * @returns
 */
export const signUpWithEmail = async (args: {
  email: string
  password: string
}): Promise<Result> => {
  const { data, error } = await supabase.auth.signUp({
    email: args.email,
    password: args.password,
  })
  if (data) {
    return {
      isSuccess: true,
      message: '新規登録に成功しました',
    }
  } else {
    return {
      isSuccess: false,
      message: error?.message || '新規登録に失敗しました',
    }
  }
}

/**
 * サインイン処理（Email/Password）
 * @param email
 * @param password
 * @returns
 */
export const signInWithEmail = async (args: {
  email: string
  password: string
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: args.email,
    password: args.password,
  })
  if (data) {
    return {
      isSuccess: true,
      message: '新規登録に成功しました',
    }
  } else {
    return {
      isSuccess: false,
      message: error?.message || '新規登録に失敗しました',
    }
  }
}
