import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";
import Home from "./components/home/home";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import ResetPassword from "./components/resetpassword/ResetPassword";
import Layout from "./components/layout/layout";
import EventsPage from "./components/events/events";
import Register from "./components/register/register";

class App extends React.Component {
	render() {
		return (
			<Router>
				<Layout>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={Signup} />
						<Route exact path="/events" component={EventsPage} />
						<PrivateRoute
							exact
							path="/events/register/:eventId"
							component={Register}
						/>
						<Route exact path="/forgotpassword" component={ForgotPassword} />
						<Route
							exact
							path="/resetpassword/:resetToken"
							component={ResetPassword}
						/>
					</Switch>
				</Layout>
			</Router>
		);
	}
}

export default App;
