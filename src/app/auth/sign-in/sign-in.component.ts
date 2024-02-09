import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data/data.service';
import { ToastService } from 'src/app/services/toast';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  showpass: boolean = false;
  loginForm: UntypedFormGroup = this.fb.group({})
  contactAdmin: UntypedFormGroup;
  submitted: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private fb: UntypedFormBuilder, private authService: AuthService, private modalService: NgbModal, private service: DataService, private toast: ToastService) {
    if (authService.loginUser) {
      this.router.navigate(["admin"])
    }
  }
  eyebtnclicked() {
    this.showpass = !this.showpass;
  }
  // On Forgotpassword link click
  onForgotpassword() {
    this.router.navigate(['forgot-password'], {
      relativeTo: this.route.parent,
    });
  }

  // On Signup link click
  onSignup() {
    this.router.navigate(['sign-up'], { relativeTo: this.route.parent });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });


    const remember = JSON.parse(localStorage.getItem('rem'))
    if (remember?.remember) {
      this.loginForm.setValue(remember)
    }



  }

  openModal(content) {
    this.contactForm_init();
    this.modalService.open(content)
  }


  contactForm_init() {
    this.contactAdmin = new UntypedFormGroup({
      'subject': new UntypedFormControl(''),
      'message': new UntypedFormControl('')
    })
  }

  contactForm_onsubmit() {
    if (this.contactAdmin.invalid) return;
    const req = {
      "subject": this.contactAdmin.value.subject,
      "msg": this.contactAdmin.value.message
    }

    this.contactAdmin.reset();
    this.service.callAPI('post', req, 'admin/contact').subscribe(response=>{
      this.toast.toast(response.message)
      this.modalService.dismissAll();
    })

  }

  get form() {
    return this.loginForm.controls;
  }

  submit() {
    this.submitted = true;
    if (!this.loginForm.invalid) {
      this.authService.login(this.loginForm.value).subscribe((response) => {
        if (response.data && response.token) {
          if(response.data.role==='Admin'){
            this.router.navigate(["admin"])
          } else if(response.data.role==='Client'||response.data.role==='Staff')
           this.router.navigate(["client/inventory/items/add/ai"]);
        }
      })
    }
  }

}
