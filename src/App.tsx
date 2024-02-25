import { Dashboard } from "./components/Dashboard";
import Modal from "react-modal";

Modal.setAppElement("#root");
function App() {
  return (
    <div className="global">
      <Dashboard />
    </div>
  );
}

export default App;
