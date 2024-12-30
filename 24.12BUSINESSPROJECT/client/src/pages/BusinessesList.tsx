import { useBusinesses } from "@/hooks/tan-stack/useBuisnesses";
import OneBusiness from "@/components/OneBusiness";

const BusinessList = () => {
  const { data, error, isLoading } = useBusinesses();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }
  //   console.log(data[1]);

  return (
    <div>
      <h1>Businesses</h1>
      <ul>
        {data?.map((business) => (
          <li key={business._id}>
            <OneBusiness business={business}></OneBusiness>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessList;
