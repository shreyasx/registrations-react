import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { API } from "../../API";

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			email: null,
			password: null,
			loginError: null,
			loading: false,
		};
	}

	componentDidMount() {
		if (localStorage.getItem("authToken")) {
			this.props.history.push("/");
		}
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className={classes.paper}>
						<Typography component="h1" variant="h3">
							Sign In
						</Typography>
						<form onSubmit={e => this.submitLogin(e)}>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								autoComplete="off"
								autoFocus
								onChange={e => this.userTyping("email", e)}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								label="Password"
								type="password"
								id="password"
								autoComplete="off"
								onChange={e => this.userTyping("password", e)}
							/>
							<LoadingButton
								type="submit"
								fullWidth
								loading={this.state.loading}
								variant="contained"
								className={classes.submit}
							>
								Sign In
							</LoadingButton>
							{this.state.loginError ? (
								<Typography
									className={classes.errorText}
									component="h5"
									variant="body2"
								>
									{this.state.loginError}
								</Typography>
							) : null}
							<Grid container justify="center">
								<Grid className={classes.linkContainer}>
									<Link
										className={classes.link}
										variant="body2"
										to="/forgotpassword"
									>
										Forgot Password?{" "}
										<span className={classes.signUp}>Forgot Password</span>
									</Link>
								</Grid>
							</Grid>
							<Grid container justify="center">
								<Grid className={classes.linkContainer}>
									<Link className={classes.link} variant="body2" to="/signup">
										Don't have an account?{" "}
										<span className={classes.signUp}>Sign Up</span>
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</Container>
			</div>
		);
	}

	userTyping = (type, e) => {
		switch (type) {
			case "email":
				this.setState({ email: e.target.value });
				break;
			case "password":
				this.setState({ password: e.target.value });
				break;
			default:
				break;
		}
	};

	submitLogin = async e => {
		e.preventDefault();
		this.setState({ loading: true });
		const { email, password } = this.state;
		try {
			const { data } = await axios.post(
				`${API}/api/auth/login`,
				{ email, password },
				{
					header: {
						"Content-Type": "application/json",
					},
				}
			);
			localStorage.setItem("authToken", data.token);
			localStorage.setItem("usn", data.usn);
			this.props.history.push("/");
		} catch (error) {
			this.setState({ loginError: error.response.data.error });
			setTimeout(() => {
				this.setState({ loginError: "" });
			}, 5000);
		} finally {
			this.setState({ loading: false });
		}
	};
}

export default withStyles(styles)(Login);
