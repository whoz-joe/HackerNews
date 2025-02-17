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

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING: return { ...state, loading: true }
    case SET_STORIES: return { ...state, loading: false, hits: action.payload.hits, nbPages: action.payload.nbPages }
    case REMOVE_STORY: return { ...state, hits: state.hits.filter(story => story.objectID !== action.payload) }
    case HANDLE_SEARCH: return { ...state, query: action.payload, page: 0 }
    case HANDLE_PAGE: if (action.payload === 'decrease') {
      let prevPage = state.page - 1
      if (prevPage < 0) prevPage = state.nbPages - 1
      return { ...state, page: prevPage }
    }
      if (action.payload === 'increase') {
        let nextPage = state.page + 1
        if (nextPage > state.nbPages - 1) nextPage = 0
        return { ...state, page: nextPage }
      }
      break;
    case HANDLE_TAG : return {...state, tag : action.payload}
    case HANDLE_SORT : return {...state, search_by : action.payload}
    case HANDLE_TIME : return {...state, date : action.payload}
    default: throw new Error(`no matching ${action.type} action type`)
  }
}

export default reducer
