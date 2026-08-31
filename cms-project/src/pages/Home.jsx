import React from 'react'
import Header from '../components/Header'
import Categories from '../components/Categories'
import RecentBlogs from '../components/RecentBlogs'

const Home = () => {
  return (
    <div>
      <Header />
      <Categories/>
      <RecentBlogs/>
    </div>
  )
}

export default Home