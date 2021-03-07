import React, {Component} from 'react';
import AddPaymentForm from "./AddPaymentForm";
import PaymentInfoCard from "./PaymentInfoCard";
import TransactionServices from "./services/TransactionServices";
import GangMember from "./services/GangMember";

class Transactions extends Component{
    state = {
        personList : [],
        paymentList : [],
    }

    componentDidMount(){
        this.getPersonList();
        this.getTransactionList();
        console.log("Person List", this.state.personList);
    }

    setPersonList = (data) =>{
        this.setState({
            personList : [...(data.gangMembers)],
        })
    }

    setTransactionList = (data)=>{
        this.setState({
            paymentList : [...(data.transactions)],
        })
    }

    getTransactionList = ()=>{
        TransactionServices.getTransactionDetails(this.props.match.params.room_id, this.setTransactionList);
    }

    getPersonList = ()=>{
        GangMember.getGangMembers(this.props.match.params.room_id, this.setPersonList);
    }

    deleteTransaction = (id) =>{
        console.log("Delete transaction with id ", id);
        TransactionServices.deleteTransactionDetails(id, this.getTransactionList);
    }

    render(){
        return(
            <div className = "transactions">
                <AddPaymentForm personList = {this.state.personList} 
                                getTransactionList = {this.getTransactionList}
                                room_id = {this.props.match.params.room_id}/>
                <PaymentInfoCard deletePayment = {this.deleteTransaction} paymentList = {this.state.paymentList}/>
            </div>
        );
    }
}

export default Transactions;
