import { Link, useParams, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Avg from "./reviews/Avg";

interface BusinessProps {
  business: {
    name: string;
    _id: string;
    img?: string;
    description: string;
    category: string;
    owner: { _id: string; username: string };
    subscribers: string[];
    createdAt: string;
  };
}

const OneBusiness = ({ business }: BusinessProps) => {
  const location = useLocation();

  return (
    <div className="p-6 bg-[hsl(var(--card))] rounded-lg shadow-md ">
      <div>
        <Link
          to={`/business/${business._id}`}
          state={{ backgroundLocation: location }}
          className="underline text-[hsl(var(--light-blue))] dark:text-[hsl(var(--light-blue))]"
        >
          <h1 className="text-lg font-bold text-[hsl(var(--golden-yellow))] dark:text-[hsl(var(--dark-text))]">
            {business.name}
          </h1>
          <Avg id={business._id} />
          <img
            src={business.img}
            alt={business._id}
            className="block mx-auto rounded-lg"
          />
        </Link>
      </div>
      <div className="space-x-2">
        <Badge>Category: {business.category}</Badge>
        <Badge variant={"secondary"}>
          since: {new Date(business.createdAt).toLocaleDateString("en-GB")}
        </Badge>{" "}
      </div>

      <Accordion type="single" collapsible className="w-full mt-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-[hsl(var(--dark-blue))] dark:bg-[hsl(var(--dark-accent))] text-[hsl(var(--primary-foreground))]">
            <div className="text-black">Description:</div>
          </AccordionTrigger>
          <AccordionContent className="bg-[hsl(var(--dark-gray))]  dark:bg-[hsl(var(--dark-bg))] text-[hsl(var(--secondary-foreground))] dark:text-[hsl(var(--dark-text))]">
            {business.description}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default OneBusiness;
