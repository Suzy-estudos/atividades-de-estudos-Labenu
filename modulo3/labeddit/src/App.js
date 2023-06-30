import Router from "./routes/Router";
import GlobalState from "./global/GlobalState";

function App() {
  return (
    <GlobalState>
      <Router />
    </GlobalState>
import { createGlobalStyle } from "styled-components";

const GlobalStile = createGlobalStyle`
body {
  text-align: center;
  background-color: #e4c79f;
  padding: 0.3em;
  align-items: center;
  justify-content: center;
  display: flexbox;
}

main {
  align-items: center;
}

input {
  margin: 0.3%;
  border-radius: 0.8rem
}

button {
  border-radius: 0.8rem;
  background-color: #f9f3eb;
  height: 1.5rem;
  margin: 0.3%
}

button:hover {
  cursor: pointer;
  color: #fff;
  background-color: #ff4500;
  box-shadow: 0 3px black;
}

.posts {
  background-image: url(https://jul10l1r4.github.io/artigo/background-em-texto/papel.jpeg);
  opacity: 1;
  background-size: cover;
  background-attachment: fixed;
  font-size: 90%;
  margin-top: 2em;
  padding: 1.5em;
}
`

function App() {
  return (
    <>
      <GlobalStile />
      <GlobalState>
        <Router />
      </GlobalState>
    </>
  );
}

export default App;