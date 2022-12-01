import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import axios from "axios";
import EventCard from "../card/card";
import { API } from "../../API";
import { Typography } from "@material-ui/core";

const EventsPage = () => {
	const [events, setEvents] = React.useState([]);

	React.useEffect(() => {
		const getEvents = async () => {
			const resp = await axios.get(`${API}/api/private/events`);
			setEvents(resp.data.events);
		};
		getEvents();
	}, []);

	return (
		<Container maxWidth="lg">
			<Typography
				style={{ margin: "20px 0", textAlign: "center" }}
				variant="h3"
				gutterBottom
			>
				ಸ್ಪರ್ಧೆಗಳು
			</Typography>
			<Grid container mb={5} style={{ justifyContent: "center" }} spacing={4}>
				{events.map(ev => (
					<Grid style={{ maxWidth: 345 }} key={ev._id} item xs={8}>
						<EventCard event={ev} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default EventsPage;
