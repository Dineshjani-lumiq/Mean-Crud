import { Router } from '@angular/router';
import { ExchangeService } from './../exchange.service';
import { Component, OnInit } from '@angular/core';
import { NgForm ,FormGroup,FormArray,FormControl,Validators,ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 constructor(private router:Router,private exchangeService: ExchangeService) { }

  ngOnInit(): void {
  }
  message="";
  smessage="";
  passwordPattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$";
;
  /* at least one l.c and 1 u.c and only 1 s.c*/
  unamePattern = "^[ a-zA-Z\-\’]+$";
  formSubmitted = false;
   isValidFormSubmitted = false;
  userForm = new FormGroup({
    Username: new FormControl('', [Validators.required,Validators.pattern(this.unamePattern),Validators.minLength(3)]),
    password:new FormControl('',[Validators.required,Validators.pattern(this.passwordPattern),Validators.minLength(10),Validators.maxLength(20)] )

  });
  onFormSubmit(): void {
    console.log(this.userForm.value);
    var mp={
      Username:this.userForm?.get('Username')?.value,
      Password:this.userForm?.get('password')?.value
    }
   
    this.exchangeService.signupstudent(mp).subscribe(res=>{
         if(res.error){
    this.message=res.error;}
    if(res?.message){
      this.smessage=res.message;
    }
      console.log(res);
    })
   
    
    this.formSubmitted = true;
     this.isValidFormSubmitted = true;
    if(this.userForm.valid) {
	
	this.resetForm();
    } else {
	this.formSubmitted = false;
    }
  }
  resetForm() { 
    this.userForm.reset();
  }
  forsignin(){
        this.router.navigate(['/signin']);

  }

}
