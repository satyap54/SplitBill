import React, { Component } from "react";

// Material ui componenets
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import ListService from "./services/ListService.js";

/*
    To-do :
        Check how the Trip object instance looks like and set onClick() of each 
        trip card accordingly
*/

class ListTrips extends Component{
	constructor(props){
		super(props);
		this.state = {
			tripList : [],
			newTripName : null,
		};
	}

	componentDidMount(){
		ListService.getTripList(this.setTripList);
	}

	handleSubmit = (event)=>{
		event.preventDefault();
		// Create a new Trip model instance
		console.log("Submitted");
		ListService.createTrip(this.state.newTripName, this.setTripList);
	}

	handleChange = (e)=>{
		this.setState({
			newTripName : e.target.value,
		})
	}

    deleteTrip = (pk)=>{
		console.log("delete trip with id ", pk);
        // Delete Trip object instance with "id"
		ListService.deleteTrip(pk, this.setTripList);
    }

	setStateFunc = (res)=>{
		this.setState({
			tripList : [...res.tripList],
		});
	}

	setTripList = ()=>{
		ListService.getTripList(this.setStateFunc);
	}

	displayTripName = ()=>{
		const { tripList } = this.state;

		const renderedList = (
			tripList.map(
				(trip)=>{
					return(
						<Grid item md = {4}>
							<Card style = {{minWidth : 50, maxWidth: 300, }}>
								<CardContent>
									<Typography variant = "h5" component = "h2">
										{trip.name}
									</Typography>
									<Button variant="contained" color="secondary" size = "small" disableElevation
											style = {{ width: '20px', marginTop: '10px',}}
											onClick = {()=> this.deleteTrip(trip.id)}
									>
										Remove
									</Button>
								</CardContent>
							</Card>
						</Grid>
					)
				}
			)
		);
		
		return renderedList;
	}

    render(){
		return(
			<div className = "listTrips">
				<form onSubmit = {this.handleSubmit}>
					<FormControl style = {{ spacing : "2", minWidth : 400, marginTop : 13}}>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Name"
							type="name"
							fullWidth
							onChange = {this.handleChange}
							onSubmit = {this.handleSubmit}
							value = {this.state.name}
						/>
					</FormControl>

					<Button autoFocus variant = "contained" onClick={this.handleSubmit} color="primary"
							style = {{ marginTop : 30, marginLeft : 10 }} disableElevation>
						Add
					</Button>
				</form>

				<Grid container spacing={3}>
					{this.displayTripName()}
				</Grid>
			</div>
		);
	}
}

export default ListTrips;
