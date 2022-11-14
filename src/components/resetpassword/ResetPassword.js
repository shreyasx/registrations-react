import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "../forgotpassword/ForgotPassword";
import { withStyles } from "@material-ui/core/styles";
import { API } from "../../API";

class ResetPassword extends React.Component {
	constructor() {
		super();
		this.state = {
			password: null,
			loading: false,
			cnfPassword: null,
			error: "",
			success: "",
		};
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Snackbar
						open={this.state.open}
						autoHideDuration={7000}
						onClose={this.handleClose}
					>
						<Alert
							onClose={this.handleClose}
							severity="success"
							sx={{ width: "100%" }}
						>
							Password reset successful!
						</Alert>
					</Snackbar>
					<div className={classes.paper}>
						<Typography component="h1" variant="h5">
							Reset Password
						</Typography>
						<form onSubmit={e => this.submitNewPass(e)}>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Enter New Password"
								type="password"
								id="password"
								autoComplete="off"
								autoFocus
								onChange={e => this.userTyping("password", e)}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="cnfpassword"
								label="Confirm New Password"
								type="password"
								id="cnfpassword"
								autoComplete="off"
								autoFocus
								onChange={e => this.userTyping("cnfPassword", e)}
							/>
							<LoadingButton
								type="submit"
								loading={this.state.loading}
								fullWidth
								variant="contained"
								className={classes.submit}
							>
								Reset Password
							</LoadingButton>
						</form>
						{this.state.signupError ? (
							<Typography
								className={classes.errorText}
								component="h5"
								variant="body2"
							>
								{this.state.signupError}
							</Typography>
						) : null}
					</div>
				</Container>
			</div>
		);
	}

	formIsValid = () => this.state.password === this.state.cnfPassword;

	userTyping = (type, e) => {
		switch (type) {
			case "password":
				this.setState({ password: e.target.value });
				break;
			case "cnfPassword":
				this.setState({ cnfPassword: e.target.value });
				break;
			default:
				break;
		}
	};

	handleClick = () => {
		this.setState({ open: true });
	};

	handleClose = (event, reason) => {
		if (reason === "clickaway") return;
		this.setState({ open: false });
	};

	submitNewPass = async e => {
		this.setState({ loading: true });
		e.preventDefault();
		const config = { header: { "Content-Type": "application/json" } };
		if (!this.formIsValid()) {
			this.setState({ password: "" });
			this.setState({ cnfPassword: "" });
			this.setState({ signupError: "Passwords do not match!" });
			setTimeout(() => {
				this.setState({ signupError: " " });
			}, 5000);
			this.setState({ loading: false });
			return;
		}
		const { password } = this.state;
		try {
			const { data } = await axios.put(
				`${API}/api/auth/resetpassword/${this.props.match.params.resetToken}`,
				{ password },
				config
			);
			if (data.success) this.handleClick();
		} catch (error) {
			this.setState({ signupError: "Some error occurred. Contact developer." });
			setTimeout(() => {
				this.setState({ error: " " });
			}, 5000);
		}
		this.setState({ loading: false });
	};
}

export default withStyles(styles)(ResetPassword);
