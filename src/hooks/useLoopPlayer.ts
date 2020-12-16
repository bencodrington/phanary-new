import { useEffect, useState } from "react";
import useBoolean from "./useBoolean";


export default function useLoopPlayer(srcSet: string[]) {
  // TODO: validate that the extension is supported, fallback to subsequent ones
  const src = srcSet[0];
  const [isPlaying, setIsPlaying, toggleIsPlaying] = useBoolean(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (src === undefined) return;
    const newAudio = new Audio(src);
    newAudio.oncanplaythrough = () => {
      setIsLoaded(true);
    }
    setAudio(newAudio);
    return function cleanup() {
      newAudio.remove();
    }
  }, [src])

  useEffect(() => {
    if (audio === null) return;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  return { isPlaying, setIsPlaying, toggleIsPlaying, isLoaded };
}