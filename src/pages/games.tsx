import React, { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";


/*
• Data Retrieval
o Fetch game details dynamically using the API endpoint: https://ws2-cache.aptoide.com/api/7/getApp?package_name=[package_name]
o The [package_name] parameter in the URL should be dynamic, allowing for different games to be displayed by changing the query string
(e.g., https://localhost:3000?package_name=cm.aptoide.pt).
o Fetch data for similar apps using the API endpoint:
https://ws2-cache.aptoide.com/api/7/listApps?offset=0&limit=9&sort=trending60d&origin=SITE&store_name=aptoide-web&store_id=15

*/

const baseUrl = "https://ws2-cache.aptoide.com/api/7/getApp?package_name=";

interface GameDetails {
    name: string;
    description: string;
    icon: string;
}

const queryClient = new QueryClient();

function FetchExample() {
    const [packageName, setPackageName] = useState("cm.aptoide.pt");

    const { data: gameDetails, isError, isPending } = useQuery({
        queryKey: ["gameDetails", { packageName }],
        queryFn: async () => {
            const response = await fetch(baseUrl + packageName);
            return (await response.json()) as GameDetails;
        },
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
                    <p>{gameDetails.description}</p>
                </div>
            )}
        </div>
    );
}

export default function Games() {
    return (
        <QueryClientProvider client={queryClient}>
            <FetchExample />
        </QueryClientProvider>
    );
}