import { EmployeesService } from './../services/employees.service';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {
  constructor(private modalController: ModalController, private service: EmployeesService, private toastController: ToastController) {}

  async close(){
    await this.modalController.dismiss(null, 'closed'); 
  }

  onSubmit(form: NgForm){
    const employee = form.value;

    this.service.postData(employee).subscribe();
    this.modalController.dismiss()
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Saved.',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

}
