import { BootstrapSideMenuConfig } from "./bootstrap.sidemenu.config";

export class BootstrapSideMenuLink {
    public id:number;
    public menu:BootstrapSideMenuConfig;
    public icon:string;
    public name:string;
    public color:string;

    public onClick:any      = (optionId:number)=>{
        this.menu.optionSelected = optionId;
    };
    
    constructor( params:any ){
        this.id    = params.id;
        this.icon  = params.icon;
        this.name  = params.name;
        this.color = params.color;
    }
}