import { createSlice } from "@reduxjs/toolkit";

export const userslice=createSlice({
    name:'user',
    initialState:[],
    reducers:{
        userdata:(state,action)=>{
            const user={
                id:action.payload.id,
                username:action.payload.username,
                firstname:action.payload.first_name,
                lastname:action.payload.last_name,
                email:action.payload.email,
                phonenumber:action.payload.phone_number,
                isLoggedIn: true,
                
            }
            console.log(user)
            return{
                ...state,
                user,
            }

        },
        docdata:(state,action)=>{
            const docuser={
                id:action.payload.id,
                username:action.payload.username,
                firstname:action.payload.first_name,
                lastname:action.payload.last_name,
                email:action.payload.email,
                phonenumber:action.payload.phone_number,
                docisLoggedIn: true,
                
            }
            console.log(docuser)
            return{
                ...state,
                docuser,
            }

        },
        admindata:(state,action)=>{
            const admin={
                id:action.payload.id,
                username:action.payload.username,
                firstname:action.payload.first_name,
                lastname:action.payload.last_name,
                email:action.payload.email,
                phonenumber:action.payload.phone_number,
                adisLoggedIn: true,
                
            }
            console.log(admin)
            return{
                ...state,
                admin,
            }

        },

        login:(state,action)=>{
            const token={
                access:action.payload.access,
                refresh:action.payload.refresh
            }
            console.log(token)
            return{
                ...state,token
            }
        },
        logout:(state)=>{
            console.log("Removing token and user data...");
            return {
              ...state,
              token: null,
              user: null,
              isLoggedIn: false,
            };

        },
        doclogout:(state)=>{
            console.log("Removing token and data of doctor...");
            return {
              ...state,
              token: null,
              docuser: null,
              docisLoggedIn: false,
            };

        },
        adminlogout:(state)=>{
            console.log("Removing token and data of admin...");
            return {
              ...state,
              token: null,
              admin: null,
              adisLoggedIn: false,
            };

        },
        drinfo:(state,action)=>{
            const profitinalinfo={
            id:action.payload.id,
            regno:action.payload.regno,
            clinic_name:action.payload.clinic_name,
            specialization:action.payload.specialization,
            Addressline1:action.payload.Addressline1,
            Addressline2:action.payload.Addressline2,
            link_of_map:action.payload.link_of_map,
            district:action.payload.district,
            states:action.payload.state,
            completed:action.payload.completed,
            payment:action.payload.payment
            }
            return{
                ...state,profitinalinfo
            }
            

        },
        pic:(state,action)=>{

            const profile={
                image:action.payload.profile_picture
            }
            return{
                ...state,profile
            }
        },
         docpic:(state,action)=>{

            const docprofile={
                image:action.payload.profile_picture
            }
            return{
                ...state,docprofile
            }
        }

        }
    }
);



export const{userdata,login,drinfo,pic,logout,docdata,docpic,doclogout,admindata,adminlogout} = userslice.actions;

export default userslice.reducer;