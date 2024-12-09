import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editemp',
  templateUrl: './editemp.component.html',
  styleUrl: './editemp.component.css'
})
export class EditempComponent {
  eid:any=""
  employee:any={
    id:"",name:"",phone:"",department:""
  }
  constructor (private ac:ActivatedRoute , private api:ApiService ,private toast:ToastrService,private router:Router){
    this.ac.params.subscribe({
next:(res:any)=>{
  this.eid=res.id
  console.log(this.eid)
  this.api.getEmployees(this.eid).subscribe({
    next:(res:any)=>{
      this.employee=res
      console.log(this.employee)
    },
    error:(err:any)=>{
      console.log(err)
    }
  })
}
    })
  }

  handleEdit(){
    console.log(this.employee)
    this.api.editEmployee(this.eid,this.employee).subscribe({
      next:(res:any)=>{
        this.toast.success("Employee Details Updated!!")
     this.router.navigateByUrl('/empmng')
      },
      error:(err:any)=>{
          console.log(err)
          this.toast.error("Something Went Wrong!!")
      }
    })
  }

}
