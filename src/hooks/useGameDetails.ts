import { useQuery } from "@tanstack/react-query";
import { fetchGameDetails } from "../api/api";
import { GameDetails } from "../types";
import { useState, useEffect, useRef } from 'react';

export function useGameDetails(packageName: string) {
    return useQuery<GameDetails>({
        queryKey: ["gameDetails", packageName],
        queryFn: () => fetchGameDetails(packageName),
        staleTime: 5 * 60 * 1000,
        enabled: !!packageName,
    });
}

export function useDescriptionToggle(description?: string) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTruncatable, setIsTruncatable] = useState(false);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
  
    useEffect(() => {
      if (descriptionRef.current) {
        descriptionRef.current.style.maxHeight = '4em';
        setIsTruncatable(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
        descriptionRef.current.style.maxHeight = '';
      }
    }, [description]);
  
    const toggleDescription = () => setIsExpanded((prev) => !prev);
  
    return { isExpanded, isTruncatable, toggleDescription, descriptionRef };
  }

export function useCenteredSlider() {
    const [isCentered, setIsCentered] = useState(true);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateAlignment = () => {
        if (sliderRef.current) {
            setIsCentered(sliderRef.current.clientWidth < window.innerWidth);
        }
        };
        updateAlignment();
        window.addEventListener('resize', updateAlignment);
        return () => window.removeEventListener('resize', updateAlignment);
    }, []);

    return { isCentered, sliderRef };
}