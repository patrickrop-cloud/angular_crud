import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Employeemodel } from './employee-dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObject : Employeemodel = new Employeemodel();
  employeeData : any[]=[];
  showAdd! : boolean;
  showUpdate! : boolean;
  
  constructor(private formbuilder:FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      department:['']
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails(){
    this.showAdd = true;
    this.showUpdate = false;
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.mobile = this.formValue.value.mobile;
    this.employeeModelObject.department = this.formValue.value.department;

    this.api.postEmployee(this.employeeModelObject).subscribe(res=>{
      console.log(res);
      alert("Employee added succesfully")
      let ref = document.getElementById('close')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert(" Ooops! sorry! Try again")
    })
  }
  getAllEmployee(){
    this.api.getEmployee().subscribe
    (res=>{
      this.employeeData = res;
    },
    (err)=>{
      alert('Ooops! check and try again')
    })
  }
  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id).subscribe
    (res=>{
      alert('Employee deleted succesfully');
      this.getAllEmployee();
    },
    (res)=>{
      alert('Oooops! Check and try again!')
    })
  }
  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObject.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['department'].setValue(row.department);
  
  }
  updateEmployeeDetails(){
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.mobile = this.formValue.value.mobile;
    this.employeeModelObject.department = this.formValue.value.department;

    this.api.updateEmployee(this.employeeModelObject, this.employeeModelObject.id)
    .subscribe(res=>{
      alert("Employee updated succesfully");
      let ref = document.getElementById('close')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
    alert('Error, kindly try again!');
    })
  }
}