const BASE_URL_GAME_DETAIL = "https://ws2-cache.aptoide.com/api/7/getApp?package_name=";
const BASE_URL_SIMILAR_GAME = "https://ws2-cache.aptoide.com/api/7/listApps?offset=0&limit=9&sort=trending60d&origin=SITE&store_name=aptoide-web&store_id=15";

export const fetchGameDetails = async (packageName: string) => {

    const response = await fetch(BASE_URL_GAME_DETAIL + packageName);
    if (!response.ok) 
        throw new Error("Failed to fetch game details");
    const json = await response.json();

    return json.nodes?.meta?.data;
};

export const fetchSimilarGames = async () => {

    const response = await fetch(BASE_URL_SIMILAR_GAME);
    if (!response.ok) 
        throw new Error("Failed to fetch similar games");
    const json = await response.json();

    return json.datalist?.list;
};
