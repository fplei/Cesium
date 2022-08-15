export class Haha{
    constructor(){

    }

    //单例
    static getInstance(){
        if(!this.instance){
            this.instance = new Haha();
        }
        return this.instance
    }

    // 写各种函数了。。。
    xixi(){

    }

    hehe(){
        
    }

}