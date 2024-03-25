import "./App.css";

import { Route, Switch, useLocation } from "wouter";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Companies from "./pages/Companies";
import { useEffect, useState } from "react";

const App = () => {
  const [location] = useLocation();
  const [mainClass, setMainClass] = useState("");
  useEffect(() => {
    setMainClass(location.substring(1));
  }, [location]);
  return (
    <>
      <Header />
      
      <main className={mainClass}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/companies" component={Companies} />
          {/* Default route */}
          <Route>404: No such page!</Route>
        </Switch>
      </main>

      <Footer />
    </>
  );
};

export default App;
