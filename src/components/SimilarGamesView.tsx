import { useSimilarGames } from "../hooks/useSimilarGames";

function SimilarGamesView({ onSelectGame }: { onSelectGame: (packageName: string) => void }) {
    const { data: similarGames, isError, isLoading, error } = useSimilarGames();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {(error as Error).message}</div>;

    return (
        <div>
            <h1>Similar Games</h1>
            <div className="wrapper">
                <div className="image-slider">
                    {similarGames?.length ? (
                        similarGames.map((game, index) => (
                            <div
                                key={index}
                                className="item"
                                onClick={() => onSelectGame(game.package)}
                                style={{ cursor: "pointer" }}
                            >

                                <img src={game.icon} alt={`${game.name} icon`} width={150} />
                                <p>{game.name}</p>
                            </div>
                        ))
                    ) : (
                        <p>No similar games available</p>
                    )}
                </div>
            </div>

        </div>
    );
}

export default SimilarGamesView;
