import { BootstrapSideMenuLink } from "./bootstrap-sidemenu-link";

export class BootstrapSideMenuConfig {
    public links:BootstrapSideMenuLink[] = [];
    public title:string     = 'Estadísticas 1';
    public icon_size:number = 30;

    public optionSelected:number = -1;

    public addLink(link:BootstrapSideMenuLink){
        link.menu = this;
        this.links.push(link);
    }

    constructor(){
        this.links = [];
    }
}