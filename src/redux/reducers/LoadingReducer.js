import * as config from './../constants/Loading/LoadingConst'; 

const initialState = {
    isLoading: false
}

const LoadingReducer =  (state = initialState, action) => {
    switch (action.type) {
        case config.DISPLAY_LOADING:
            state.isLoading = true;
            return { ...state }
        case config.HIDE_LOADING:
            state.isLoading = false;
            return { ...state }

        default:
            return state
    }
}
export default LoadingReducer; 