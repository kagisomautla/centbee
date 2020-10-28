import { Subscription } from 'rxjs';
import { AlertController, ModalController } from '@ionic/angular';
import { Employee, EmployeesService } from './../services/employees.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.page.html',
  styleUrls: ['./update-employee.page.scss'],
})
export class UpdateEmployeePage implements OnInit{
  @Input() employee : Employee;

  subscription : Subscription;

  data =  {
    empId: 0,
    name: '', 
    surname: '',
    occupation: ''
  };

  constructor(private service: EmployeesService, private modalController: ModalController, private alertController: AlertController) {
   }

  async close(){
    await this.modalController.dismiss(null, 'closed'); 
  }

  onSubmit(form: NgForm){
    const employee = form.value;
    this.subscription = this.service.update(employee, this.employee.empId).subscribe(()=>{
      employee.id = this.employee.empId;
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Update',
      subHeader: 'Are you sure you want to continue',
      buttons: [
        {
          text: 'Yes',
          role: 'proceed',
          handler: async() => {
            this.onSubmit;
            this.modalController.dismiss(); 
          }
        },

        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.modalController.dismiss(); 
          }
        },
      ]
    });
    await alert.present();
  }


  ngOnInit(){
    this.data = this.employee;
  }
}
