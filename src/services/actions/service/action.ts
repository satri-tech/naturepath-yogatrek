"use server"

// import { getSession } from "next-auth/react";




// export const DeleteService = async (formData:FormData) => {
//     try {
//         const data ={
//             id:formData.get("id")
//         }
//         const jsonData= JSON.stringify(data); 
//         const res= await fetch(`http://localhost:3000/api/services/delete`,{
//             method:"DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization :`bearer ${session.data?.user.accessToken}`
//               },
//             body:jsonData
//         })
//         console.log(res);
  
//     }catch(err){
//         console.log(err)
  
//     }
//   }

