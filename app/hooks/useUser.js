import axios from "axios";
import useSWR from "swr";

const fetcher = async (url, accessToken) => {
  const res = await axios({
    method: "GET",
    url: url,
    headers: accessToken
      ? {
          "Content-Type": "application/json",
        }
      : {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
  });
  return res.data;
};

const useUser = (query = "", accessToken = "") => {

  const { data, error } = useSWR(
    [query ? `http://localhost:3000/api/user/${query}` : null, accessToken],
    fetcher
  );

  return {
    userInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUser;
