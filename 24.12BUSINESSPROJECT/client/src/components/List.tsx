import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import UserCard from "./User";
import { useNavigate } from "react-router-dom";

export interface Subscriber {
  _id: string;
  username: string;
  image?: string;
}

export interface Business {
  _id?: string;
  name: string;
  img?: string;
}

interface ListProps {
  data: Subscriber[] | Business[];
}

const List: React.FC<ListProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isSubscribersList = (
    data: Subscriber[] | Business[]
  ): data is Subscriber[] => {
    return (data as Subscriber[])[0]?.username !== undefined;
  };

  const handleItemClick = (item: Subscriber | Business) => {
    if ("username" in item) {
      // Subscriber
      navigate(`/user/${item.username}`);
    } else {
      // Business
      navigate(`/business/${item._id}`);
    }
  };

  return (
    <div>
      {isSubscribersList(data) ? (
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
              <div className="mb-2 text-xl font-medium cursor-pointer">
                Subscribers: {data.length}
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div>
                {data.map((subscriber) => (
                  <div
                    key={subscriber._id}
                    onClick={() => handleItemClick(subscriber)}
                    className="cursor-pointer"
                  >
                    <UserCard
                      name={subscriber.username}
                      image={subscriber.image || ""}
                    />
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
              <div className="mb-2 text-xl font-medium cursor-pointer">
                Subscribers: {data.length}
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div>
                {data.map((business) => (
                  <div
                    key={business._id}
                    onClick={() => handleItemClick(business)}
                    className="cursor-pointer"
                  >
                    <UserCard name={business.name} image={business.img || ""} />
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default List;
