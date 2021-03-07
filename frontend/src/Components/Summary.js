import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Person from "../utils/Person";
import Checkbox from '@material-ui/core/Checkbox';

import GangMember from "./services/GangMember";
import TransactionServices from "./services/TransactionServices";

class Summary extends Component{
    state = {
        operationList : [],
        paymentList : [],
        personList : [],
        numberOfPeople : 0,
    }

    setPersonList = (data)=>{
        this.setState({
            personList : [...(data.gangMembers)],
            numberOfPeople : (data.gangMembers).length,
        })

        this.calculateTransactions();
    }

    setPaymentList = (data)=>{
        this.setState({
            paymentList : [...(data.transactions)],
        })

        this.calculateTransactions();
    }

    componentDidMount(){
        GangMember.getGangMembers(this.props.match.params.room_id, this.setPersonList);
        TransactionServices.getTransactionDetails(this.props.match.params.room_id, this.setPaymentList);
    }

    findMax = (arr)=>{
        let idx = -1;
        for(let i = 0; i < arr.length; i++){
            if(idx === -1){
                if(arr[i].amt !== 0)
                    idx = i;
            } else{
                if(arr[i].amt > arr[idx].amt)
                    idx = i;
            }
        }

        return idx;
    }

    nMinusOneTransaction = (givers, receivers)=>{
        console.log("givers", givers);
        console.log("recerivers", receivers);

        let id = 0, res = [];
        while(true){
            let idx1 = this.findMax(givers), idx2 = this.findMax(receivers);
            if(idx1 == -1 && idx2 == -1)
                break;
            ++id;
            let edge = [givers[idx1], receivers[idx2], Math.min(givers[idx1].amt, receivers[idx2].amt), id];
            res.push(edge);

            if(givers[idx1].amt === receivers[idx2].amt){
                givers[idx1].amt = 0;
                receivers[idx2].amt = 0;
            } else if(givers[idx1].amt > receivers[idx2].amt){
                givers[idx1].amt -= receivers[idx2].amt;
                receivers[idx2].amt = 0;
            } else{
                receivers[idx2].amt -= givers[idx1].amt;
                givers[idx1].amt = 0;
            }
        }

        return res;
    }

    calculateTransactions = ()=>{
        const {personList, paymentList, numberOfPeople} = this.state;
        let paid = {}, n = numberOfPeople, transactions = [], givers = [], receivers = [], split = 0;
        personList.forEach(person => {
            paid[person.name] = 0;
        });

        paymentList.forEach(payment => {
            paid[payment.paidBy] += parseInt(payment.amount);
            split += parseInt(payment.amount);
        });

        split /= (n * 1.0);
        for(let i = 0; i < n; i++){
            let x = Math.abs(split - paid[personList[i].name]); 
            let ob = new Person(personList[i].name, personList[i].id);
            if(paid[personList[i].name] < split){
                givers.push(ob);
                givers[givers.length - 1].amt = x;
            }
            else{
                receivers.push(ob);
                receivers[receivers.length - 1].amt = x;
            }
        }

        transactions = this.nMinusOneTransaction(givers, receivers);

        this.setState({
            operationList : [...transactions],
        });
    }

    getSteps = ()=>{
        return(
            this.state.operationList.map(
                (edge)=>{
                    return(
                        <ListItem>
                            <Checkbox
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                            <ListItemText primary= {edge[0].name + " pays to " + edge[1].name} secondary={"Rs. "+edge[2]} />
                        </ListItem>
                    )
                }
            )
        )
    }

    render() {
        return (
            <div>
            <Typography variant="h3" gutterBottom>
                Summary
            </Typography>
            <List style = {{
                width: '100%',
                maxWidth: 360,
              }}
            >
                { this.getSteps() }
            </List>
            </div>
        )
    }
}

export default Summary;