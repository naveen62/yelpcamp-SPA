const setCampgrounds = (campgrounds) => ({
    type: 'SET_CAMPGROUND',
    campgrounds
})
const addCampground = (campground) => ({
    type: 'ADD_CAMPGROUND',
    campground
})
const editCampground = (id, campground) => ({
    type: 'EDIT_CAMPGROUND',
    id,
    campground
})
const removeCampground = (id) => ({
    type: 'REMOVE_CAMPGROUND',
    id
})

export {setCampgrounds, addCampground, editCampground, removeCampground};        