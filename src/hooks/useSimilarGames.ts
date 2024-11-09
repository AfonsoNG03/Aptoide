import { useQuery } from "@tanstack/react-query";
import { fetchSimilarGames } from "../api/api";
import { GameDetails } from "../types";

export function useSimilarGames() {
    return useQuery<GameDetails[]>({
        queryKey: ["similarGames"],
        queryFn: fetchSimilarGames,
        staleTime: 5 * 60 * 1000,
    });
}
