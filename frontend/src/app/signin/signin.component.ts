import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm ,FormGroup,FormArray,FormControl,Validators,ReactiveFormsModule} from '@angular/forms';
import { ExchangeService } from './../exchange.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
 constructor(private  router:Router,private exchangeService: ExchangeService) { }

 
  ngOnInit(): void {
  }
  hide=true;
  res1:any;
passwordPattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{10,}$";
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
   
    this.exchangeService.signinstudent(mp).subscribe(res=>{

      console.log("ram");
      console.log(res);
    console.log(typeof(res));
    if(res?.accesstoken){
    this.res1="";
      localStorage.setItem("token",res.accesstoken);
       this.router.navigate(['/']);
    }
    else{
      if(res?.error){
this.res1=res.error;

      }
      
    }
      
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
forsignup(){
        this.router.navigate(['/signup']);

  }

}
