import React from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GameDetails } from "./gameDetails";

const baseUrl = "https://ws2-cache.aptoide.com/api/7/listApps?offset=0&limit=9&sort=trending60d&origin=SITE&store_name=aptoide-web&store_id=15";

const queryClient = new QueryClient();

function useSimilarGames() {
    return useQuery({
        queryKey: ["similarGames"],
        queryFn: async () => {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch similar games");
            }
            const json = await response.json();
            return json.datalist?.list as GameDetails[];
        },
        staleTime: 5 * 60 * 1000,
    });
}

function SimilarGamesView() {
    const { data: similarGames, isError, isLoading, error } = useSimilarGames();

    return (
        <div>
            <h1>Similar Games</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error: {(error as Error).message}</div>
            ) : (
                <div>
                    {similarGames && similarGames.length > 0 ? (
                        similarGames.map((game, index) => (
                            <div key={index} className="game-item">
                                <h2>{game.name}</h2>
                                <img
                                    src={game.icon}
                                    alt={`${game.name} icon`}
                                    width={150}
                                    className="game-icon"
                                />
                            </div>
                        ))
                    ) : (
                        <p>No similar games available</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default function Games() {
    return (
        <QueryClientProvider client={queryClient}>
            <SimilarGamesView />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
