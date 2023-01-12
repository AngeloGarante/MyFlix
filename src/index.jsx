import { createRoot } from "react-dom/client";
import "./index.scss";
import MainView from "./components/main-view/MainView";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.scss";

const MyFlixApplication = () => {
  return (
    <Provider store={store}>
      <div className="border-page">
        <Container className="app-container">
          <MainView />
        </Container>
      </div>
    </Provider>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);
