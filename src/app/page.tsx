import ProductArea from "@/components/Product-Area";
import HomeSlider from "@/components/HomeSlider";
import { MarqueeSlider } from "@/components/MarqueeSlider";

export default function Home() {
  return (
    <div>
      <HomeSlider />
      <ProductArea />
      <MarqueeSlider />
    </div>
  );
}
