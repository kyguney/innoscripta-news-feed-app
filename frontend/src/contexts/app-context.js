import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const AppContext = createContext()

export const useGlobalStates = () => {
  return useContext(AppContext)
}

export const newsAPI = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    Accept: 'application/json'
  }
})

export const csrf = () => newsAPI.get('/sanctum/csrf-cookie')

export const AppState = ({ children }) => {
  const navigate = useNavigate()
  const [currentMenuItem, setCurrentMenuitem] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [newsLoading, setNewsLoading] = useState(true)
  const [newsFeed, setNewsFeed] = useState([])
  const login = async ({ ...data }, loading) => {
    await csrf()
    try {
      await newsAPI.post('/login', {
        email: data.email,
        password: data.password
      })
      await getUser()
      setIsLoggedIn(true)
      loading(false)
      navigate('/profile')
    } catch (e) {
      alert(`Couldnt login! Error Message: ${e.message}`)
    }
  }
  const getUser = async () => {
    const { data } = await newsAPI.get('/api/user')
    setCurrentUser(data)
  }
  const logout = () => {
    newsAPI.post('/logout').then(() => {
      setNewsLoading(true)
      setCurrentUser(null)
      setIsLoggedIn(false)
      getFeeds(null, {})
    })
  }
  const getFeeds = async (user = null, filters = {}) => {
    try {
      const newsReq = await newsAPI.get('/api/news')
      const allNews = await newsReq.data
      await allNews.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.news_time) - new Date(a.news_time)
      })
      let resultFeed = await allNews
      if (user !== null) {
        const userSources = await user.sources.split(':').map(function (item) {
          return parseInt(item, 10)
        })
        const userCategories = await user.cats.split(':').map(function (item) {
          return parseInt(item, 10)
        })
        const userAuthors = await user.authors.split(':')
        const filteredByUserNews = await resultFeed.filter(
          (news) =>
            userSources.includes(news.source_id) &&
            userCategories.includes(news.cat_id) &&
            userAuthors.includes(news.author)
        )
        resultFeed = await filteredByUserNews
      }

      const filterNum = await Object.keys(filters).length

      if (filterNum > 0) {
        if (filters?.q !== undefined) {
          resultFeed = await resultFeed.filter(
            (feed) =>
              feed.title.toLowerCase().indexOf(filters.q.toLowerCase()) !==
                -1 ||
              feed.content.toLowerCase().indexOf(filters.q.toLowerCase()) !== -1
          )
        }
        if (filters?.category !== undefined) {
          resultFeed = await resultFeed.filter(
            (feed) => feed.category.id === filters?.category
          )
        }
        if (filters?.source !== undefined) {
          resultFeed = await resultFeed.filter(
            (feed) => filters?.source === feed.source.id
          )
        }
        if (filters?.between !== undefined) {
          const from = new Date(filters?.between[0])
          const to = new Date(filters?.between[1])
          resultFeed = await resultFeed.filter((feed) => {
            const currentFeedDate = new Date(feed.news_time)
            return currentFeedDate > from && currentFeedDate < to
          })
        }
      }

      setNewsFeed(resultFeed)
      setNewsLoading(false)
    } catch (e) {
      alert(`Couldnt login! Error Message: ${e.message}`)
      setNewsLoading(false)
    }
  }
  const globalStates = {
    csrf,
    currentMenuItem,
    setCurrentMenuitem,
    currentUser,
    login,
    logout,
    getUser,
    isLoggedIn,
    newsFeed,
    getFeeds,
    newsLoading,
    setNewsLoading,
    setNewsFeed
  }
  return (
    <AppContext.Provider value={globalStates}>{children}</AppContext.Provider>
  )
}
