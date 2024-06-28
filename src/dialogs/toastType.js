import { toast } from 'react-toastify'

const notificationType = { 
    error: toast.error, 
    success: toast.success, 
    loading: toast.loading 
  }

export { notificationType }