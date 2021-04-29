import { CommonModule } from '@angular/common';
import { ExchangeService } from './../exchange.service';
import { Component } from '@angular/core';
import { NgForm ,FormGroup,FormArray,FormControl,Validators,ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  {

  constructor(private exchangeService: ExchangeService) { }
  subjectlist=["History","Science","Math","Hindi","English"];
  formSubmitted = false;
   isValidFormSubmitted = false;
unamePattern = "^[ a-zA-Z\-\']+$";
  
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";

  userForm = new FormGroup({
	name: new FormControl('', [Validators.required,Validators.pattern(this.unamePattern),Validators.minLength(3)] ),
  phonenumber: new FormControl('', [Validators.pattern(this.mobnumPattern)]),
    	gender: new FormControl('',[Validators.required]),
      dateofbirth:new FormControl('',[Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
      address: new FormArray([


      new FormControl('',[Validators.required])
    ]),
Subjects: new FormArray([
new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)])
])
,

    
  });
  onFormSubmit(): void {
    console.log(this.userForm.value);
    var mp={
      name:this.userForm?.get('name')?.value,
gender:this.userForm?.get('gender')?.value,
dateofbirth:this.userForm?.get('dateofbirth')?.value,
       address: this.userForm?.get('address')?.value,

phonenumber: this.userForm?.get('phonenumber')?.value,
marks:this.userForm?.get('Subjects')?.value
    }
   
    this.exchangeService.postEmployee(mp).subscribe((res) => {
        
       console.log("data saved successfully");
      
        
      });
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
    this.address.push(new FormControl('',[Validators.required])); 
  }
  deleteaddressField(index: number) {
    if(this.address.length>1){
    this.address.removeAt(index);}

  }
  

}
