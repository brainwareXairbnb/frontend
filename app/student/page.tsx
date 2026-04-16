'use client'
import { useState } from 'react'
import { PhoneFrame } from '@/components/PhoneFrame'
import SLogin from './login/LoginScreen'
import SHome from './home/HomeScreen'
import SDetail from './detail/DetailScreen'
import SPayment from './payment/PaymentScreen'
import SBookings from './bookings/BookingsScreen'
import SSaved from './saved/SavedScreen'
import SProfile from './profile/ProfileScreen'

export default function StudentPage() {
  const [screen, setScreen] = useState('s-login')
  const [room, setRoom] = useState<any>(null)

  return (
    <PhoneFrame screen={screen} setScreen={setScreen}>
      {screen === 's-login' && <SLogin setScreen={setScreen} />}
      {screen === 's-home' && <SHome setScreen={setScreen} setRoom={setRoom} />}
      {screen === 's-detail' && <SDetail room={room} setScreen={setScreen} />}
      {screen === 's-payment' && <SPayment room={room} setScreen={setScreen} />}
      {screen === 's-bookings' && <SBookings setScreen={setScreen} />}
      {screen === 's-saved' && (
        <SSaved setScreen={setScreen} setRoom={setRoom} />
      )}
      {screen === 's-profile' && <SProfile />}
    </PhoneFrame>
  )
}
