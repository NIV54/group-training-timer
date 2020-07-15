import { useState, useEffect, useRef } from "react";

export const useAudio = (url: string) => {
  const audio = useRef(new Audio(url));
  const [isPlaying, setPlaying] = useState(false);

  const toggle = () => setPlaying(!isPlaying);

  useEffect(() => {
    isPlaying ? audio.current.play() : audio.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audio.current.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.current.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return { isPlaying, toggle };
};
