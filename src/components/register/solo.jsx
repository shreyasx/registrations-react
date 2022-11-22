import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "../forgotpassword/ForgotPassword";
import { API } from "../../API";
import axios from "axios";

const SoloEvent = ({ eventId, alreadyRegistered, checkRegistration }) => {
	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [msg, setMsg] = React.useState("");

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") return;
		setOpen(false);
	};

	const register = async () => {
		setError(false);
		setLoading(true);
		const members = [localStorage.getItem("usn")];
		try {
			await axios.post(
				`${API}/api/private/registration`,
				{ eventId, members },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("authToken")}`,
					},
				}
			);
			setMsg("Registration successful!");
			setError(false);
			handleClick();
			checkRegistration();
		} catch (err) {
			setError(true);
			setMsg(err.response.data.error);
			handleClick();
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			style={{
				margin: "10px 0",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity={error ? "error" : "success"}
					sx={{ width: "100%" }}
				>
					{msg}
				</Alert>
			</Snackbar>
			<p>
				This is a solo event, you can register yourself by clicking the button
				below.
			</p>
			<LoadingButton
				onClick={register}
				loading={loading || alreadyRegistered === "loading"}
				style={{ margin: "10px 0" }}
				variant="contained"
				disabled={alreadyRegistered}
			>
				{alreadyRegistered ? "already registered" : "Register now"}
			</LoadingButton>
		</div>
	);
};

export default SoloEvent;
