import EcommerceCatalog from "@/components/EcommerceCatalogContent";
import HomeSlider from "@/components/HomeSlider";
import { MarqueeSlider } from "@/components/MarqueeSlider";

export default function Home() {
  return (
    <div>
      <HomeSlider />
      <EcommerceCatalog />
      <MarqueeSlider />
    </div>
  );
}
