import { createRoot } from "react-dom/client";
import "./index.scss";
import MainView from "./components/main-view/MainView";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
const MyFlixApplication = () => {
  return (
    <Container style={{ border: "1px solid red" }}>
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);
