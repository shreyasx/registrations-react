import React from "react";
import Button from "@material-ui/core/Button";
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

class Register extends React.Component {
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
			signupError: "",
		};
	}

	//once user is logged, it doesnt make sense to come on login/register screen
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
									required={true}
									fullWidth
									id="name"
									label="Enter Name"
									name="username"
									autoComplete="off"
									onChange={e => this.userTyping("name", e)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									style={{ color: "#ffffff" }}
									autoFocus
									variant="outlined"
									required={true}
									fullWidth
									id="usn"
									label="Enter USN"
									name="USN"
									autoComplete="off"
									onChange={e => this.userTyping("usn", e)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									style={{ color: "#ffffff" }}
									variant="outlined"
									required={true}
									fullWidth
									id="phone"
									label="Enter Phone number"
									name="phone"
									autoComplete="off"
									onChange={e => this.userTyping("phone", e)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									style={{ color: "#ffffff" }}
									variant="outlined"
									required={true}
									type="email"
									fullWidth
									id="email"
									label="Enter Email Address"
									name="email"
									autoComplete="off"
									onChange={e => this.userTyping("email", e)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required={true}
									fullWidth
									name="password"
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
									required={true}
									fullWidth
									name="passwordConfirmation"
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
									required={true}
									fullWidth
									id="upi_ref_no"
									label="Enter UPI Reference number"
									name="upi_ref_no"
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
						<Button
							type="submit"
							fullWidth
							variant="contained"
							className={classes.submit}
						>
							Sign Up
						</Button>
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

	formIsValid = () =>
		this.state.password === this.state.passwordConfirmation &&
		this.state.password.length > 4;

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
		e.preventDefault();

		const config = {
			header: {
				"Content-Type": "application/json",
			},
		};

		if (!this.formIsValid()) {
			this.setState({
				signupError:
					"Passwords must match and must be greater than 4 characters.",
			});

			setTimeout(() => {
				this.setState({ signupError: " " });
			}, 5000);
			return;
		}

		const { name, usn, email, password, phone, upi_ref_no } = this.state;
		try {
			const { data } = await axios.post(
				`${API}/api/auth/register`,
				{ name, usn, email, phone, password, upi_ref_no },
				config
			);
			localStorage.setItem("authToken", data.token);
			this.props.history.push("/");
		} catch (error) {
			console.log(error);
			this.setState({ error });
			setTimeout(() => {
				this.setState({ signupError: "" });
			}, 5000);
		}
	};
}

export default withStyles(styles)(Register);
