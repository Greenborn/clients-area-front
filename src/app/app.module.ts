import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';
import { NgbAccordionModule, NgbModule, NgbNavModule, NgbPopoverModule }        from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts';


import { AutenticationModule } from './modules/autentication/autentication.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppUIUtilsModule } from './modules/AppUIUtils/app-uiutils.module';

import { LoadingComponent } from './modules/AppUIUtils/components/loading/loading.component';
import { MessageComponent } from './modules/AppUIUtils/components/message/message.component';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutenticationModule,
    AppUIUtilsModule,
    FormsModule,
    AppUIUtilsModule,
    ReactiveFormsModule,
    ChartModule,AppUIUtilsModule,
    NgbModule,NgbPopoverModule,
    NgbNavModule, NgbAccordionModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
