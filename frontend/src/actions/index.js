export const CHANGE_MODEL_DATA = 'CHANGE_MODEL_DATA';
export const CHANGE_SEARCH_DATA = 'CHANGE_SEARCH_DATA';

export function changeModelData(payload){
   return{
      type: CHANGE_MODEL_DATA,
      filters,
      query,
      sort,
      data,
   };
}

export function changeSearchData(payload){
   return {
      type: CHANGE_SEARCH_DATA,
      filters,
      query,
      sort,
      data,
   };
}
