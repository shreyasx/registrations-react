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
			error: false,
			msg: "",
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
							severity={this.state.error ? "error" : "success"}
							sx={{ width: "100%" }}
						>
							{this.state.msg}
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
		this.handleClose();
		this.setState({ loading: true });
		e.preventDefault();
		const config = { header: { "Content-Type": "application/json" } };
		if (!this.formIsValid()) {
			document.getElementById("password").value = null;
			document.getElementById("cnfpassword").value = null;
			this.setState({
				password: "",
				cnfPassword: "",
				msg: "Passwords do not match!",
				error: true,
			});
			setTimeout(() => {
				this.setState({ msg: "", error: false });
			}, 7200);
			this.setState({ loading: false });
			this.handleClick();
			return;
		}
		const { password } = this.state;
		try {
			await axios.put(
				`${API}/api/auth/resetpassword/${this.props.match.params.resetToken}`,
				{ password },
				config
			);
			this.setState({
				msg: "Password reset successful, redirecting to login page...",
				error: false,
			});
			setTimeout(() => {
				this.props.history.push("/login");
			}, 7200);
		} catch (error) {
			this.setState({ msg: error.response.data.error, error: true });
			setTimeout(() => {
				this.setState({ msg: "", error: false });
			}, 7200);
		} finally {
			this.setState({ loading: false });
			this.handleClick();
		}
	};
}

export default withStyles(styles)(ResetPassword);
