import { Student } from './../studentmodel';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ExchangeService } from './../exchange.service';

import { NgForm ,FormGroup,FormArray,FormControl,Validators,ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

 constructor(private router: Router,private exchangeService: ExchangeService) { }
   
message:any;
 student:Student[]=[];
 name:any;
phonenumber:any;
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
       
      
val => {this.student=val
	
	if(this.student.length==0){
    /*
        this.message="Phonenumber is not persent in database";
        */
       console.log(this.phonenumber);
         this.router.navigate(['/'], { queryParams: { phonenumber:phonenumber} });

      }

else{
          this.router.navigate(['/'], { queryParams: { name: this.student[0].name, phonenumber:this.student[0].phonenumber, address: this.student[0].address, dateofbirth: this.student[0].dateofbirth, marks: this.student[0].marks,gender:this.student[0].gender} });}


},
err => {if(err.status==401){
         localStorage.removeItem('token');
                  this.router.navigate(['/signin']);

       }
       console.log(localStorage.getItem('token'));
      }
       
      );
      console.log(this.student);
      console.log("ram");
      console.log(this.student.length);
     /* if(this.student.length==0){
        this.message="Phonenumber is not persent in database";
      }
      else{
          this.router.navigate(['/'], { queryParams: { name: this.student[0].name, phonenumber:this.student[0].phonenumber, address: this.student[0].address, dateofbirth: this.student[0].dateofbirth, marks: this.student[0].marks } });}*/

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
