const setCampgrounds = (campgrounds) => ({
    type: 'SET_CAMPGROUND',
    campgrounds
})
const addCampground = (campground) => ({
    type: 'ADD_CAMPGROUND',
    campground
})

export {setCampgrounds, addCampground};        