// import { configureStore } from 'src/reduxjs/toolkit'
// import authReducer from '../core/services/auth'
// // import publisher from '../redux/publisher/publisherSlice'
// // import inventory from '../redux/inventory/inventorySlice'
// //
// // import googleauthSlice from './googleauth/googleauthSlice'
// // import videoSlice from './video/videoSlice'
// // import advertiserSlice from './advertiser/advertiserSlice'
// // import publisherUsersSlice from './publisherUsers/publisherUsersSlice'
// // import advertiserUsersSlice from './advertiserUsers/advertiserUsersSlice'
// // import orderSlice from './order/orderSlice'
// // import statusSlice from './orderStatus/orderStatusSlice'
// // import orderTableSlice from './orderTableSlice/orderTableSlice'
// // import inventoryStatusSlice from './inventoryStatus/inventoryStatusSlice'
// // import channelSlice from './channel/channelSlice'
// // import channelUsersSlice from './channelUsers/channelUsersSlice'
// // import advertiserAgencySlice from './AgencySlice/advertiserAgency/advertiserAgencySlice'
// // import advertiserAgencyUsersSlice from './AgencySlice/advertiserAgencyUsers/advertiserAgencyUsersSlice'
// // import statisticsSlice from './statisticsSlice'
// // import modalSlice from './modalSlice'
// // import revenueSlice from './revenueSlice'
//
// const store = configureStore({
//   reducer: {
//     // [apiSlice.reducerPath]: apiSlice.reducer,
//     auth: authReducer,
//     // publisher: publisher,
//     // publisherUser: publisherUsersSlice,
//     // advertiserAgency: advertiserAgencySlice,
//     // advertiserAgencyUsers: advertiserAgencyUsersSlice,
//     // inventory: inventory,
//     // channelUsers: channelUsersSlice,
//     // googleAuth: googleauthSlice,
//     // video: videoSlice,
//     // advertiser: advertiserSlice,
//     // advertiserUsers: advertiserUsersSlice,
//     // order: orderSlice,
//     // status: statusSlice,
//     // channel: channelSlice,
//     // inventoryStatus: inventoryStatusSlice,
//     // orderTable: orderTableSlice,
//     // statistics: statisticsSlice,
//     // revenue: revenueSlice,
//     // modal: modalSlice,
//   },
// })
//
// export default store

// import { configureStore } from 'src/reduxjs/toolkit'
import {configureStore} from "@reduxjs/toolkit";
import authReducer from 'src/core/features/auth'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
