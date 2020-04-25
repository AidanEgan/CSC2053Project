import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
  Route,
  HashRouter,
  Redirect
} from 'react-router-dom';
import BaseballPage from './ui/pages/baseball_page';
import BasketballPage from './ui/pages/basketball_page';
import HockeyPage from './ui/pages/hockey_page';
import LandingPage from './ui/pages/landing_page';
import { createMuiTheme} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff6200',
    },
    secondary: {
      main: '#fff',
    },
  },
  typography: {
    fontSize: 15,
  }
});

function Home () {
  return <Redirect to="/welcome"/>
}

function Main () {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <React.Fragment>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/basketball" component={BasketballPage}/>
          <Route path="/baseball" component={BaseballPage}/>
          <Route path="/hockey" component={HockeyPage}/>
        </React.Fragment>
      </HashRouter>
    </ThemeProvider>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
