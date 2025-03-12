"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CircleChevronLeft } from "lucide-react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CircleChevronRight } from "lucide-react";

const travelDestinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    image: "/images/greece.jpg",
    description:
      "White-washed buildings with blue domes overlooking the Aegean Sea.",
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image: "/images/kyoto.jpg",
    description:
      "Ancient temples, traditional gardens, and cherry blossoms in spring.",
  },
  {
    id: 3,
    name: "Machu Picchu, Peru",
    image: "/images/machupichu.jpg",
    description: "Mysterious Incan citadel set high in the Andes Mountains.",
  },
  {
    id: 4,
    name: "Amalfi Coast, Italy",
    image: "/images/peru.jpg",
    description:
      "Dramatic coastline with colorful fishing villages perched on cliffs.",
  },
  {
    id: 5,
    name: "Banff National Park, Canada",
    image: "/images/canada.jpg",
    description:
      "Turquoise lakes, snow-capped mountains, and abundant wildlife.",
  },
  {
    id: 6,
    name: "Bora Bora, French Polynesia",
    image: "/images/borabora.jpg",
    description:
      "Overwater bungalows on crystal clear lagoons surrounded by coral reefs.",
  },
];

const LpBackground = () => {
  const [currImageIndex, setCurrImageIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  const currImage = travelDestinations[currImageIndex];

  const nextImage = () => {
    setCurrImageIndex((prev) =>
      prev === travelDestinations.length - 1 ? 0 : prev + 1
    );
  };
  const prevImage = () => {
    setCurrImageIndex((prev) =>
      prev === 0 ? travelDestinations.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    let intervalId;

    if (autoplay) {
      intervalId = setInterval(() => {
        nextImage();
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [autoplay, currImageIndex]);

  return (
    <div className="backgroundSection relative w-full h-screen">
      <Image src={currImage.image} alt={currImage.name} fill />
      <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
        <Button
          variant="ghost"
          onClick={prevImage}
          size="bigIcon"
          className="bg-black bg-opacity-20 text-white rounded-full p-3 hover:bg-opacity-50 pointer-events-auto cursor-pointer"
        >
          <CircleChevronLeft size={48} strokeWidth={3} />
        </Button>
        <Button
          variant="ghost"
          onClick={nextImage}
          size="bigIcon"
          className="bg-black bg-opacity-20 text-white rounded-full p-3 hover:bg-opacity-50 pointer-events-auto cursor-pointer"
        >
          <CircleChevronRight />
        </Button>
      </div>
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center justify-center p-4 z-10 gap-2">
        <div className="w-[400px] flex gap-2">
          <Input
            type="search"
            placeholder="Let's hit of to our next destination"
            className="bg-amber-50/80 cursor-pointer text-black placeholder-black"
          />
          <Button className="cursor-pointer" variant="outline">
            <Search size={36} strokeWidth={1} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LpBackground;
