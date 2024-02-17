import Spinner from "../Spinner";

const SPending = () => {
    return (
        <div className="flex items-start justify-start gap-x-4">
            <div className="w-[40px] h-[40px] flex items-center justify-center">
                <Spinner />
            </div>
            <div className="flex h-[40px] items-center justify-center">
                <p className="mt-1 text-gray-100 text-opacity-95">
                    Pending swap transaction
                </p>
            </div>
        </div>
    );
};

export default SPending;
