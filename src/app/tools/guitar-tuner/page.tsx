"use client";

import { useRef, useState } from "react";

export default function Tuner() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setPlayStatus] = useState<boolean>(false);
  const [isRepeat, setRepeat] = useState<boolean>(false);

  const stringsMap = new Map<
    number,
    { id: number; name: string; file: string }
  >([
    [1, { id: 1, name: "E6", file: "/guitar_tuner_e6.mp3" }],
    [2, { id: 2, name: "A5", file: "/guitar_tuner_a5.mp3" }],
    [3, { id: 3, name: "D4", file: "/guitar_tuner_d4.mp3" }],
    [4, { id: 4, name: "G3", file: "/guitar_tuner_g3.mp3" }],
    [5, { id: 5, name: "B2", file: "/guitar_tuner_b2.mp3" }],
    [6, { id: 6, name: "E1", file: "/guitar_tuner_e1.mp3" }],
  ]);

  function handleStringClick(id: number) {
    if (isPlaying) {
      audioRef.current?.pause();
      setPlayStatus(false);
    }
    if (audioRef.current) {
      audioRef.current.src = stringsMap.get(id)?.file || "";
      setPlayStatus(true);
      if (isRepeat) {
        audioRef.current.loop = true;
      } else {
        audioRef.current.loop = false;
      }
      audioRef.current.play();
    }
  }

  function handleRepeatButtonClick() {
    audioRef.current?.pause();
    setPlayStatus(false);
    setRepeat(!isRepeat);
  }

  return (
    <div>
      <p>TUNER</p>
      <div>
        {[...stringsMap.values()].map(({ id, name }) => (
          <button key={id} onClick={() => handleStringClick(id)}>
            {name}
          </button>
        ))}
        <button onClick={handleRepeatButtonClick}>
          {isRepeat ? "Don't Repeat" : "Repeat Note"}
        </button>
      </div>
      <div>
        <audio ref={audioRef} src="/guitar_tuner_all_strings.mp3" />
      </div>
    </div>
  );
}
