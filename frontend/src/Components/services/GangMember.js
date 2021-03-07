const API_URL = "http://127.0.0.1:8000/";


export default{
    getGangMembers(room_id, callBackFunc){
        const requestOptions = {
            "method" : "POST",
            "headers" : {
                "Content-Type" : "application/json",
                "Authorization" : `JWT ${localStorage.getItem('access')}`,
                "Accept" : "application/json",
            },
        };

        fetch(API_URL + "api/gang-member/"+room_id, requestOptions)
            .then(
                (res)=>res.json()
            ).then(
                (data)=>{
                   // console.log("Person/GangMembers data", data)
                    callBackFunc(data)
                }
            )
    },

    createGangMember(name, room_id, callBackFunc){
        const body = {  
            "name" : name,
            "room_id" : room_id,
        }

        const requestOptions = {
            "method" : "POST",
            "headers" : {
                "Content-Type" : "application/json",
                "Authorization" : `JWT ${localStorage.getItem('access')}`,
                "Accept" : "application/json",
            },
            "body" : JSON.stringify(body),
        };

        fetch(API_URL + "api/gang-member", requestOptions)
            .then(
                (res) => {
                    callBackFunc()
                }
            ) 
    },

    deleteGangMember(id, callBackFunc){
        const requestOptions = {
            "method" : "DELETE",
            "headers" : {
                "Content-Type" : "application/json",
                "Authorization" : `JWT ${localStorage.getItem('access')}`,
                "Accept" : "application/json",
            }
        };

        fetch(API_URL + "api/gang-member/"+id, requestOptions)
            .then(
                (res)=>{
                    callBackFunc()
                }
            )
    },
}
