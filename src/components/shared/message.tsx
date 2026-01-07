import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastfyProps = {
    children?: React.ReactNode;
};

export function Toastfy({ children }: ToastfyProps) {

    return (
        <>
            {children}

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Bounce}
                toastClassName="rounded-lg shadow-md px-4 py-3 text-sm font-medium flex items-center gap-2"
                progressClassName="bg-violet-500 dark:bg-violet-400"
            />
        </>
    );
}