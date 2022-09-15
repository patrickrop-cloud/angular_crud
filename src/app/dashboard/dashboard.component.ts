import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
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
  // delEmployee! : boolean;
  
  constructor(private formbuilder:FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      mobile:['',Validators.required],
      salary:[''],
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
    if(this.formValue.valid){
    this.showAdd = true;
    this.showUpdate = false;
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.mobile = this.formValue.value.mobile;
    this.employeeModelObject.salary = this.formValue.value.salary;
    this.employeeModelObject.department = this.formValue.value.department;

    this.api.postEmployee(this.employeeModelObject).subscribe(res=>{
      
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
      confirm('Do you want to delete employee?');
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
    this.formValue.controls['salary'].setValue(row.salary);
    this.formValue.controls['department'].setValue(row.department);
    
  }
  updateEmployeeDetails(){
    if(this.formValue.valid){
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.mobile = this.formValue.value.mobile;
    this.employeeModelObject.salary = this.formValue.value.salary;
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
}