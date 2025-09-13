import { toast } from 'react-toastify';

export function errorHanlder(error) {
    toast.error(error);
}
