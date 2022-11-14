const styles = theme => ({
	"@global": {
		body: {
			backgroundColor: "#fff",
		},
	},
	errorText: {
		color: "red",
		textAlign: "center",
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	paper: {
		marginTop: "50%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	submit: {
		color: "#fff",
		backgroundColor: "#00C170",
	},
});

export default styles;
