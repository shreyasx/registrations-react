import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function EventCard({ event }) {
	const { _id, name, img_url, english, kannada } = event;
	const [lang, setLang] = React.useState("kan");

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia component="img" alt={name} height={180} image={img_url} />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{lang === "eng" ? english : kannada}
				</Typography>
			</CardContent>
			<CardActions style={{ justifyContent: "space-around", margin: "10px 0" }}>
				<Button
					variant="outlined"
					href={`/events/register/${_id}`}
					size="small"
				>
					Register
				</Button>
				<Button
					variant="outlined"
					onClick={ev => {
						ev.preventDefault();
						setLang(lang === "eng" ? "kan" : "eng");
					}}
					size="small"
				>
					{lang === "eng" ? `ಕನ್ನಡದಲ್ಲಿ` : `English`}
				</Button>
			</CardActions>
		</Card>
	);
}
