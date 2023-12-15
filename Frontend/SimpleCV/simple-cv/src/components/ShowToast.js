import { toast } from 'react-toastify';

function ShowToast(message) {
    toast.error(message, {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

export default ShowToast;