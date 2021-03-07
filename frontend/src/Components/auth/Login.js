import React, {Component} from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import AuthService from "../services/AuthService.js";

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            "email" : null,
            "password" : null,
        };
    }

    async componentDidMount() {
        AuthService.checkAuthenticated().then(
            (data)=>{
                if(data.isAuthenticated){
                    this.props.history.push("/list");
                    window.location.reload();
                }
            }
        )
    }

    handleEmailChange = (e) =>{
        this.setState({
            "email" : e.target.value,
        });
    }

    handlePasswordChange = (e) =>{
        this.setState({
            "password" : e.target.value,
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        AuthService.login(this.state).then(
            (data)=>{
                console.log("Second", data);
                if(data.isAuthenticated){
                    this.props.history.push("/list");
                    window.location.reload();
                }
            }
        ); 
    }

    /*
        Is the user authenticated? 
        Redirect to home page
    */

    render(){
        return(
            <div className = "Login" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop : "150px",
              }}>
                <form onSubmit = {e => this.handleSubmit(e)}>
					<FormControl style = {{ spacing : "2", minWidth : 400,}}>
                        <FormLabel color = "secondary">
                            <Typography variant="h5" component="h5">
                                Login
                            </Typography>
                        </FormLabel>

						<TextField
							autoFocus
							margin="dense"
							id="email"
							label="email"
							type="email"
							fullWidth
							onChange = {this.handleEmailChange}
						/>
                        
                        <TextField
                            ref = "password"
							autoFocus
							margin="dense"
							id="password"
							label="password"
							type="password"
							fullWidth
							onChange = {this.handlePasswordChange}
						/>

					</FormControl>
                    <br/>
					<Button autoFocus variant = "contained" onClick={this.handleSubmit} color="primary"
							style = {{ marginTop : 12 }} disableElevation>
						Login
					</Button>
                    <p>Don't have an account? <Link to = "/signup">Sign Up</Link></p>
                    <p><Link to = "/reset_password">Forgot Password</Link></p>
				</form>
            </div>
        );
    }
}

export default Login;