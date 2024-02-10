import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import Layout from './components/Layout';
import Events from './pages/Events';
import Notifications from './pages/Notifications';
import FuturePlans from './pages/FuturePlans';



const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
});

function App() {
 

  return (
    <>
        <ThemeProvider theme={theme}>
            <Router>
              <Layout>
                      <Routes>
                        <Route path="/" element={<Events/>} />
                        <Route path="/notification" element={<Notifications/>} />
                        <Route path="/plans" element={<FuturePlans/>} />

                      </Routes>
              </Layout>
            </Router>
        </ThemeProvider>
    </>
  );
}

export default App;
