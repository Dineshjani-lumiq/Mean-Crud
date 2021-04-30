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
	name: new FormControl('', [Validators.required,Validators.pattern(this.unamePattern),Validators.minLength(3)] ),
  phonenumber: new FormControl('', [Validators.pattern(this.mobnumPattern)]),
    	gender: new FormControl(''),
      dateofbirth:new FormControl(''),
      address: new FormArray([


      new FormControl('')
    ]),
Subjects: new FormArray([
new FormControl(''),
new FormControl(''),
new FormControl(''),
new FormControl(''),
new FormControl('')
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
   
    this.exchangeService.updatestudent(mp).subscribe(
       
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
