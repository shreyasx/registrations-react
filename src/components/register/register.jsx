import React from "react";
import Container from "@mui/material/Container";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { API } from "../../API";
import axios from "axios";
import SoloEvent from "./solo";
import GroupEvent from "./group";

const Register = () => {
	const { eventId } = useParams();
	const [event, setEvent] = React.useState(null);
	const [error, setError] = React.useState("");
	const [alreadyRegistered, setAlreadyRegistered] = React.useState("loading");

	const checkRegistration = async () => {
		setAlreadyRegistered("loading");
		const { data } = await axios.get(
			`${API}/api/private/registration/check/${eventId}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("authToken")}`,
				},
			}
		);
		setAlreadyRegistered(data.alreadyRegistered);
	};

	React.useEffect(() => {
		const getEventData = async () => {
			try {
				const resp = await axios.get(`${API}/api/private/event/${eventId}`);
				setEvent(resp.data.event);
			} catch (error) {
				setError(error.response.data.error);
			}
		};
		getEventData();
		checkRegistration();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventId]);

	return (
		<Container maxWidth="md">
			{event ? (
				<>
					<Typography style={{ margin: "10px 0" }} variant="h4">
						{`Registraion for event '${event.name}'`}
					</Typography>
					<Typography style={{ margin: "10px 0" }}>
						About the event <br />
						{event.english}
					</Typography>
					<Typography style={{ margin: "20px 0" }}>
						ವಿವರಣೆ <br />
						{event.kannada}
					</Typography>
					{event.solo ? (
						<SoloEvent
							checkRegistration={checkRegistration}
							alreadyRegistered={alreadyRegistered}
							eventId={event._id}
						/>
					) : (
						<GroupEvent
							min={event.min}
							max={event.max}
							checkRegistration={checkRegistration}
							alreadyRegistered={alreadyRegistered}
							eventId={event._id}
						/>
					)}
					<Typography
						style={{ margin: "20px auto", textAlign: "center", maxWidth: 450 }}
					>
						{alreadyRegistered && (
							<>
								<span>
									Either you have registered or someone has included you in
									their team.{" "}
								</span>
								<a href={event.link}>Click here to join the WhatsApp group.</a>
							</>
						)}
					</Typography>
				</>
			) : (
				<Typography style={{ margin: "10px 0" }} variant="h6" gutterBottom>
					{error ? error : `Loading...`}
				</Typography>
			)}
		</Container>
	);
};

export default Register;
