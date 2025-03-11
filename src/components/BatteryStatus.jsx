import { useState, useEffect } from "react";
import { toast } from "sonner";  // Assuming you're using sonner for toasts

const BatteryStatus = () => {
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    const getBatteryStatus = async () => {
      try {
        // Check if the Battery API is available
        const battery = await navigator.getBattery();

        // Set the initial battery level
        setBatteryLevel(battery.level * 100);

        // Add event listener to track changes in battery level
        battery.addEventListener("levelchange", () => {
          const currentLevel = battery.level * 100;
          setBatteryLevel(currentLevel);

          // Show the toast notification if battery is 20% or lower
          if (currentLevel <= 20) {
            toast.warning("Warning: Battery is low! Please plug in your device.");
          }
        });
      } catch (error) {
        console.error("Battery API not supported or error: ", error);
      }
    };

    getBatteryStatus();

    return () => {
      // Clean up event listener
      if (navigator.getBattery) {
        navigator.getBattery().then((battery) => {
          battery.removeEventListener("levelchange", () => {});
        });
      }
    };
  }, []);

  return null; // No need to render anything in the UI since we're only showing toasts
};

export default BatteryStatus;
