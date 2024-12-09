import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  status:boolean=false
  profilepicture:any="https://img.freepik.com/free-vector/illustration-customer-service-concept_53876-5883.jpg?t=st=1732776396~exp=1732779996~hmac=0ad1f7296139f30174ba22bd20cd4c8bca3226e26b4362a90d09b9a8cb954e67&w=740"
  adminData:any={}


  constructor(private api:ApiService , private toast:ToastrService ,private router:Router){}
ngOnInit(): void {
  this.api.getAdmin().subscribe({
    next:(res:any)=>{
      // console.log(res)
      this.adminData=res
if(res.profile){
  this.profilepicture=res.profile
}
}
  })
  
}
getfile(e:any){
  const file=e.target.files[0]
  const fr=new FileReader()
  fr.readAsDataURL(file)
  fr.onload=(event:any)=>{
    console.log(event.target.result)
    this.adminData.profile=event.target.result
    this.profilepicture=event.target.result
  }
}
handleUpdate(){
  console.log(this.adminData)
  this.api.updateAdmin(this.adminData).subscribe({
    next:(res:any)=>{
      console.log(res)
      this.toast.success("Admin Profile Updated!!")
      this.router.navigateByUrl('')
    },
    error:(err:any)=>{
      console.log(err)
      this.toast.error("Admin Profile Updation Failed!!")
    }
  })
}

  editButton(){
    this.status=true
    }
    cancelButtton(){
      this.status=false
    }
}

