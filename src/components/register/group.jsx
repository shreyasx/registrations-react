import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { Box, Grid } from "@material-ui/core";
import { Alert } from "../forgotpassword/ForgotPassword";
import { API } from "../../API";

const GroupEvent = ({ alreadyRegistered, eventId, checkRegistration }) => {
	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [msg, setMsg] = React.useState("");
	const [openD, setOpenD] = React.useState(false);
	const [values, setValues] = React.useState([]);

	const handleClickOpen = () => {
		setOpenD(true);
	};

	const handleCloseD = () => {
		setOpenD(false);
		setValues([]);
	};

	const addValue = () => {
		setValues([...values, ""]);
	};

	const handleValueChange = (index, e) => {
		const updatedValues = values.map((value, i) => {
			if (i === index) return e.target.value;
			else return value;
		});
		setValues(updatedValues);
	};

	const deleteValue = jump => {
		setValues(values.filter(j => j !== jump));
	};

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
		try {
			await axios.post(
				`${API}/api/private/registration`,
				{ eventId, members: values },
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
			handleCloseD();
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
				This is a group event, you can register your team by clicking the button
				below.
			</p>
			<Button
				onClick={handleClickOpen}
				loading={loading}
				style={{ margin: "10px 0" }}
				variant="contained"
				disabled={alreadyRegistered}
			>
				{alreadyRegistered ? "already registered" : "add group members"}
			</Button>
			<Dialog
				open={openD}
				onClose={handleCloseD}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Group Members</DialogTitle>
				<DialogContent>
					<DialogContentText>Don't forget to add your USN.</DialogContentText>
					{values.map((jump, index) => (
						<Box key={"jump" + index}>
							<Grid container spacing={1} alignItems="flex-end">
								<Grid item xs={10}>
									<TextField
										autoFocus
										margin="dense"
										label="Value"
										value={jump || ""}
										onChange={e => handleValueChange(index, e)}
										fullWidth
									/>
								</Grid>
								<Grid item xs={2}>
									<div
										className="font-icon-wrapper"
										onClick={() => deleteValue(jump)}
									>
										<IconButton aria-label="delete">
											<DeleteIcon />
										</IconButton>
									</div>
								</Grid>
							</Grid>
						</Box>
					))}
				</DialogContent>
				<Button onClick={addValue} color="primary">
					Add
				</Button>
				<DialogActions>
					<Button onClick={handleCloseD} variant="contained" color="secondary">
						Cancel
					</Button>
					<LoadingButton
						loading={loading}
						onClick={register}
						variant="contained"
						color="primary"
					>
						register now
					</LoadingButton>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default GroupEvent;
