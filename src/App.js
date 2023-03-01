import logo from "./logo.svg";
import "./App.css";
import Crypto from "./components/Crypto";

function App() {
  return (
    <div className="App">
      <div className="container py-5">
        <Crypto />
      </div>
    </div>
  );
}

export default App;
