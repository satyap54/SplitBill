import React, { Component } from "react";

// utils
import Person from "../utils/Person";

// Material ui componenets
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import GangMemberServices from "./services/GangMember";


class AddPerson extends Component{
	state = {
		name : null,
		personList : [{
			"name" : "Dummy name",
			"id" : "Dummy id",
		}],
	}

	setGangMembersList = (data)=>{
		this.setState({
			"personList" : [...(data.gangMembers)],
		})
	}

	getGangMembersList = ()=>{
		GangMemberServices.getGangMembers(this.props.match.params.room_id, this.setGangMembersList);
	}

	componentDidMount(){
		this.getGangMembersList();
	}

	handleSubmit = (event)=>{
		event.preventDefault();
		console.log(event);
		if(this.state.name){
			// Add new Person by calling api end-point
			GangMemberServices.createGangMember(this.state.name, this.props.match.params.room_id, 
												this.getGangMembersList);
		}

		this.state.name = null;
	}

	handleChange = (e)=>{
		this.setState({
			name : e.target.value,
		})
	}

	deletePerson = (id)=>{
		GangMemberServices.deleteGangMember(id, this.getGangMembersList);
	}

	displayPeopleName = ()=>{
		const { personList } = this.state;
		const renderedList = (
			personList.map(
				(person)=>{
					return(
						<Grid item md = {4}>
							<Card style = {{minWidth : 50, maxWidth: 300, }}>
								<CardContent>
									<Typography variant = "h5" component = "h2">
										{person.name}
									</Typography>
									<Button variant="contained" color="secondary" size = "small" disableElevation
											style = {{ width: '20px', marginTop: '10px',}}
											onClick = {()=> this.deletePerson(person.id)}
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
			<div className = "addPerson">
				<form onSubmit = {this.handleSubmit}>
					<FormControl style = {{ spacing : "2", minWidth : 400,}}>
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
							style = {{ marginTop : 12 }} disableElevation>
						Add
					</Button>
				</form>

				<Grid container spacing={3}>
					{this.displayPeopleName()}
				</Grid>
			</div>
		);
	}
}

export default AddPerson;
