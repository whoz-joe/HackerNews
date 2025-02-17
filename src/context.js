import { IDLE_FETCHER } from '@remix-run/router'
import React, { useContext, useEffect, useReducer } from 'react'

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
  HANDLE_TAG,
  HANDLE_SORT,
  HANDLE_TIME,
} from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/'

const initialState = {
  loading: true,
  hits: [],
  query: '',
  page: 0,
  nbPages: 0,
  tag : 'story',
  search_by : 'search',
  date : 'all_time'
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchStories = async url => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await fetch(url)
      const data = await response.json()
      dispatch({ type: SET_STORIES, payload: { hits: data.hits, nbPages: data.nbPages } })
    } catch (error) {
      console.log(error);
    }
  }

  const removeStory = id => {
    dispatch({ type: REMOVE_STORY, payload: id })
  }

  const handleSearch = query => {
    dispatch({ type: HANDLE_SEARCH, payload: query })
  }

  const handlePage = value => {
    dispatch({ type: HANDLE_PAGE, payload: value })
  }

  const handleTag = tag => {
    dispatch({type : HANDLE_TAG, payload : tag})
  }

  const handleSort = sort_by => {
    dispatch({type : HANDLE_SORT, payload : sort_by})
  }

  const handleTime = time => {
    dispatch({type : HANDLE_TIME, payload : time})
  }

  useEffect(() => {
    var url = API_ENDPOINT+state.search_by+'?'
    url = url + 'query=' + state.query;
    url = url + '&page=' + state.page;
    if(state.tag !=='all' )
      url = url + '&tags=' + state.tag;
    if(state.date !== 'all_time'){
      var seconds = new Date().getTime() / 1000;
      if(state.date==='A'){   
        seconds= seconds-24*60*60;
      }
      else{
        seconds= seconds-7*24*60*60;
      }
      url=url+`&numericFilters=created_at_i>${seconds}`;
    }
    fetchStories(url)
  }, [state.query, state.page, state.tag, state.search_by, state.date])

  return <AppContext.Provider value={{ ...state, removeStory, handleSearch, handlePage, handleTag, handleSort, handleTime }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
