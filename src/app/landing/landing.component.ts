import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  formData: any = {
    email: "", Password: ""
  }
  constructor(private api: ApiService, private router: Router, private toastr:ToastrService) { }

  onSubmit(data: any) {
    console.log("submit")
    console.log(data)
    console.log(this.formData)
    this.api.userlogin().subscribe({
      next: (res: any) => {
        if (res.email == this.formData.email && res.password == this.formData.password) {
          this.toastr.success("Login Successfull!!")
          sessionStorage.setItem('username',res.username)
          this.router.navigateByUrl('/dash')
        }
        else {
        this.toastr.error("Login Failed")
        }
      },
      error: (err: any) => {
        console.log(err)
      }
    })



  }

}
