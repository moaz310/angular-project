export class User{

    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _expires_In: Date
    ){}

    get token(){
        if(new Date().getTime() < this._expires_In.getTime()){
            return this._token;
        }
        return null;
    }
}