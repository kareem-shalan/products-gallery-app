import { CartProvider } from './context/CartContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import AppRouter from './routes/AppRouter.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppRouter />
        <Toaster
        />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
