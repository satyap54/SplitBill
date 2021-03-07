import React, { Component } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from "@material-ui/core";


class PaymentInfoDialog extends Component{
	state = {
		amount : null,
		paidBy : null,
		paidAt : null,
		paidOn : null,
		description : null,
	}

	handleClose = (event)=>{
		this.props.onClose(this.state);
	}

	checkPositiveNumber = (event)=>{
		const intVal = parseInt(event.target.value);
		if(intVal < 0){
			event.target.value = null;
		} else{
			this.setState({
				amount : intVal,
			})
		}
	}

	selectPerson = (event)=>{
		this.setState({
			paidBy : event.target.value,
		})
	}

	paymentLocation = (event)=>{
		this.setState({
			paidAt : event.target.value,
		})
	}

	dateOfPayment = (event)=>{
		this.setState({
			paidOn : event.target.value,
		})
	}

	setDescription = (event)=> {
		this.setState({
			description : event.target.value,
		})
	}

	renderPersonList = ()=>{
		const {personList} = this.props;
		const renderList = 
			personList.map(
				(person)=>{
					return (<option value = {person.id}>{person.name.toString()}</option>);
				}
			)
		return renderList;
	}

	render(){
		return(
			<Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open}>
				<DialogTitle id="simple-dialog-title">New Payment</DialogTitle>
				<DialogContent>
					<form style = {{ display : "flex", flexWrap : "wrap", }}>
						<FormControl style = {{ spacing : "2", minWidth : 200,}}>
							<TextField
								id="name"
								label="Amount"
								type="number"
								fullWidth
								required = {true}
								onChange={ this.checkPositiveNumber }
							/>
						</FormControl>

						<FormControl style = {{ spacing : "2", minWidth : 200,}} required = {true}>
							<InputLabel htmlFor="demo-dialog-native">Paid by</InputLabel>
							<Select native onChange = {this.selectPerson}>
								<option aria-label="None" value="" />
								{this.renderPersonList()}
							</Select>
						</FormControl>

						<FormControl style = {{ spacing : "2", minWidth : 400,}}>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="At"
								type="name"
								fullWidth
								style = {{ paddingTop : 10,}}
								onChange = {this.paymentLocation}
							/>
						</FormControl>

						<FormControl style = {{ spacing : "2", minWidth : 400,}}>
							<TextField
								id="date"
								label="Date of Payment"
								type="date"
								style = {{ paddingTop : 10,}}
								InputLabelProps={{
								shrink: true,
								}}
								onChange = {this.dateOfPayment}
							/>
						</FormControl>
						
						<FormControl style = {{ spacing : "2", minWidth : 400,}}>
							<TextField
								autoFocus
								margin="dense"
								id="description"
								label="Description"
								type="name"
								fullWidth
								style = {{ paddingTop : 10,}}
								onChange = {this.setDescription}
							/>
						</FormControl>

					</form>

					<Button autoFocus variant = "contained" onClick={() => this.handleClose()} color="primary"
							style = {{ marginTop : 15,}}>
						Add
					</Button>

				</DialogContent>
			</Dialog>
		);
	}
}

export default PaymentInfoDialog;