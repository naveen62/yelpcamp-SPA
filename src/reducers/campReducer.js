const campReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_CAMPGROUND':
            return [
                ...state,
                action.campground
            ]
        case 'EDIT_CAMPGROUND':
            return state.map((camp) => {
                if(camp._id.toString() == action.id.toString()) {
                    return {
                        ...camp,
                        ...action.campground
                    }
                } else {
                  return  camp
                }
            })
        case 'REMOVE_CAMPGROUND':
            return state.filter((camp) => camp._id.toString() !== action.id)
        case 'SET_CAMPGROUND':
            return action.campgrounds
        default:
            return state
    }
}
export default campReducer;