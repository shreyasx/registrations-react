import React from "react";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";
import { API } from "../../API";
import { Typography } from "@material-ui/core";

class Home extends React.Component {
	constructor() {
		super();
		this.state = { admin: false, approved: false, users: [], loading: true };
	}

	componentDidMount() {
		const fetchPrivateData = async () => {
			try {
				const { data } = await axios.get(`${API}/api/private`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("authToken")}`,
					},
				});
				this.setState(data);
				if (data.admin) this.fetchUsers();
			} catch (error) {
				localStorage.removeItem("authToken");
				this.props.history.push("/login");
			}
		};

		if (localStorage.getItem("authToken")) fetchPrivateData();
	}

	render() {
		return (
			<>
				{this.state.admin ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "centre",
							margin: 50,
						}}
					>
						<table className="tg">
							<thead>
								<tr>
									<th className="tg-0lax">Name</th>
									<th className="tg-0lax">USN</th>
									<th className="tg-0lax">Email</th>
									<th className="tg-0lax">Phone</th>
									<th className="tg-0lax">UPI Reference number</th>
									<th className="tg-0lax">Approve Payment</th>
								</tr>
							</thead>
							<tbody>
								{this.state.users.map((user, index) => (
									<tr key={index}>
										<td className="tg-0lax">{user.name}</td>
										<td className="tg-0lax">{user.usn}</td>
										<td className="tg-0lax">{user.email}</td>
										<td className="tg-0lax">{user.phone}</td>
										<td className="tg-0lax">{user.upi_ref_no}</td>
										<td className="tg-0lax">
											<LoadingButton
												size="small"
												variant="outlined"
												loading={this.state.loading}
												color="primary"
												onClick={() => this.approve(user.usn)}
											>
												Approve
											</LoadingButton>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<Container maxWidth="md">
						<Typography variant="h3" gutterBottom>
							Homepage
						</Typography>
					</Container>
				)}
			</>
		);
	}

	fetchUsers = async () => {
		const { data } = await axios.get(`${API}/api/private/list`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			},
		});
		this.setState({ users: data, loading: false });
	};

	approve = async usn => {
		this.setState({ loading: true });
		const { data } = await axios.put(
			`${API}/api/private/approve`,
			{ usn },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("authToken")}`,
				},
			}
		);
		if (data.success) this.fetchUsers();
	};
}

export default Home;
