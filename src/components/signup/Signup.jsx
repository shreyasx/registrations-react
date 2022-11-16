import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { API } from "../../API";

class Signup extends React.Component {
	constructor() {
		super();
		this.state = {
			name: null,
			usn: null,
			phone: null,
			email: null,
			password: null,
			passwordConfirmation: null,
			upi_ref_no: null,
			signupError: null,
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
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Typography style={{ margin: "10px 0" }} component="h1" variant="h3">
						Sign up
					</Typography>
					<form onSubmit={e => this.submitSignup(e)} className={classes.form}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									style={{ color: "#ffffff" }}
									autoFocus
									variant="outlined"
									required
									fullWidth
									id="name"
									label="Enter Name"
									autoComplete="off"
									onChange={e => this.userTyping("name", e)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									style={{ color: "#ffffff" }}
									autoFocus
									variant="outlined"
									required
									fullWidth
									id="usn"
									label="Enter USN"
									autoComplete="off"
									onChange={e => this.userTyping("usn", e)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									style={{ color: "#ffffff" }}
									variant="outlined"
									required
									fullWidth
									id="phone"
									label="Enter Phone number"
									autoComplete="off"
									onChange={e => this.userTyping("phone", e)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									style={{ color: "#ffffff" }}
									variant="outlined"
									required
									type="email"
									fullWidth
									id="email"
									label="Enter Email Address"
									autoComplete="off"
									onChange={e => this.userTyping("email", e)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									label="Enter Password"
									type="password"
									id="password"
									autoComplete="off"
									onChange={e => this.userTyping("password", e)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									label="Confirm Password"
									type="password"
									id="password-confirmation"
									onChange={e => this.userTyping("passwordConfirmation", e)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									style={{ color: "#ffffff" }}
									autoFocus
									variant="outlined"
									required
									fullWidth
									id="upi_ref_no"
									label="Enter UPI Reference number"
									autoComplete="off"
									onChange={e => this.userTyping("upi_ref_no", e)}
								/>
							</Grid>
							{this.state.signupError ? (
								<Grid container justify="center">
									<Grid item>
										<Typography className={classes.errorText} variant="body2">
											{this.state.signupError}
										</Typography>
									</Grid>
								</Grid>
							) : null}
						</Grid>
						<LoadingButton
							type="submit"
							loading={this.state.loading}
							fullWidth
							variant="contained"
							className={classes.submit}
						>
							Sign Up
						</LoadingButton>
						<Grid container justify="center">
							<Grid item>
								<Link
									className={classes.link}
									href="#"
									variant="body2"
									to="/login"
								>
									Already have an account?{" "}
									<span className={classes.signIn}>Sign in</span>
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}

	formIsValid = () => this.state.password === this.state.passwordConfirmation;

	userTyping = (type, e) => {
		switch (type) {
			case "name":
				this.setState({ name: e.target.value });
				break;
			case "usn":
				this.setState({ usn: e.target.value });
				break;
			case "email":
				this.setState({ email: e.target.value });
				break;
			case "password":
				this.setState({ password: e.target.value });
				break;
			case "phone":
				this.setState({ phone: e.target.value });
				break;
			case "passwordConfirmation":
				this.setState({ passwordConfirmation: e.target.value });
				break;
			case "upi_ref_no":
				this.setState({ upi_ref_no: e.target.value });
				break;
			default:
				break;
		}
	};

	submitSignup = async e => {
		this.setState({ loading: true });
		e.preventDefault();
		if (!this.formIsValid()) {
			this.setState({ signupError: "Passwords do not match!" });
			setTimeout(() => {
				this.setState({ signupError: "" });
			}, 5000);
			this.setState({ loading: false });
			return;
		}

		const { name, usn, email, password, phone, upi_ref_no } = this.state;
		try {
			const { data } = await axios.post(
				`${API}/api/auth/register`,
				{ name, usn, email, phone, password, upi_ref_no },
				{ header: { "Content-Type": "application/json" } }
			);
			localStorage.setItem("authToken", data.token);
			localStorage.setItem("usn", data.usn);
			this.props.history.push("/");
		} catch (error) {
			this.setState({ signupError: error.response.data.error });
			setTimeout(() => {
				this.setState({ signupError: "" });
			}, 5000);
		} finally {
			this.setState({ loading: false });
		}
	};
}

export default withStyles(styles)(Signup);
