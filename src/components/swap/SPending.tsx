import Spinner from "../Spinner";

type SPendingProps = {
    isDone: boolean;
    text: {
        pending: string;
        done: string;
    };
};

const SPending = ({ isDone, text }: SPendingProps) => {
    return (
        <div className="flex items-start justify-start gap-x-4">
            <div className="w-[40px] h-[40px] flex items-center justify-center">
                {isDone ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                ) : (
                    <Spinner />
                )}
            </div>
            <div className="flex h-[40px] items-center justify-center">
                <p
                    className={`${
                        !isDone && "mt-1"
                    } text-gray-100 text-opacity-95`}
                >
                    {isDone ? text.done : text.pending}
                </p>
            </div>
        </div>
    );
};

export default SPending;
