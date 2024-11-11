import { useState } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GameDetailsView from './components/GameDetailsView';
import SimilarGamesView from './components/SimilarGamesView';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const [selectedPackage, setSelectedPackage] = useState("cm.aptoide.pt");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <GameDetailsView packageName={selectedPackage} />
          <SimilarGamesView onSelectGame={setSelectedPackage} />
        </header>
      </div>
    </QueryClientProvider>
  );
}

export default App;
