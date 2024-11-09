import { useGameDetails } from "../hooks/useGameDetails";

function GameDetailsView({ packageName }: { packageName: string }) {
    const { data: gameDetails, isError, isLoading, error } = useGameDetails(packageName);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {(error as Error).message}</div>;

    return (
        <div>
            <h1>Game Details</h1>
            {gameDetails ? (
                <div>
                    <h2>{gameDetails.name}</h2>
                    <img src={gameDetails.icon} alt={`${gameDetails.name} icon`} width={150} />
                    <a href={gameDetails.file.path} download>
                        <button>Download</button>
                    </a>
                    {gameDetails.media?.screenshots?.length ? (
                        <div>
                            {gameDetails.media.screenshots.map((screenshot, index) => (
                                <img
                                    key={index}
                                    src={screenshot.url}
                                    alt={`${gameDetails.name} screenshot ${index + 1}`}
                                    width={150}
                                    className="screenshot"
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No screenshots available</p>
                    )}
                    <p>{gameDetails.media?.description}</p>
                </div>
            ) : (
                <p>No game details found</p>
            )}
        </div>
    );
}

export default GameDetailsView;
