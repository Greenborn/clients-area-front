import { Component, OnInit } from '@angular/core';
import { ReportBug } from './models/report.bug';
import { AppUIUtilsService } from 'src/app/modules/AppUIUtils/services/app.ui.utils.service';
import { PublicBugReportService } from './services/public.report.bug.service';
import { ActivatedRoute, Params } from '@angular/router';
import { PublicProyectService } from 'src/app/services/public.proyect.service';

@Component({
  selector: 'app-report-bug',
  templateUrl: './report-bug.component.html',
  styleUrls: ['./report-bug.component.css']
})
export class ReportBugComponent implements OnInit {

  constructor(
    private appUIUtilsService:      AppUIUtilsService,
    private publicBugReportService: PublicBugReportService,
    private publicProyectService:   PublicProyectService,
    private activatedRoute:         ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async paramMap => {
      this.model.proyect_id = paramMap.get('id');
      this.publicProyectService.get(this.model.proyect_id).subscribe(
        ok => {
         this.proyect_name = ok.name;
        },
        err => {
        }
      );
    });
    
  }

  public model:any = new ReportBug();
  public proyect_name:string = 'Grupo Fotográfico Centro';
  private max_image_count:number = 5;

  next(){
    
    if (this.model.description == ''){
      this.appUIUtilsService.showMessage("Es necesario completar la descripción.");
      return false;
    }

    this.appUIUtilsService.presentLoading();console.log(this.model);
    this.publicBugReportService.post(this.model).subscribe(
      ok => {
        this.appUIUtilsService.dismissLoading();
        this.appUIUtilsService.showMessage("Reporte recibido correctamente.");
      },
      err => {
        this.appUIUtilsService.dismissLoading();
        this.appUIUtilsService.showMessage("Limite de mensajes superado, intente luego.");
      }
    );
  }

  deleteImg(i:number){
    this.model.images.splice(i, 1);
  }

  handleFileInput(files: FileList) {
    if (this.model.images.length >= this.max_image_count){
      this.appUIUtilsService.showMessage( "Solo se permite adjuntar hasta "+this.max_image_count+" imágenes." );
      return false;
    }

    let me = this;
    let file = files[0];
    let reader = new FileReader();
   
    reader.readAsDataURL(file);
    reader.onload = function () {
        for(let c=0; c<me.model.images.length; c++){
          if (me.model.images[c].name == file.name){
            me.appUIUtilsService.showMessage( "La imagen seleccionada ya se encuentra entre las imágenes a subir." );
            return false;
          }
        }
        me.model.images.push({ file: reader.result, name:file.name});
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      return false;
    };
  }


}
