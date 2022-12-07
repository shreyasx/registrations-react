import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useHistory, useLocation } from "react-router-dom";

function Layout({ children }) {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [isLoggedIn, setIsLoggedIn] = React.useState(
		localStorage.getItem("authToken") ? true : false
	);
	const history = useHistory();
	const location = useLocation();

	React.useEffect(() => {
		setIsLoggedIn(localStorage.getItem("authToken") ? true : false);
	}, [location]);

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget);
	};

	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<>
			<AppBar position="static">
				<Container maxWidth="lg">
					<Toolbar disableGutters>
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							<img style={{ height: 80 }} src="/logo.png" alt="logo" />
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}
							>
								<MenuItem onClick={handleCloseNavMenu}>
									<Typography
										onClick={() => {
											handleCloseNavMenu();
											history.push("/events");
										}}
										textAlign="center"
									>
										EVENTS
									</Typography>
								</MenuItem>
								{!isLoggedIn && (
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography
											onClick={() => {
												handleCloseNavMenu();
												history.push("/login");
											}}
											textAlign="center"
										>
											LOGIN
										</Typography>
									</MenuItem>
								)}
								{!isLoggedIn && (
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography
											onClick={() => {
												handleCloseNavMenu();
												history.push("/signup");
											}}
											textAlign="center"
										>
											SIGNUP
										</Typography>
									</MenuItem>
								)}
							</Menu>
						</Box>
						<Typography
							variant="h5"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: "flex", md: "none" },
								flexGrow: 1,
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							<img style={{ height: 80 }} src="/logo.png" alt="logo" />
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							<Button
								style={{ color: "white", marginLeft: 10 }}
								onClick={() => {
									handleCloseNavMenu();
									history.push("/events");
								}}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								EVENTS
							</Button>
							{!isLoggedIn && (
								<Button
									style={{ color: "white" }}
									onClick={() => {
										handleCloseNavMenu();
										history.push("/login");
									}}
									sx={{ my: 2, color: "white", display: "block" }}
								>
									LOGIN
								</Button>
							)}
							{!isLoggedIn && (
								<Button
									style={{ color: "white" }}
									onClick={() => {
										handleCloseNavMenu();
										history.push("/signup");
									}}
									sx={{ my: 2, color: "white", display: "block" }}
								>
									SIGNUP
								</Button>
							)}
						</Box>

						{isLoggedIn && (
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title="Open settings">
									<IconButton
										size="large"
										onClick={handleOpenUserMenu}
										aria-label="account of current user"
										aria-controls="primary-search-account-menu"
										aria-haspopup="true"
										color="inherit"
									>
										<AccountCircle />
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: "45px" }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									<MenuItem
										onClick={() => {
											handleCloseUserMenu();
											localStorage.removeItem("authToken");
											localStorage.removeItem("usn");
											history.push("/login");
										}}
									>
										<Typography
											style={{ margin: "5px 25px" }}
											textAlign="center"
										>
											Logout
										</Typography>
									</MenuItem>
									<MenuItem>
										<Typography
											style={{ margin: "5px 25px" }}
											textAlign="center"
										>
											<a
												href="https://drive.google.com/file/d/1HxbVF0Hfi272wewjZc6JVGWkFrYCWmmU/view?usp=drivesdk"
												target="_blank"
												rel="noreferrer"
												style={{ textDecoration: "none" }}
											>
												Download Rulebook
											</a>
										</Typography>
									</MenuItem>
								</Menu>
							</Box>
						)}
					</Toolbar>
				</Container>
			</AppBar>
			{children}
		</>
	);
}
export default Layout;
