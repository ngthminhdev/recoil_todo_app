/* eslint-disable react-hooks/exhaustive-deps */
import Filters from "../app/components/Filters";
import TodoList from "../app/components/TodoList";

export default function Home() {
  // const router = useRouter();
  // const isLoggedIn = useSessionStorage("authentication", "isLoggedIn");

  // useEffect(() => {
  //   router.prefetch("/auth/login");
  //   router.prefetch("/user/dashboard");

  //   if (isLoggedIn) {
  //     router.push("/user/dashboard");
  //   } else {
  //     router.push("/auth/login");
  //   }
  // }, [router]);

  return (
    <div
      style={{
        width: 500,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: 20,
        boxShadow: "0 0 10px 4px #bfbfbf",
        borderRadius: 5,
        height: "90vh",
      }}
      className="flex flex-col items-center jusify-center"
    >
      Reccoil Learning
      <Filters />
      <TodoList />
    </div>
  );
}
