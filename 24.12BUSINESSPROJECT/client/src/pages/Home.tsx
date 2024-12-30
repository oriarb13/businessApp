import { useBusinesses } from "@/hooks/tan-stack/useBuisnesses";
import OneBusiness from "@/components/OneBusiness";
import Businesses from "@/components/Businesses";
import HomeCarousel from "@/components/HomeCarousel";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

const Home = () => {
  
  const { user, fetchUser } = useUser();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUser();
        console.log("Fetched user:", user); 
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, [])
  const { data, error, isLoading } = useBusinesses();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }
    console.log(data);

  return (

    <div className="flex flex-col items-center max-w-full min-h-screen px-1 bg-gradient-to-r from-blue-100 to-purple-100">
    <header className="w-full bg-[hsl(198, 91.40%, 31.80%)] text-[hsl(200,76%,44%)] py-6 mx-3 text-center shadow-md">
        <h1 className="text-3xl font-bold">explore new businesses</h1>
        <p className="mt-2 text-sm">
            Discover and follow businesses .
        </p>
    </header>

    <main className="w-full max-w-6xl p-4 mx-3">
        <section className="mb-10">
            <HomeCarousel businesses={data} />
        </section>

        <section className="mb-10">
            <Businesses businesses={data}/>
        </section>
    </main>
    </div>
  );
};

export default Home;
