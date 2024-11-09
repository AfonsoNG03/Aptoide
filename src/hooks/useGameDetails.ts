import { useQuery } from "@tanstack/react-query";
import { fetchGameDetails } from "../api/api";
import { GameDetails } from "../types";

export function useGameDetails(packageName: string) {
    return useQuery<GameDetails>({
        queryKey: ["gameDetails", packageName],
        queryFn: () => fetchGameDetails(packageName),
        staleTime: 5 * 60 * 1000,
        enabled: !!packageName,
    });
}
