import React, { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GameDetails } from "./gameDetails";

const baseUrl = "https://ws2-cache.aptoide.com/api/7/listApps?offset=0&limit=9&sort=trending60d&origin=SITE&store_name=aptoide-web&store_id=15";

const queryClient = new QueryClient();

function FetchSimilarGames() {

    const { data: similarGames, isError, isPending } = useQuery({
        queryKey: ["similarGames"],
        queryFn: async () => {
            const response = await fetch(baseUrl);
            const json = await response.json();
            //console.log("Fetched data:", json);
            return json.datalist?.list as GameDetails[];
        },
        staleTime: 5 * 60 * 1000
    });

    return (
        <div>
            <h1>Similar Games</h1>
            {isPending ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error fetching data</div>
            ) : (
                <div>
                    {similarGames.length ? (
                            similarGames.map((game, index) => (
                                <div key={index}>
                                    <h2>{game.name}</h2>
                                    <img src={game.icon} alt={`${game.name} icon`} width={150} style={{ margin: "10px" }} />    
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
            <FetchSimilarGames />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}