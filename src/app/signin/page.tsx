'use client'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from '@/common/design'
import { signInWithEmail } from '@/lib/supabase/apis/auth'

// フォームで使用する変数の型を定義
type formInputs = {
  email: string
  password: string
}

/** サインイン画面
 * @screenname SignInScreen
 * @description ユーザのサインインを行う画面
 */
export default function SignInScreen() {
  const toast = useToast()
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>()

  const [show, setShow] = useState<boolean>(false)

  const onSubmit = handleSubmit(async (data) => {
    await signInWithEmail({
      email: data.email,
      password: data.password,
    })
  })
  return (
    <Flex
      flexDirection='column'
      width='100%'
      height='100vh'
      justifyContent='center'
      alignItems='center'
    >
      <VStack spacing='5'>
        <Heading>ログイン</Heading>
        <form onSubmit={onSubmit}>
          <VStack spacing='4' alignItems='left'>
            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor='email' textAlign='start'>
                メールアドレス
              </FormLabel>
              <Input
                id='email'
                {...register('email', {
                  required: '必須項目です',
                  maxLength: {
                    value: 50,
                    message: '50文字以内で入力してください',
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@+[a-zA-Z0-9-]+\.+[a-zA-Z0-9-]+$/,
                    message: 'メールアドレスの形式が違います',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor='password'>パスワード</FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  {...register('password', {
                    required: '必須項目です',
                    minLength: {
                      value: 8,
                      message: '8文字以上で入力してください',
                    },
                    maxLength: {
                      value: 50,
                      message: '50文字以内で入力してください',
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])[0-9a-zA-Z]*$/,
                      message:
                        '半角英数字かつ少なくとも1つの大文字を含めてください',
                    },
                  })}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              marginTop='4'
              color='white'
              bg='teal.400'
              isLoading={isSubmitting}
              type='submit'
              paddingX='auto'
              _hover={{
                borderColor: 'transparent',
                boxShadow: '0 7px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              ログイン
            </Button>
            <Button
              as={NextLink}
              bg='white'
              color='black'
              href='/signup'
              width='100%'
              _hover={{
                borderColor: 'transparent',
                boxShadow: '0 7px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              新規登録はこちらから
            </Button>
          </VStack>
        </form>
      </VStack>
    </Flex>
  )
}
