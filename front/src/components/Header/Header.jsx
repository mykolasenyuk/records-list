export default function Header() {
    return (
        <>
            <h1
                className={
                    'flex items-center  justify-center text-5xl font-extrabold text-stone-400 text-center m-6'
                }
            >
                Voice Record List
            </h1>
            <h2 className="ml-2 font-semibold text-gray-500 text-center dark:text-gray-400">
                Store your's voice records here
            </h2>
        </>
    )
}
