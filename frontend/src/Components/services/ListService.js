const API_URL = "http://127.0.0.1:8000/";


export default{
    getTripList(callBackFunc){
        const requestOptions = {
            "method" : "GET",
            "headers" : {
                "Content-Type" : "application/json",
                "Authorization" : `JWT ${localStorage.getItem('access')}`,
                "Accept" : "application/json",
            }
        };

        fetch(API_URL + "api/trips-list", requestOptions)
                    .then(
                        (res)=>res.json()
                    ).then(
                        (data)=>{
                            callBackFunc(data);
                        }
                    );
    },

    deleteTrip(id, callBackFunc){
        const requestOptions = {
            "method" : "DELETE",
            "headers" : {
                "Content-Type" : "application/json",
                "Authorization" : `JWT ${localStorage.getItem('access')}`,
                "Accept" : "application/json",
            },
        };

        fetch(API_URL + "api/trips-list/"+id, requestOptions)
            .then(
                (res)=>{
                    callBackFunc();
                }   
            )
    },

    createTrip(newTripName, callBackFunc){
        const body = {
            "trip_details" : {
                "name" : newTripName,
            },
        };

        const requestOptions = {
            "method" : "POST",
            "headers" : {
                "Content-Type" : "application/json",
                "Authorization" : `JWT ${localStorage.getItem('access')}`,
                "Accept" : "application/json",
            },
            "body": JSON.stringify(body),
        };

        fetch(API_URL + "api/trips-list", requestOptions)
            .then(
                (res) => {
                    callBackFunc();
                }
            )
    },
}