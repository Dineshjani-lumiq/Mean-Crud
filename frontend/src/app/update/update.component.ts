import { Component, OnInit } from '@angular/core';
import { ExchangeService } from './../exchange.service';

import { NgForm ,FormGroup,FormArray,FormControl,Validators,ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

 constructor(private exchangeService: ExchangeService) { }
 student:any;
  subjectlist=["History","Science","Math","Hindi","English"];
  formSubmitted = false;
   isValidFormSubmitted = false;
unamePattern = "^[ a-zA-Z\-\']+$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";

  userForm = new FormGroup({
  phonenumber: new FormControl('', [Validators.pattern(this.mobnumPattern)])
    
  });
  onFormSubmit(): void {
    console.log(this.userForm.value);
    
 
    
var phonenumber=this.userForm?.get('phonenumber')?.value;


    this.exchangeService.findstudent(phonenumber).subscribe(
       
      res=>this.student=res,  
err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
        
      );
      console.log(this.student);
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

get address(): FormArray { 
    return this.userForm.get('address') as FormArray; 
  }
  get Subjects():FormArray{
return this.userForm.get('Subjects') as FormArray;
  }

  addaddressField() { 
    this.address.push(new FormControl('')); 
  }
  deleteaddressField(index: number) {
    if(this.address.length>1){
    this.address.removeAt(index);}

  }
  

}
