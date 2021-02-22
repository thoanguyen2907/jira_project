const initialState = {
arrComment : []
}

const CommentReducer = (state = initialState, action) => {
    switch (action.type) {

        case "GET_ALL_COMMENTS_REDUCER": {
            state.arrComment =  action.arrComment; 
            
            return {...state}
          }
          case "INSERT_COMMENT": {

            state.arrComment= [...state.arrComment, action.comment]; 
         
            return {...state}
          }

          case "OPEN_EDIT_COMMENT":
            let {id, contentComment} = action;  
            let indexOpenCommentEdit = state.arrComment.findIndex(item => id === item.id);         
          let arrayCommentUpdate = [...state.arrComment]; 
            if(indexOpenCommentEdit !== -1){
              console.log(arrayCommentUpdate[indexOpenCommentEdit]); 
                arrayCommentUpdate[indexOpenCommentEdit].openEditor =  true; 
                arrayCommentUpdate[indexOpenCommentEdit].contentComment = contentComment; 
            } else {
                arrayCommentUpdate[indexOpenCommentEdit].openEditor  = false;             
            }
            state.arrComment = arrayCommentUpdate ; 
          return { ...state }

          case "CLOSE_EDIT_COMMENT":
    
            let {idComment} = action;  

            let indexCancelCommentEdit = state.arrComment.findIndex(item => idComment === item.id);         
          let arrayCommentCancelUpdate = [...state.arrComment]; 
    
            if(indexCancelCommentEdit !== -1){
                arrayCommentCancelUpdate[indexCancelCommentEdit].openEditor =  false; 
            } else {
                arrayCommentCancelUpdate[indexCancelCommentEdit].openEditor  = true;             
            }
            state.arrComment = arrayCommentCancelUpdate ; 
          return { ...state }
    default:
        return state
    }
}
export default CommentReducer; 
