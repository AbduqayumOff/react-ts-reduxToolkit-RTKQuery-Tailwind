import { useState } from "react";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";

const Favourites = () => {
  const { favourites } = useAppSelector((state) => state.github);
  const { removeFavourites } = useActions();
  const removeFromFavourite = (
    event: React.MouseEvent<HTMLButtonElement>,
    repo: string
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.preventDefault;
    removeFavourites(repo);
  };

  if (favourites.length === 0)
    return (
      <div className="h-screen w-full overflow-hidden relative">
        <h1 className="absolute top-[45%] left-[50%] transform translate-x-[-50%] translate-y-[-45%] font-bold text-center  text-gray-400 ">
          Your favourites is empty...
        </h1>
      </div>
    );

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen ">
      <ul className="list-none">
        {favourites.map((f, i) => (
          <li key={f} className="flex justify-between items-center mb-3">
            <div className="pr-3">
              <span className="mr-3">{i + 1}</span>
              <a href={f} target="_blank" className="font-bold">
                {f}
              </a>
            </div>
            <button
              className={`mt-2 py-2 px-4 bg-red-500 rounded hover:shadow-md transition-all text-white`}
              onClick={(event) => removeFromFavourite(event, f)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;
