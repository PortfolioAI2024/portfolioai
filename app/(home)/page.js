"use client";
import useSWR from "swr";
import { UserButton } from '@clerk/clerk-react'
import React from 'react'

const Home = () => {
  return (
    <div>
      <p>
        Home
      </p>
      <UserButton afterSignOutUrl='/' />
    </div>
  )
}

export default Home