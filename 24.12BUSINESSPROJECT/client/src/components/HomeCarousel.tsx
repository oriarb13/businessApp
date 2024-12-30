import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import OneBusiness from "./OneBusiness";
import { IBusiness } from "@/types/Type";

interface HomeCarouselProps {
  businesses: IBusiness[];
}

export default function HomeCarousel({ businesses }: HomeCarouselProps) {
  return (
    <div className="my-8">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{ loop: true, align: "start" }}
      >
        <CarouselContent className="-ml-2">
          {businesses.map((bus) => (
            <CarouselItem
              key={bus._id}
              className="flex justify-center pl-2 my-4 "
            >
              <OneBusiness business={bus} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-[55%] -translate-y-1/3 z-10" />
        <CarouselNext className="absolute right-4 top-[55%] -translate-y-1/3 z-10" />
      </Carousel>
    </div>
  );
}
