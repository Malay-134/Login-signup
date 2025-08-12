import { toast } from "react-toastify"

export const handleSuccess = (msg : string) => {
    toast.success(msg,{
        position:"top-center"
    })
} 
export const handleError = (msg:string) => {
    toast.error(msg,{
        position:"top-center"
    })
} 