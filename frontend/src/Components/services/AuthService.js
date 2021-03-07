const API_URL = "http://127.0.0.1:8000/";


export default{
    login({email, password}){
        const body = JSON.stringify({email, password});
        const requestOptions = {
            "method" : "POST",
            "headers" : {"Content-type" : "application/json"},
            "body" : body,
        }

        return(fetch(
            API_URL+"auth/jwt/create/", requestOptions
        ).then(
            response =>{
                return response.json();
            }
        ).then(
            (data) =>{
                console.log("First", data);
                if(data){
                    localStorage.setItem("access", data.access);
                    return({
                        isAuthenticated : true,
                    });
                }else{
                    return({
                        isAuthenticated : false,
                    });
                }
            }
        ));
    },

    logout(){
        localStorage.removeItem("access");
    },

    async loadUser(){
        if(localStorage.getItem("access")){
            const requestOptions = {
                "method" : "GET",
                "headers" : {
                    "Content-Type" : "application/json",
                    "Authorization" : `JWT ${localStorage.getItem('access')}`,
                    "Accept" : "application/json",
                }
            };

            return fetch(
                API_URL+"auth/users/me", requestOptions
            ).then(
                res => res.json()
            ).then(
                (data)=>{
                    return data;
                }
            );
        }
    },

    checkAuthenticated(){
        if(localStorage.getItem("access")){
            const body = JSON.stringify({token : localStorage.getItem("access")});
            const requestOptions = {
                "method" : "POST",
                "headers" : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json",
                },
                "body" : body,
            };

            console.log(requestOptions);

            return(fetch(
                API_URL + "auth/jwt/verify/", requestOptions
            ).then(
                res => res.json()
            ).then(
                (data)=>{
                    console.log("data" , data);
                    if(data.code && data.code === "token_not_valid"){
                        return({
                            isAuthenticated : false,
                        })
                    }else{
                        console.log("inside else");
                        return({
                            isAuthenticated : true,
                        })
                    }
                }
            ));
        }
        else{
            return({
                isAuthenticated : false,
            })
        } 
    },
}
