import { useEffect, useState } from "react";
import RepoCard from "../../Components/Card/RepoCard";
import useDebounce from "../../hooks/debounce";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../../store/github/github.api";

const Home = () => {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);
  const { isLoading, isError, data, error } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced]);

  const clickHandler = (username: string) => {
    console.log(repos);

    fetchRepos(username);
    setDropdown(false);
  };

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen">
      {isError && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-4 px-2  w-full h-[42px] mb-2"
          placeholder="Search for Github username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {dropdown && (
          <ul className="list-none absolute top-[42px] lef-0 right-0 max-h-[200px] overflow-y-scroll w-full shadow-md bg-white">
            {isLoading && <p className="text-center">Loding...</p>}

            {data?.map((user) => (
              <li
                onClick={() => clickHandler(user.login)}
                key={user.id}
                className="py-2 px-4 hover:bg-blue-900 hover:text-white transition-colors cursor-pointer flex justify-between items-center "
              >
                {user.login}
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-10 rounded-full"
                />
              </li>
            ))}
          </ul>
        )}

        <div className="container">
          {areReposLoading && (
            <p className="text-center mt-36">Repos are loading...</p>
          )}

          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
