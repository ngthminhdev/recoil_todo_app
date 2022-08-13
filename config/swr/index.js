import axios from "axios";
import useSWR from "swr";

const url = "http://localhost:3000/api/";

const fetcher = url => axios.get(url).then(res => res.data);