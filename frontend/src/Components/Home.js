import React, {Component} from 'react';
import {render} from "react-dom";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import AddIcon from '@material-ui/icons/Add';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import { withStyles } from '@material-ui/core/styles';

// Url routing
import { NavLink } from 'react-router-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import Transactions from './Transactions';
import AddPerson from "./AddPerson";
import Summary from "./Summary";

// Graph
import Person from "../utils/Person";

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

class Home extends Component{
  	render(){
		const {classes} = this.props;
		return (
			<BrowserRouter>
				<div className={classes.root}>
				<CssBaseline />

				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
					<Typography variant="h4" noWrap>
						<AccountBalanceWalletIcon style = {{ color : "white"}}/> SplitBill
					</Typography>
					</Toolbar>
				</AppBar>

				<Drawer
					className={classes.drawer}
					variant="permanent"
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<Toolbar />
					<div className={classes.drawerContainer}>
							<NavLink
								to={"/add/"+(this.props.match.params.room_id)}
								activeStyle={{
									fontWeight: "bold",
									background: "blue",	
								}}
							>
								<List>
									
										<ListItem button key= "Add Homies">
											<ListItemIcon><AddIcon style = {{ color : "white"}}/></ListItemIcon>
											<ListItemText primary="Add Homies" style = {{ color : "white"}}/>
										</ListItem>
								</List>
						</NavLink>

						<Divider className = {classes.divider}/>
						
						<NavLink
							to={"/transactions/"+(this.props.match.params.room_id)}
							activeStyle={{
								fontWeight: "bold",
								color: "blue"
							}}
						>
							<List>
								
								<ListItem button key= "Transactions">
									<ListItemIcon><ReceiptIcon style = {{ color : "white"}}/></ListItemIcon>
									<ListItemText primary="Transactions" style = {{ color : "white"}}/>
								</ListItem>
							</List>
						</NavLink>

						<Divider className = {classes.divider}/>
						
						<NavLink
							to={"/summary/"+(this.props.match.params.room_id)}
							activeStyle={{
								fontWeight: "bold",
								color: "blue"
							}}
						>
							<List>
								<ListItem button key= "Summary">
									<ListItemIcon><ImportExportIcon style = {{ color : "white"}}/></ListItemIcon>
									<ListItemText primary="Summary" style = {{ color : "white"}}/>
								</ListItem>
							</List>
						</NavLink>

					</div>
				</Drawer>
				<main className={classes.content}>
					<Toolbar />
					<Switch>
						<Route exact path = "/transactions/:room_id" component = {Transactions}/>
						<Route exact path = "/add/:room_id" component = {AddPerson}/>
						<Route exact path = "/summary/:room_id" component = {Summary}/>		
					</Switch>
				</main>
				</div>
			</BrowserRouter>
		);
	}
}

export default withStyles(useStyles)(Home);