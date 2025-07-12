import React from 'react'
import { Button } from './components/ui/button'
import {SignInButton} from '@clerk/clerk-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Category from './components/Category';
import MostSearchCrop from './components/MostSearchCrop';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';
import ListedItems from './components/ListedItems';

function Home() {
  return (
    <>
    <div>
        <Header />
        <Hero />
        <Category />
        <ListedItems/>
        <MostSearchCrop />
        <InfoSection />
        <Footer />
    </div>
    </>
  )
}

export default Home