"use client";
import LpBackground from "./lpBackground";
import MapPage from "./components/mapPage";
import LpMytripSection from "./lpMytripSection";

const LandingPage = () => {
  return (
    <div className="gap-4 absolute inset-0">
      <LpBackground />
      <MapPage />
    </div>
  );
};

export default LandingPage;
