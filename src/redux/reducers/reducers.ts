import { LAST_SEARCH, LastSearch } from "../actions/actions";

export type lastSearchType = {lastSearch: string[]};

const initState = {lastSearch: []};

const reducer = (state:lastSearchType = initState, action: LastSearch) => {
  switch (action.type) {
      case LAST_SEARCH: 
        return {
          lastSearch: [
            ...state.lastSearch, action.name
          ]
          };
      default:
        return state;
  }
};

export default reducer;