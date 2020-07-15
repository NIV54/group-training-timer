import { useState, useEffect } from "react";

export const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url));
  const [isPlaying, setPlaying] = useState(false);

  const toggle = () => setPlaying(!isPlaying);

  useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
  }, [audio, isPlaying]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return { isPlaying, toggle };
};
