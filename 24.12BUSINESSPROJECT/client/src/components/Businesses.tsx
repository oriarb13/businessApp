import OneBusiness from "@/components/OneBusiness";
import { IBusiness } from "@/types/Type";

interface BusinessesProps {
  businesses: IBusiness[];
}

const Businesses = ({ businesses }: BusinessesProps) => {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Businesses</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {businesses?.map((business) => (
          <div key={business._id} className="col-span-1">
            <OneBusiness business={business} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Businesses;
