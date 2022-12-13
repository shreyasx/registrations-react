import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../API";
import Container from "@mui/material/Container";

const Registrations = ({ history }) => {
	const { eventId } = useParams();
	const [event, setEvent] = React.useState(null);
	const [regs, setRegs] = React.useState(null);

	React.useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(`${API}/api/private`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("authToken")}`,
					},
				});
				if (!data.admin) history.push("/");
			} catch (er) {
				console.log(er);
				history.push("/");
			}
		})();
	}, [history]);

	React.useEffect(() => {
		const getEvent = async () => {
			try {
				const { data } = await axios.get(`${API}/api/private/event/${eventId}`);
				setEvent(data.event);
			} catch (er) {
				console.log(er);
			}
		};
		getEvent();
	}, [eventId]);

	React.useEffect(() => {
		const getRegs = async () => {
			try {
				const { data } = await axios.get(
					`${API}/api/private/event/registrations/${eventId}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem("authToken")}`,
						},
					}
				);
				setRegs(data.regs);
			} catch (er) {
				console.log(er);
			}
		};
		getRegs();
	}, [eventId]);

	return event && regs ? (
		<Container maxWidth="md">
			<h1>{`Registrations for ${event.name}`}</h1>
			{regs.length === 0 ? (
				<h2>No registrations.</h2>
			) : (
				regs.map((reg, idx) => (
					<ul
						style={{ border: "1px solid black", margin: "10px 0", padding: 15 }}
						key={idx}
					>
						{reg.members.map((mem, indx) => (
							<li key={indx}>{`${mem.name}, ${mem.usn}`}</li>
						))}
					</ul>
				))
			)}
		</Container>
	) : (
		<Container maxWidth="md">
			<h2>Loading..</h2>
		</Container>
	);
};

export default Registrations;
