import { CommonModule } from '@angular/common';
import { ExchangeService } from './../exchange.service';
import { Component, ComponentFactoryResolver } from '@angular/core';
import { NgForm ,FormGroup,FormArray,FormControl,Validators,ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  {
phonenumber:any;
dateofbirth:any;
gender:any;
marks:any[]=[];
address1:any;
name:any;
  constructor(private route: ActivatedRoute,private exchangeService: ExchangeService) {


   }

  ngOnInit() {
this.name=this.route.snapshot.queryParamMap.get('name');
this.dateofbirth=this.route.snapshot.queryParamMap.get('dateofbirth');
this.phonenumber=this.route.snapshot.queryParamMap.get('phonenumber');
this.gender=this.route.snapshot.queryParamMap.get('gender');
  this.route.queryParamMap.subscribe(params => this.address1 = params.getAll('address'));

  this.route.queryParamMap.subscribe(params => this.marks = params.getAll('marks'));
console.log(this.marks)
console.log(this.address1);
console.log(this.name);
console.log(this.address1[0]);

    
   for(var i=0;i<this.address1.length-1;i++){
this.addaddressField();
   }

   this.address.patchValue(this.address1);
this.Subjects.patchValue(this.marks);
}
     



  subjectlist=["History","Science","Math","Hindi","English"];
  formSubmitted = false;
   isValidFormSubmitted = false;
unamePattern = "^[ a-zA-Z\-\’]+$";
  
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
   
    this.exchangeService.postEmployee(mp).subscribe(res => 
        
       console.log("data saved successfully"),

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
