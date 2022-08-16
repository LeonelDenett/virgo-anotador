// Toastify
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function ToastifyContainer() {
    return (
        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            rtl={false}
            closeOnClick={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
}

export default ToastifyContainer;