import { Component } from '@angular/core';

import { ExchangeService } from './../exchange.service';
import { NgForm ,FormGroup,FormArray,FormControl,Validators,ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  
mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
formSubmitted = false;
   isValidFormSubmitted = false;
  constructor(private exchangeService: ExchangeService) { }
  student:any;

  userForm = new FormGroup({
  phonenumber: new FormControl('', [Validators.pattern(this.mobnumPattern)])

  })

   onFormSubmit(): void {
    console.log(this.userForm.value);
   
var phonenumber=this.userForm?.get('phonenumber')?.value;
    
    
   
    this.exchangeService?.deletestudent(phonenumber).subscribe(
        
res=>this.student=res,  
err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')  
        
      );
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