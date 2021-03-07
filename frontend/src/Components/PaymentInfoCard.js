import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
	root: {
		minWidth: 50,
		maxWidth: 300,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

function PaymentInfoCard(props) {
	const classes = useStyles();

	const getPayments = ()=>{
		const { paymentList } = props;
		const renderList = 
				paymentList.map(
					(payment)=>{
						return(
							<Grid item md = {4}>
								<Card className={classes.root}>
									<CardContent>
										<Typography className={classes.title} color="textSecondary" gutterBottom>
											{payment.paidOn}
										</Typography>
										<Typography variant="h5" component="h2">
											Rs. {payment.amount}
										</Typography>
										<Typography className={classes.pos} color="textSecondary">
											{payment.paidAt}
										</Typography>
										<Typography variant="body2" component="p">
											{payment.description}
										<br />
										<Box fontWeight="fontWeightBold">
											Paid by : 
										</Box>{payment.paidBy}
										</Typography>
										<Button variant="contained" color="secondary" size = "small" disableElevation
											style = {{ width: '20px', marginTop: '10px',}}
											onClick = {()=> props.deletePayment(payment.id)}
										>
											Remove
										</Button>

									</CardContent>
								</Card>
							</Grid>
						);
					}
				);
		return renderList;
	}

	return (
		<Grid container className = "paymentCards" spacing = {2}>
			{getPayments()}
		</Grid>
	);
}

export default PaymentInfoCard;
