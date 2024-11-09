export interface GameDetails {
    name: string;
    icon: string;
    package: string;
    file: {
        path: string;
    };
    media?: {
        description: string;
        screenshots?: Array<{ url: string }>;
    };
}