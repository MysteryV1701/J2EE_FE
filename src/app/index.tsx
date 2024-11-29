import { AppProvider } from './main-provider';
import { AppRouter } from './router';

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
