import React, { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const baseUrl = "https://ws2-cache.aptoide.com/api/7/getApp?package_name=";

interface GameDetails {
    name: string;
    icon: string;
    media?: {
        screenshots?: Array<{ url: string }>;
    };
}

const queryClient = new QueryClient();

function FetchExample() {
    const [packageName, setPackageName] = useState("cm.aptoide.pt");

    const { data: gameDetails, isError, isPending } = useQuery({
        queryKey: ["gameDetails", { packageName }],
        queryFn: async () => {
            const response = await fetch(baseUrl + packageName);
            const json = await response.json();
            console.log("Fetched data:", json);
            return json.nodes?.meta?.data as GameDetails;
        },
        staleTime: 5 * 60 * 1000
    });

    return (
        <div>
            <h1>Game Details</h1>
            {isPending ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error fetching data</div>
            ) : (
                <div>
                    <h2>{gameDetails.name}</h2>
                    <img src={gameDetails.icon} alt={`${gameDetails.name} icon`} width={50} height={50} />
                    <div>
                        {gameDetails.media?.screenshots?.length ? (
                            gameDetails.media.screenshots.map((screenshot, index) => (
                                <img
                                    key={index}
                                    src={screenshot.url}
                                    alt={`${gameDetails.name} screenshot ${index + 1}`}
                                    width={150}
                                    style={{ margin: "10px" }}
                                />
                            ))
                        ) : (
                            <p>No screenshots available</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Games() {
    return (
        <QueryClientProvider client={queryClient}>
            <FetchExample />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}