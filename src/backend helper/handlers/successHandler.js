import { toast } from 'react-toastify';

export const successMsg = msg => {
    toast.success(msg || 'The operation is done successfully !');
};
