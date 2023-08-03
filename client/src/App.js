import React from "react";
//import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
// import ProfileBuilder from "./components/ProfileBuilder";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import SignUpPage from "./pages/SignUpPage";
import MasterProfilePage from "./pages/MasterProfilePage";
import Footer from "./components/Footer";


const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App flex flex-col min-h-screen">
      <Router>

      <header className="App-header">

          <Nav />
        </header>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile-master" element={<MasterProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>


          <Footer />
      </Router>
      </div>
    </ApolloProvider>
  );
}



export default App;
