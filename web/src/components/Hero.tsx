import Carousel, { CarouselDict } from "@/components/Carousel";

export default function Hero({ dict }: { dict: CarouselDict }) {
  return <Carousel dict={dict} />;
}
