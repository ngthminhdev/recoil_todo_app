import axios from "axios";
import useSWR from "swr";

const url = "http://localhost:3000/api/comment";

const fetcher = async (url, accessToken) => {
  const res = await axios({
    method: 'GET',
    url: url,
    headers: accessToken ? {
       "Content-Type": "application/json" 
      }: 
      {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + accessToken
      },
  });
  return res.data;
};

const useFeedback = (query = "", accessToken = "") => {
   const { data,  error } = useSWR([`${url}/${query}`, accessToken], fetcher);

   return {
    feedback: data,
    isLoading: !error && !data,
    isError: error
   }
};

export default useFeedback;
