class Payment{
    constructor(amount, paidAt, paidBy, paidOn, description, id){
        this.amount = amount;
        this.paidAt = paidAt;
        this.paidBy = paidBy;
        this.paidOn = paidOn;
        this.description = description;
        this.id = id;
    }
}

export default Payment;
