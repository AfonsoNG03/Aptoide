import { useGameDetails } from "../hooks/useGameDetails";
import { useState, useEffect, useRef } from 'react';

function GameDetailsView({ packageName }: { packageName: string }) {
    const { data: gameDetails, isError, isLoading, error } = useGameDetails(packageName);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTruncatable, setIsTruncatable] = useState(false);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const [isCentered, setIsCentered] = useState(true);
    const sliderRef = useRef<HTMLParagraphElement>(null);
    const [expandedScreenshot, setExpandedScreenshot] = useState<{ url: string; index: number } | null>(null);

    useEffect(() => {
        if (descriptionRef.current) {
            descriptionRef.current.style.maxHeight = '4em';
            setIsTruncatable(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
            descriptionRef.current.style.maxHeight = '';
        }
    }, [gameDetails?.media?.description]);

    useEffect(() => {
        const updateAlignment = () => {
          if (sliderRef.current) {
            setIsCentered(sliderRef.current.clientWidth < window.innerWidth);
          }
        };
        updateAlignment();
        window.addEventListener('resize', updateAlignment);
        return () => window.removeEventListener('resize', updateAlignment);
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {(error as Error).message}</div>;

    const toggleDescription = () => setIsExpanded((prev) => !prev);

    const handleScreenshotClick = (url: string, index: number) => {
        setExpandedScreenshot({ url, index });
    };

    const closeExpandedScreenshot = () => {
        setExpandedScreenshot(null);
    };

    return (
        <div>
            {gameDetails ? (
                <div>
                    <h2>{gameDetails.name}</h2>
                    <div className="icon-container">
                        <img src={gameDetails.icon} alt={`${gameDetails.name} icon`} width={150} />
                        <a href={gameDetails.file.path} download>
                            <button className="button">Download</button>
                        </a>
                    </div>
                    {gameDetails.media?.screenshots?.length ? (
                        <div className={`wrapper ${isCentered ? 'centered' : ''}`}>
                            <div className="image-slider-2" ref={sliderRef}>
                                {gameDetails.media.screenshots.map((screenshot, index) => (
                                    <div key={index} className="item">
                                        <img 
                                            src={screenshot.url} 
                                            alt={`${gameDetails.name} screenshot ${index + 1}`} 
                                            width={150} 
                                            onClick={() => handleScreenshotClick(screenshot.url, index)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>No screenshots available</p>
                    )}
                    <div className="container">
                        <p
                            ref={descriptionRef}
                            className={`description ${isExpanded ? 'expanded' : ''}`}
                        >
                            {gameDetails.media?.description}
                        </p>
                        {isTruncatable && (
                            <button onClick={toggleDescription} className="button">
                                {isExpanded ? "Read Less" : "Read More"}
                            </button>
                        )}
                    </div>
                    {expandedScreenshot && (
                        <div className="overlay" onClick={closeExpandedScreenshot}>
                            <div className="expanded-screenshot" onClick={(e) => e.stopPropagation()}>
                                <img src={expandedScreenshot.url} alt={`Expanded screenshot ${expandedScreenshot.index + 1}`} />
                                <button onClick={closeExpandedScreenshot} className="close-button">Close</button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>No game details found</p>
            )}
        </div>
    );
}

export default GameDetailsView;
