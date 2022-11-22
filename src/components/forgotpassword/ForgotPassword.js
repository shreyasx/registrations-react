import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styles from "./styles";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import LoadingButton from "@mui/lab/LoadingButton";
import { withStyles } from "@material-ui/core/styles";
import { API } from "../../API";

export const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class ForgotPassword extends React.Component {
	constructor() {
		super();
		this.state = {
			email: null,
			error: false,
			msg: "",
			loading: false,
			success: "",
			open: false,
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
							Forgot Password
						</Typography>
						<Typography
							component="h6"
							variant="caption"
							className={classes.title}
						>
							Please enter the registered email address. <br />
							We will send you reset password confirmation to this email if user
							exists.
						</Typography>
						<form onSubmit={e => this.submitRequest(e)}>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="off"
								autoFocus
								onChange={e => this.handleChange(e)}
							/>
							<LoadingButton
								type="submit"
								loading={this.state.loading}
								fullWidth
								variant="contained"
								className={classes.submit}
							>
								Forgot Password
							</LoadingButton>
						</form>
					</div>
				</Container>
			</div>
		);
	}

	handleChange = e => {
		this.setState({
			email: e.target.value,
		});
	};

	handleClick = () => {
		this.setState({ open: true });
	};

	handleClose = (event, reason) => {
		if (reason === "clickaway") return;
		this.setState({ open: false });
	};

	submitRequest = async e => {
		this.setState({ loading: true });
		e.preventDefault();
		const { email } = this.state;
		const config = { header: { "Content-Type": "application/json" } };
		try {
			await axios.post(`${API}/api/auth/forgotpassword`, { email }, config);
			this.setState({
				error: false,
				msg: "If an account with that email exists, we've sent you a mail.",
			});
		} catch (error) {
			this.setState({ msg: error.response.data.error, error: true });
			setTimeout(() => {
				this.setState({ msg: "" });
			}, 7200);
		} finally {
			this.setState({ loading: false });
			this.handleClick();
		}
	};
}

export default withStyles(styles)(ForgotPassword);
