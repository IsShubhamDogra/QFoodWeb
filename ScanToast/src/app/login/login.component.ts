import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder,ReactiveFormsModule, FormControl} from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    
    if (this.adminService.authenticate(email, password)) {
      this.toastr.success('Login successful!', 'Success');
      this.router.navigateByUrl('/admin-end');

    } else {
      this.toastr.error('login Failed!');
      this.errorMessage = 'Invalid email or password';
    }
  }

}
