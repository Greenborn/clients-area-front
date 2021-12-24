import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/autentication/services/auth.service';
import { BootstrapSideMenuConfig } from './model/bootstrap.sidemenu.config';

@Component({
  selector: 'app-bootstrap-sidemenu',
  templateUrl: './bootstrap-sidemenu.component.html',
  styleUrls: ['./bootstrap-sidemenu.component.sass']
})
export class BootstrapSidemenuComponent implements OnInit {

  @Input()  config:BootstrapSideMenuConfig = new BootstrapSideMenuConfig();

  constructor(
    private authService:      AuthService,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.toLogOut();
  }
}
