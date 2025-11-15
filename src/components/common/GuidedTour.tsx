import { useEffect, useState } from "react";
import Joyride from "react-joyride";

const GuidedTour = () => {
  const [run, setRun] = useState(false);

  const steps = [
    {
      target: "#nav-menu",
      content: "Use the navigation to switch between pages.",
      disableBeacon: true,
    },
    {
      target: "#theme-toggle",
      content: "Click to toggle between light and dark mode.",
      disableBeacon: true,
    },
  ];

  useEffect(() => {
    const hasSeen = localStorage.getItem("tour_done");
    if (!hasSeen) {
      setRun(true);
      localStorage.setItem("tour_done", "true");
    }
  }, []);

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      scrollToFirstStep
      styles={{
        options: {
          primaryColor: "#7320E7",
          zIndex: 99999,
        },
        tooltipContainer: {
          textAlign: "left",
        },
        buttonNext: {
          borderRadius: "6px",
        },
        buttonSkip: {
          marginRight: 10,
        },
      }}
    />
  );
};

export default GuidedTour;
