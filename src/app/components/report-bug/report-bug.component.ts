import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FileUplodVM } from './models/file.upload.vm';
import { map } from 'rxjs/operators';
import { ReportBug } from './models/report.bug';

@Component({
  selector: 'app-report-bug',
  templateUrl: './report-bug.component.html',
  styleUrls: ['./report-bug.component.css']
})
export class ReportBugComponent implements OnInit {

  constructor(
    private http:HttpClient
  ) { }

  ngOnInit(): void {
  }

  public model:any = new ReportBug();
  public proyect_name:string = 'Grupo Fotográfico Centro';

  ImageBaseData:string | ArrayBuffer=null;

  next(){}

  handleFileInput(files: FileList) {
    let me = this;
    me.model.images= [];
    for (let c=0; c < files.length; c++){
      let file = files[c];
      let reader = new FileReader();
   
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);
        me.model.images[c]=reader.result;
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
   
    }
  }

  btnUpload(){
    
    if(this.ImageBaseData==null){
      alert("Please select file");
    }else{     
      var fileUplodVM: FileUplodVM={
        ImageBaseData:this.ImageBaseData.toString()
      }
      this.CreateItem(fileUplodVM).subscribe((res: any) =>{ 
        if(res){
          alert("Successfully uploded file");
        }else{
          alert("File upload failed");
        }
        
      },
      error => {
        alert(error.message);
      });
    }
  }
  public CreateItem(data) {
   return this.http.post(`http://localhost:52410/api/Order/UploadFile`, data)
    .pipe(
      map((res: any) => {
        console.log(res);
        return res;
      }));
  }

}
