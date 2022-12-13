import React from "react";
import Container from "@mui/material/Container";
import axios from "axios";
import { API } from "../../API";
import { Link } from "react-router-dom";

const Admin = ({ history }) => {
	const [events, setEvents] = React.useState([]);

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
		const getEvents = async () => {
			const resp = await axios.get(`${API}/api/private/events`);
			setEvents(resp.data.events);
		};
		getEvents();
	}, []);

	return (
		<Container maxWidth="md">
			<h1>hi admin, select event.</h1>
			<ul>
				{events.map((ev, idx) => (
					<li key={idx}>
						<Link to={`/admin/${ev._id}`}>{ev.name}</Link>
					</li>
				))}
			</ul>
		</Container>
	);
};

export default Admin;
