import React from 'react'
import { useGlobalContext } from './context'

const SearchForm = () => {
  const { query, handleSearch, handleTag, handleSort,handleTime } = useGlobalContext()

  return <form className="search-form" onSubmit={(e) => e.preventDefault()}>
    <h4 className='header'>search hacker news</h4>
    <div className='header'>
    <input placeholder='type here' type="text" className="form-input" value={query} onChange={e => handleSearch(e.target.value)} />
    <b>Search</b>
    <select className='form-select select-custom' onChange={(e) => {handleTag(e.target.value)}}>
      <option value ='all'>All</option>
      <option value='story' selected>Stories</option>
      <option value='comment'>Comments</option>
    </select>
    <b>by</b>
    <select className='form-select select-custom' onChange={(e)=>{handleSort(e.target.value)}}>
      <option value ='search' selected>Popularity</option>
      <option value = 'search_by_date' >Date</option>
    </select>
    <b>for</b>
    <select className='form-select select-custom' onChange={(e)=>{handleTime(e.target.value)}}>
      <option value='all_time' selected>All Time</option>
      <option value= 'A'>Last 24hr</option>
      <option value= 'B'>Past Week</option>
    </select>
    </div>

  </form>
}

export default SearchForm
