import { useSimilarGames } from "../hooks/useSimilarGames";

function SimilarGamesView({ onSelectGame }: { onSelectGame: (packageName: string) => void }) {
    const { data: similarGames, isError, isLoading, error } = useSimilarGames();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {(error as Error).message}</div>;

    return (
        <div>
            <h1>Similar Games</h1>
            {similarGames?.length ? (
                similarGames.map((game, index) => (
                    <div
                        key={index}
                        className="game-item"
                        onClick={() => onSelectGame(game.package)}
                        style={{ cursor: "pointer" }}
                    >
                        <h2>{game.name}</h2>
                        <img src={game.icon} alt={`${game.name} icon`} width={150} className="game-icon" />
                    </div>
                ))
            ) : (
                <p>No similar games available</p>
            )}
        </div>
    );
}

export default SimilarGamesView;
