"use client";

import React, { useState, useEffect, useRef } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  previewUrl: string;
  albumArt: string;
  trackName: string;
  artistName: string;
  className?: string;
}
// DEpreicated
const MusicPlayer: React.FC<MusicPlayerProps> = ({
  previewUrl,
  albumArt,
  trackName,
  artistName,
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      audioRef.current = new Audio(previewUrl);

      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current?.duration || 0);
      });

      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });

      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
        }
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current.remove();
        audioRef.current = null;
      }
    };
  }, [previewUrl]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className={cn(
        "bg-black text-white rounded-lg p-4 flex flex-col",
        className
      )}
    >
      <div className="flex items-center mb-4">
        <img
          src={albumArt}
          alt={`${trackName} album art`}
          className="w-16 h-16 rounded-md mr-4"
        />
        <div className="flex flex-col">
          <h3 className="font-bold truncate">{trackName}</h3>
          <p className="text-gray-400 text-sm">{artistName}</p>
        </div>
      </div>

      <div className="flex items-center">
        <button
          onClick={togglePlayPause}
          className="bg-green-500 rounded-full w-10 h-10 flex items-center justify-center mr-4"
        >
          {isPlaying ? <BsPauseFill size={24} /> : <BsPlayFill size={24} />}
        </button>

        <div className="flex-1">
          <div className="relative h-1 bg-gray-700 rounded-full">
            <div
              className="absolute h-full bg-green-500 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
