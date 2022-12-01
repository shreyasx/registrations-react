import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Footer from "./components/footer/footer";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<App />
		<Footer />
	</React.StrictMode>,
	document.getElementById("content-wrap")
);

reportWebVitals();
