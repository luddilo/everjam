"use client";

import { useEffect, useState } from "react";

export function useIsMobile() {
  const [matches, setMatches] = useState(null);
  const query = "(max-width: 600px)";
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleMatchChange = (e) => {
      setMatches(e.matches);
    };

    mediaQueryList.addEventListener("change", handleMatchChange);
    setMatches(mediaQueryList.matches as any);

    return () => {
      mediaQueryList.removeEventListener("change", handleMatchChange);
    };
  }, [query]);

  return Boolean(matches);
}
