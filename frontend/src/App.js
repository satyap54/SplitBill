import React, { Component } from 'react'

// Url routing
import { Link } from 'react-router-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import Home from './Components/Home';
import Login from './Components/auth/Login';
import SignUp from './Components/auth/SignUp';
import Activate from './Components/auth/Activate';
import ResetPassword from './Components/auth/ResetPassword';
import ResetPasswordConfirm from './Components/auth/ResetPasswordConfirm';
import ListTrips from "./Components/ListTrips";

// Material ui Icon
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

// Material ui
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// Services
import AuthService from "./Components/services/AuthService.js";


const drawerWidth = 240;

const useStyles = (theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor : "blue",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor : "#282c34",
		color : "white",
	},
	drawerContainer: {
		overflow: 'auto',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	divider : {
		color : "white",
		backgroundColor : "white",
	},
});

class App extends Component{
	constructor(props) {
		super(props);
		this.props = props;
	}

	logout = ()=>{
		AuthService.logout();
	}

	render(){
		const {classes} = this.props;
		return(
			<BrowserRouter>
				<div className = "App">

					<div className={classes.root}>
						<CssBaseline />

						<AppBar position="fixed" className={classes.appBar}>
							<Toolbar>
							<Typography variant="h4" noWrap>
								<AccountBalanceWalletIcon style = {{ color : "white"}}/> SplitBill
							</Typography>

							{localStorage.getItem("access") ? 
								<a href = "/login" onClick = {()=> this.logout()} style={{ marginLeft : "auto" }}>
									<Button variant="contained" 
										color="secondary" >
										Logout</Button>	</a>
									: null}

							</Toolbar>
						</AppBar>
						<main className={classes.content}>
							<Switch>
								<Route exact path = "/login" component = {Login}/>
								<Route exact path = "/signup" component = {SignUp}/>
								<Route exact path = "/reset_password" component = {ResetPassword}/>
								<Route exact path = "/password/reset/confirm/:uid/:token" component = {ResetPasswordConfirm}/>
								<Route exact path = "/activate/:uid/:token" component = {Activate}/>
								<Route exact path = "/list" component = {ListTrips} />
								<Route exact path = "/:room_id" component = {Home}/>
							</Switch>
						</main>
					</div>
				</div>
			</BrowserRouter>
		)
	}
}

export default withStyles(useStyles)(App);