const API_URL = "http://127.0.0.1:8000/";

export default{
    postTransactionDetails({amount, paidAt, paidBy, paidOn, description}, room_id, callBackFunc){
        const body = {
            "amount" : amount, 
            "paidAt" : paidAt,
            "paidOn" : paidOn,
            "description" : description,
            "paidBy" : paidBy,
            "room_id" : room_id,
        };

        const requestOptions = {
            "method" : "POST",
            "headers" : {
                "Content-Type" : "application/json",
                "Authorization" : `JWT ${localStorage.getItem('access')}`,
                "Accept" : "application/json",
            },
            body : JSON.stringify(body),
        };

        fetch(API_URL + "api/transaction", requestOptions)
            .then(
                (res)=>{
                    //console.log(res);
                    callBackFunc();
                }
            );
    },

    deleteTransactionDetails(room_id, callBackFunc){
        const requestOptions = {
            "method" : "DELETE",
            "headers" : {
                "Content-Type" : "application/json",
                "Authorization" : `JWT ${localStorage.getItem('access')}`,
                "Accept" : "application/json",
            },
        };

        fetch(API_URL + "api/transaction/" + room_id, requestOptions)
            .then(
                (res) =>{
                    //console.log(res);
                    // Do some callBacks here
                    callBackFunc();
                }
            );
    },

    getTransactionDetails(room_id, callBackFunc){
        const requestOptions = {
            "method" : "POST",
            "headers" : {
                "Content-Type" : "application/json",
                "Authorization" : `JWT ${localStorage.getItem('access')}`,
                "Accept" : "application/json",
            },
        };

        fetch(API_URL + "api/transaction/" + room_id, requestOptions)
            .then(
                (res) => res.json()
            ).then(
                (data)=>{
                    //console.log("Transaction Data : ", data)
                    callBackFunc(data);
                }
            )
    },
}