import { configureStore } from '@reduxjs/toolkit';

import { reducer as authReducer } from '../reducers/redux/authSlices';
import { reducer as classesReducer } from '../reducers/redux/classesSlices';
import { reducer as univReducer } from '../reducers/redux/studentReducers/universitySlices';
import { reducer as facReducer } from '../reducers/redux/studentReducers/facultySclices';
import { reducer as departReducer } from '../reducers/redux/studentReducers/departSlices';

export default configureStore({
  reducer: {
    auth: authReducer,
    classes: classesReducer,
    universities: univReducer,
    faculties: facReducer,
    departments: departReducer
  },
});
