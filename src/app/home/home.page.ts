import { UpdateEmployeePage } from './../update-employee/update-employee.page';
import { AddEmployeePage } from './../add-employee/add-employee.page';
import { AlertController, ModalController } from '@ionic/angular';
import { Employee, EmployeesService } from '../services/employees.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { stderr } from 'process';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  employee : Employee[];
  subscription: Subscription;

  constructor(public service: EmployeesService, private modalController: ModalController, public alertController: AlertController){

  }

  async addEmpModal(){
    this.modalController.create({
      component: AddEmployeePage,
    })
    .then(modal=>{
      modal.present();
      return modal.onDidDismiss();
      }).then(res=>{
        console.log(res);
      })
  }

  updateEmployee(employee: Employee){
    this.modalController.create({
      component: UpdateEmployeePage,
      componentProps: { employee }
    })
    .then(modal=>{
    modal.present();
    })
  }
 
  refreshPage(event) {
    console.log('Begin async operation');
    this.subscription = this.service.getAllData().subscribe(employee => this.employee = employee);
    this.subscription.closed;

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete',
      subHeader: 'Are you sure you want to completely remove employee?',
      buttons: [
        {
          text: 'Yes',
          role: 'proceed',
          handler: async() => {
            this.service.deleteData(id).subscribe(()=>{
              this.employee = this.employee.filter(std=> {
                std.empId !== id;
              });
            });

            this.service.getAllData().subscribe();
          }
        },

        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.alertController.dismiss();
          }
        },
      ]
    });

    await alert.present();
  }

  ngOnInit(){
    this.subscription = this.service.getAllData().subscribe(employee => this.employee = employee);
    this.subscription.closed;
    this.initializeData();
  }

  FilterData(ev:any){
    this.initializeData();
    const val = ev.target.value;

    if(val && val.trim() != ''){
      this.employee = this.employee.filter((item)=>{
        return (item.name.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    }
  }

  initializeData(){
    return this.employee;
  }

}
