import React from "react";
import { User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeaderSection = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-amber-700 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="font-bold text-xl text-white">Road Trip planner</div>

        <nav className="hidden md:flex items-center gap-2">
          <Button className="cursor-pointer" variant="outline" size="icon">
            <Bell />
          </Button>
          <Button className="cursor-pointer" variant="outline" size="icon">
            <User />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default HeaderSection;
