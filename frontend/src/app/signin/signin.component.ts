import { Component, OnInit } from '@angular/core';
import { NgForm ,FormGroup,FormArray,FormControl,Validators,ReactiveFormsModule} from '@angular/forms';
import { ExchangeService } from './../exchange.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
 constructor(private exchangeService: ExchangeService) { }

 
  ngOnInit(): void {
  }
  res:any;
passwordPattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$";
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
    this.res=res;
    if(res?.accesstoken){
      localStorage.setItem("token",res.accesstoken);
    }
      console.log(localStorage.getItem("token"))
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


}
