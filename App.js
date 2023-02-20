import Provider from "./src/context/Provider";
import Navigation from "./src/Navigation";

const App = () => {
  return (
    <Provider>
      <Navigation />
    </Provider>
  );
};

export default App;
