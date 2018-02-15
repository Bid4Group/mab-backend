import Model from './Model';

export default class User extends Model {
    public id: number;

    public firstname: string;
    public lastname: string;
    public phonenumber: string;
    public email: string;
    public company: string;

    constructor(user?: User) {
        super();
        this._type = "Users";

        if (user) {
            this.firstname = user.firstname;
            this.lastname = user.lastname;
            this.phonenumber = user.phonenumber;
            this.email = user.email;
            this.company = user.company;
        }
    }
}