'use client'

import { useState } from 'react'
import {
  signInWithPopup,
  signInWithCredential,
  GoogleAuthProvider as FirebaseGoogleAuthProvider,
} from 'firebase/auth'
import { auth, googleProvider, isNative } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import { useAuth } from '@/lib/auth-context'

interface GoogleSignInButtonProps {
  onSuccess?: () => void
  onError?: (error: string) => void
  className?: string
  variant?: 'default' | 'outline'
  fullWidth?: boolean
}

export default function GoogleSignInButton({
  onSuccess,
  onError,
  className = '',
  variant = 'outline',
  fullWidth = true,
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { loginWithGoogle } = useAuth()
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    setIsLoading(true)

    try {
      let idToken: string

      if (isNative) {
        // Native app flow (Android/iOS)
        console.log('Using native Google Sign-In')

        // Initialize Google Auth for Capacitor
        await GoogleAuth.initialize({
          clientId: process.env.NEXT_PUBLIC_FIREBASE_WEB_CLIENT_ID,
          scopes: ['profile', 'email'],
          grantOfflineAccess: true,
        })

        // Sign in with Google (native)
        const googleUser = await GoogleAuth.signIn()

        // Get the Google ID token from the response
        const googleIdToken = googleUser.authentication.idToken

        // Sign in to Firebase with the Google credential to get a Firebase ID Token
        const credential = FirebaseGoogleAuthProvider.credential(googleIdToken)
        const firebaseResult = await signInWithCredential(auth, credential)
        
        // Get the actual Firebase ID token to send to your backend
        idToken = await firebaseResult.user.getIdToken()
      } else {
        // Web flow (browser popup)
        console.log('Using web Google Sign-In popup')
        const result = await signInWithPopup(auth, googleProvider)
        const user = result.user

        // Get Firebase ID token
        idToken = await user.getIdToken()
      }

      // Use the centralized loginWithGoogle which updates AuthContext and localStorage
      const user = await loginWithGoogle(idToken)

      // Call success callback
      if (onSuccess) {
        onSuccess()
      }

      // Redirect based on role
      const role = user.role
      if (role === 'admin') {
        router.push('/admin/dashboard')
      } else if (role === 'owner') {
        if (user.isApproved) {
          router.push('/owner/dashboard')
        } else {
          router.push('/pending-approval')
        }
      } else {
        router.push('/dashboard')
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error)

      let errorMessage = 'Failed to sign in with Google. Please try again.'

      // Handle Firebase Auth errors
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in popup was closed. Please try again.'
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage =
          'Sign-in popup was blocked by your browser. Please allow popups and try again.'
      } else if (error.error === 'popup_closed_by_user') {
        errorMessage = 'Sign-in was cancelled. Please try again.'
      }
      // Handle API errors from backend
      else if (error.response?.data?.error) {
        errorMessage = error.response.data.error
      }
      // Handle network/fetch errors
      else if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        errorMessage = 'Cannot connect to server. Please check your internet connection and try again.'
      }
      // Handle errors thrown by auth context
      else if (error.message) {
        errorMessage = error.message
      }

      if (onError) {
        onError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const baseClasses =
    'flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClasses = {
    default:
      'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm hover:shadow',
    outline:
      'bg-transparent text-gray-700 hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      type='button'
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
    >
      {isLoading ? (
        <>
          <svg
            className='animate-spin h-5 w-5 text-gray-600'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          <span>Please wait...</span>
        </>
      ) : (
        <>
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M19.6 10.2273C19.6 9.51819 19.5364 8.83637 19.4182 8.18182H10V12.05H15.3818C15.15 13.3 14.4455 14.3591 13.3864 15.0682V17.5773H16.6182C18.5091 15.8364 19.6 13.2727 19.6 10.2273Z'
              fill='#4285F4'
            />
            <path
              d='M10 20C12.7 20 14.9636 19.1045 16.6182 17.5773L13.3864 15.0682C12.4909 15.6682 11.3455 16.0227 10 16.0227C7.39545 16.0227 5.19091 14.2636 4.40455 11.9H1.06364V14.4909C2.70909 17.7591 6.09091 20 10 20Z'
              fill='#34A853'
            />
            <path
              d='M4.40455 11.9C4.20455 11.3 4.09091 10.6591 4.09091 10C4.09091 9.34091 4.20455 8.7 4.40455 8.1V5.50909H1.06364C0.386364 6.85909 0 8.38636 0 10C0 11.6136 0.386364 13.1409 1.06364 14.4909L4.40455 11.9Z'
              fill='#FBBC04'
            />
            <path
              d='M10 3.97727C11.4682 3.97727 12.7864 4.48182 13.8227 5.47273L16.6909 2.60455C14.9591 0.990909 12.6955 0 10 0C6.09091 0 2.70909 2.24091 1.06364 5.50909L4.40455 8.1C5.19091 5.73636 7.39545 3.97727 10 3.97727Z'
              fill='#EA4335'
            />
          </svg>
          <span>Google</span>
        </>
      )}
    </button>
  )
}
