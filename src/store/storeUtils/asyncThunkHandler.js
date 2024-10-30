import toast from "react-hot-toast";

const asyncThunkHandler = (asyncFunction) => {
    return async (arg ) => {
        try {
            return await asyncFunction(arg );
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.error || "An unexpected error occurred.");
            throw error;
        }
    };
};
export default asyncThunkHandler;