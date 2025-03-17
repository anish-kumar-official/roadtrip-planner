"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CircleChevronLeft } from "lucide-react";
import { Search } from "lucide-react";
import { CircleChevronRight } from "lucide-react";
import ItenaryDialog from "./components/itenaryDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

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

const roadTrip = [
  {
    id: 1,
    tripName: "India's Golden Triangle",
    route: "Delhi - Agra - Jaipur - Delhi",
    distanceCovered: "1200 km",
    description:
      "Short and sweet, the loop from Delhi to Agra and Jaipur packs a lot of wonders into a few days of driving. Your adventure begins in Delhi, where the ruins of eight cities tell the story of India's great Islamic empires. Hit the city's highlights, including Red Fort, Humayun's Tomb, the Jama Masjid and the bazaars of Chandni Chowk, which have changed only superficially since Mughal emperor Shah Jahan's time.",
  },
  {
    id: 2,
    tripName: "Bengaluru to Bandipur",
    route: "Bengaluru - Mysuru - Bandipur",
    distanceCovered: "235 km",
    description:
      "The drive south from Bengaluru (Bangalore) to Bandipur is one of the most scenic in Karnataka, passing through sandalwood and incense country to one of southern India's most appealing wildlife destinations. Though the entire distance can be covered in five hours, stretch it over several days to experience the cultural and natural diversity along the route. The journey takes in Mysore Palace, ancient temples, craft villages, and finally the lush forests of Bandipur National Park, home to elephants, tigers, and diverse bird species.",
  },
  {
    id: 3,
    tripName: "Mumbai to Goa",
    route: "Mumbai - Ratnagiri - Goa",
    distanceCovered: "590 km",
    description:
      "The coastal road that connects Mumbai to Goa is one of India's most famous road trips, winding along the spectacular Konkan Coast with the Arabian Sea on one side and the Western Ghats on the other. This journey offers pristine beaches, historic sea forts, fishing villages, and fresh seafood cuisine. The route passes through Maharashtra's Ratnagiri district with its mango orchards before reaching Goa's palm-fringed beaches and Portuguese colonial heritage, making for a perfect blend of culture, history, and tropical relaxation.",
  },
  {
    id: 4,
    tripName: "Chennai to Pondicherry",
    route: "Chennai - Mahabalipuram - Pondicherry",
    distanceCovered: "170 km",
    description:
      "The East Coast Road (ECR) connecting Chennai to Pondicherry offers a picturesque drive along the Bay of Bengal. The journey begins in bustling Chennai and passes through the UNESCO World Heritage Site of Mahabalipuram with its ancient stone-carved temples and monuments. As you continue south, the road hugs the coastline with beautiful views of the ocean, salt pans, and fishing villages. The trip culminates in Pondicherry (Puducherry), where French colonial influence is evident in the architecture, cuisine, and the planned layout of the old quarter.",
  },
  {
    id: 5,
    tripName: "Manali to Leh",
    route: "Manali - Rohtang Pass - Keylong - Sarchu - Leh",
    distanceCovered: "490 km",
    description:
      "One of the world's highest motorable roads, the journey from Manali to Leh is a bucket-list adventure for serious road-trippers. This high-altitude route crosses multiple mountain passes including Rohtang, Baralacha, and Tanglang La, which soars to over 5,300 meters above sea level. The dramatic landscape transforms from lush Himalayan forests near Manali to the stark, moon-like terrain of Ladakh. Most travelers spend 2-3 days on this journey, stopping at Keylong or Sarchu to acclimatize to the altitude, while taking in breathtaking vistas of snow-capped peaks, pristine lakes, and ancient Buddhist monasteries along the way.",
  },
  {
    id: 6,
    tripName: "The Spiti Circuit",
    route: "Shimla - Kinnaur - Spiti - Manali",
    distanceCovered: "650 km",
    description:
      "The Spiti Valley circuit offers an extraordinary journey through some of the most remote and spectacular landscapes in the Indian Himalayas. Beginning in the colonial hill station of Shimla, the route passes through the lush Kinnaur Valley with its apple orchards before entering the high-altitude desert landscape of Spiti. The journey features narrow roads carved into sheer cliff faces, ancient Buddhist monasteries perched on rocky outcrops, and traditional villages that seem frozen in time. Key stops include Kalpa, Tabo Monastery, Dhankar, Kaza, and Chandratal Lake before descending to Manali. This challenging route is best attempted during summer months when the roads are clear of snow.",
  },
  {
    id: 7,
    tripName: "Kerala's Coastal Route",
    route: "Kochi - Alleppey - Kollam - Kovalam",
    distanceCovered: "220 km",
    description:
      "Kerala's coastal highway offers a tropical journey through God's Own Country, showcasing the state's diverse landscapes and cultural heritage. Starting from the historic port city of Kochi with its Chinese fishing nets and colonial architecture, the route takes you through Alleppey's famous backwaters where houseboats glide through serene canals. Continuing south through Kollam, you'll experience traditional villages, cashew plantations, and numerous beaches before reaching the popular resort area of Kovalam. Throughout the journey, you'll encounter Kerala's distinctive cuisine, verdant landscapes, and a way of life deeply connected to water.",
  },
];

const LpBackground = () => {
  const [currImageIndex, setCurrImageIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="cursor-pointer bg-white/70 w-full"
                variant="outline"
              >
                <Search size={36} strokeWidth={1} /> Create a New Itenary
              </Button>
            </DialogTrigger>
            <ItenaryDialog />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default LpBackground;
