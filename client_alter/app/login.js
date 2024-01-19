'use client';
import { signIn } from 'next-auth/react'

export function LoginBtn() {
  return (<button className="logoutBtn" onClick={() => { signIn() }}>로그인</button>)
} 