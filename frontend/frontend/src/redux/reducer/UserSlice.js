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
        drinfo:(state,action)=>{
            const profitinalinfo={
            regno:action.payload.regno,
            clinic_name:action.payload.clinic_name,
            specialization:action.payload.specialization,
            Addressline1:action.payload.Addressline1,
            Addressline2:action.payload.Addressline2,
            link_of_map:action.payload.link_of_map,
            district:action.payload.district,
            states:action.payload.state,
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
        }

        }
    }
);



export const{userdata,login,drinfo,pic} = userslice.actions;

export default userslice.reducer;