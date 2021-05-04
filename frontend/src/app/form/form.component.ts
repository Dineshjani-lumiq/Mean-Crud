import { CommonModule } from '@angular/common';
import { ExchangeService } from './../exchange.service';
import { Component, ComponentFactoryResolver } from '@angular/core';
import { NgForm ,FormGroup,FormArray,FormControl,Validators,ReactiveFormsModule, FormControlName} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  {
phonenumber:any;
dateofbirth:any;
gender1:any;
gender:any;
marks:any[]=[];
address1:any;
name:any;
  constructor(private router:Router,private route: ActivatedRoute,private exchangeService: ExchangeService) {


   }

  ngOnInit() {
this.name=this.route.snapshot.queryParamMap.get('name');
this.dateofbirth=this.route.snapshot.queryParamMap.get('dateofbirth');
this.phonenumber=this.route.snapshot.queryParamMap.get('phonenumber');
this.gender1=this.route.snapshot.queryParamMap.get('gender');
  this.route.queryParamMap.subscribe(params => this.address1 = params.getAll('address'));

  this.route.queryParamMap.subscribe(params => this.marks = params.getAll('marks'));
console.log(this.marks)
console.log(this.address1);
console.log(this.name);
console.log(this.address1[0]);
console.log(this.phonenumber);
    
   for(var i=0;i<this.address1.length-1;i++){
this.addaddressField();
   }
   console.log(this.gender1);
	  
        this.userForm.patchValue({gender:this.gender1,dateofbirth:this.dateofbirth,name:this.name,phonenumber:this.phonenumber,dob:this.dateofbirth});
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
      
      address: new FormArray([


      new FormControl('',[Validators.required])
    ]),


Subjects: new FormArray([
new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)]),
new FormControl('',[Validators.required,Validators.min(0), Validators.max(100)])
]),


 dob:new FormControl('',[Validators.required])

    
  });


  onFormSubmit(): void {
    console.log(this.userForm.value);
    var mp={
      name:this.userForm?.get('name')?.value,
gender:this.userForm?.get('gender')?.value,
dateofbirth:this.userForm?.get('dob')?.value,
       address: this.userForm?.get('address')?.value,

phonenumber: this.userForm?.get('phonenumber')?.value,
marks:this.userForm?.get('Subjects')?.value
    }
   
    this.exchangeService.postEmployee(mp).subscribe(res => {
        
       console.log("data saved successfully")},

      
      err => {if(err.status==401){
         localStorage.removeItem('token');
                  this.router.navigate(['/signin']);

       }},
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
 


 date(e:any) {
      var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
      this.userForm.get('dob')?.setValue(convertDate, {
        onlyself: true
      })
    }







}
