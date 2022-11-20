import React, { useState } from "react";
import { useActions } from "../../hooks/actions";
import { useAppSelector } from "../../hooks/redux";
import { IRepo } from "../../models/models";

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { addFavourites, removeFavourites } = useActions();
  const { favourites } = useAppSelector((state) => state.github);
  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.preventDefault;
    addFavourites(repo.html_url);
    setIsFav(true);
  };

  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.preventDefault;
    removeFavourites(repo.html_url);
    setIsFav(false);
  };

  return (
    <div className="border py-3 px-5 rounded mb-2 hover:bg-blue-900 hover:shadow-md hover:text-white transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{repo.description}</span>
          Watcher: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>
      </a>

      <button
        className={`w-full mt-2 py-2 px-4 ${
          !isFav ? "bg-violet-600 " : "bg-red-500"
        } rounded hover:shadow-md transition-all text-white`}
        onClick={!isFav ? addToFavourite : removeFromFavourite}
      >
        {!isFav ? "Add" : "Remove"}
      </button>
    </div>
  );
};

export default RepoCard;
