////// update

"use client";
import { useState, useEffect, useCallback } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Heart, Baby, Home, ShoppingCart, Palette, Flower } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    src: "/coverImage/Health.jpg",
    alt: "Health & Beauty Banner",
    headline: "Health & Beauty",
    subtext: "Premium skincare, cosmetics & wellness products",
    cta: "Shop Beauty",
    gradientImage: "from-pink-500/40 via-rose-500/30 to-red-600/40",
    gradientIcon: "from-pink-500 to-rose-500",
    icon: <Heart className="w-8 h-8" />,
  },
  {
    src: "/coverImage/babys.jpg",
    alt: "Baby Products Banner",
    headline: "Baby Products",
    subtext: "Everything your little one needs - safe & gentle",
    cta: "Shop Baby",
    gradientImage: "from-blue-500/40 via-cyan-500/30 to-teal-600/40",
    gradientIcon: "from-blue-500 to-cyan-500",
    icon: <Baby className="w-8 h-8" />,
  },
  {
    src: "/coverImage/kitchen.jpg",
    alt: "Home & Kitchen Banner",
    headline: "Home & Kitchen",
    subtext: "Transform your space with quality essentials",
    cta: "Shop Home",
    gradientImage: "from-orange-500/40 via-amber-500/30 to-yellow-600/40",
    gradientIcon: "from-orange-500 to-amber-500",
    icon: <Home className="w-8 h-8" />,
  },
  {
    src: "/coverImage/gloc.jpg",
    alt: "Grocery Banner",
    headline: "Grocery & Gourmet Food",
    subtext: "Organic produce, wholesome groceries, and specialty items.",
    cta: "Shop Grocery",
    gradientImage: "from-green-500/40 via-emerald-500/30 to-teal-600/40",
    gradientIcon: "from-green-500 to-emerald-500",
    icon: <ShoppingCart className="w-8 h-8" />,
  },
  // {
  //   src: "/coverImage/chocolate.jpg",
  //   alt: "Chocolate & Candy Banner",
  //   headline: "Chocolate & Candy",
  //   subtext: "Sweet treats & gourmet chocolates for every occasion",
  //   cta: "Shop Sweets",
  //   gradientImage: "from-purple-500/40 via-pink-500/30 to-rose-600/40",
  //   gradientIcon: "from-purple-500 to-pink-500",
  //   icon: <Candy className="w-8 h-8" />,
  // },
  {
    src: "/coverImage/art.jpg",
    alt: "Art & Craft Banner",
    headline: "Art & Craft",
    subtext: "Unleash creativity with premium art supplies",
    cta: "Shop Art",
    gradientImage: "from-indigo-500/40 via-purple-500/30 to-pink-600/40",
    gradientIcon: "from-indigo-500 to-purple-500",
    icon: <Palette className="w-8 h-8" />,
  },
  {
    src: "/coverImage/plant.jpg",
    alt: "Lawn & Garden Banner",
    headline: "Patio, Lawn & Garden",
    subtext: "Beautiful gardens start with quality tools & plants",
    cta: "Shop Garden",
    gradientImage: "from-green-500/40 via-lime-500/30 to-emerald-600/40",
    gradientIcon: "from-green-500 to-lime-500",
    icon: <Flower className="w-8 h-8" />,
  },
];

export default function HomeSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [api, setApi] = useState<EmblaCarouselType | undefined>();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setImages(slides.map((slide) => slide.src));
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!api || images.length <= 1 || !isAutoPlaying) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3500); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [api, images.length, isAutoPlaying]);

  // Track current slide
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentImageIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Manual navigation functions
  const goToSlide = useCallback(
    (index: number) => {
      if (api) {
        api.scrollTo(index);
      }
    },
    [api]
  );

  const goToPrevious = useCallback(() => {
    if (api) {
      api.scrollPrev();
    }
  }, [api]);

  const goToNext = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  // Pause/resume auto-play
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <Carousel
        setApi={setApi}
        className="w-full relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative">
              <div className="relative h-[400px] md:h-[600px] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={slide.src || "/placeholder.svg"}
                  alt={slide.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority={index === 0}
                  sizes="100vw"
                />
                {/* Gradient Overlay for Image */}
                {/* <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradientImage} rounded-2xl`}
                /> */}

                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-zinc-700/30 to-black/40 rounded-2xl" />

                {/* Animated Blobs */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
                  <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse delay-1000" />
                  <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full blur-xl animate-pulse delay-500" />
                </div>

                {/* Slide Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6"
                  >
                    {/* <div
                      className={`bg-gradient-to-r ${slide.gradientIcon} rounded-full p-4 mb-4 inline-block text-white shadow-lg`}
                    >
                      {slide.icon}
                    </div> */}
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white text-3xl md:text-6xl font-bold mb-4 drop-shadow-2xl leading-tight"
                  >
                    {slide.headline}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-white/90 text-lg md:text-2xl mb-8 drop-shadow-lg font-medium max-w-2xl"
                  >
                    {slide.subtext}
                  </motion.p>

                  {/* <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                    >
                      {slide.cta}
                    </Button>
                  </motion.div> */}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="left-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white w-12 h-12 shadow-lg"
          onClick={goToPrevious}
        />
        <CarouselNext
          className="right-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white w-12 h-12 shadow-lg"
          onClick={goToNext}
        />

        {/* Progress Dots - Product Modal Style */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center gap-1">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentImageIndex === index
                  ? "w-8 bg-black shadow-lg"
                  : "w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        {/* <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {slides.length}
        </div> */}
      </Carousel>

      {/* Feature Cards Below Slider */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {slides.slice(0, 4).map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            onClick={() => goToSlide(index)}
          >
            <div className="flex items-center mb-4">
              <div
                className={`bg-gradient-to-r ${slide.gradientIcon} rounded-lg p-3 text-white mr-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {slide.icon}
              </div>
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-gray-900 transition-colors">
                {slide.headline}
              </h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {slide.subtext}
            </p>
            {/* <Button
              variant="outline"
              className="w-full hover:bg-gray-800 hover:text-white transition-colors bg-transparent group-hover:border-gray-800"
            >
              {slide.cta}
            </Button> */}

            <Link href="/products" passHref>
              <Button
                variant="outline"
                className="w-full hover:bg-gray-800 hover:text-white transition-colors bg-transparent group-hover:border-gray-800"
              >
                {slide.cta}
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Additional Category Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {slides.slice(4).map((slide, index) => (
          <motion.div
            key={index + 4}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (index + 4) * 0.1 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group border border-gray-100"
            onClick={() => goToSlide(index + 4)}
          >
            <div className="flex items-center mb-4">
              <div
                className={`bg-gradient-to-r ${slide.gradientIcon} rounded-lg p-3 text-white mr-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {slide.icon}
              </div>
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-gray-900 transition-colors">
                {slide.headline}
              </h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {slide.subtext}
            </p>
            <Link href="/products" passHref>
              <Button
                variant="outline"
                className="w-full hover:bg-gray-800 hover:text-white transition-colors bg-transparent group-hover:border-gray-800"
              >
                {slide.cta}
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
