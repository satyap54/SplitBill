import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import PaymentInfoDialog from "./PaymentInfoDialog";

import TransactionServices from "./services/TransactionServices";

class AddPaymentForm extends Component{
	state = {
		open : false,
	}

	componentDidMount(){
		console.log(this.props);
	}

	handleClose = (ob) =>{
		this.setState({
			open : false,
		});

		const {amount, paidAt, paidBy} = ob;

		if(amount === null || paidBy === null)
			return;
		
		// Call API-End point to post
		TransactionServices.postTransactionDetails(ob, this.props.room_id,
									 this.props.getTransactionList);
	}

	handleClickOpen = () =>{
		this.setState({
			open : true,
		});
	}

	render(){
		return(
		   <div className = "paymentForm">
				<Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
					Add New Payment
				</Button>
				  <PaymentInfoDialog personList = {this.props.personList} 
				  		open={this.state.open} onClose={this.handleClose} />
		   </div>
		);
	}
}

export default AddPaymentForm;
