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

  constructor(private exchangeService: ExchangeService) { }

  userForm = new FormGroup({
  phonenumber: new FormControl('', [Validators.pattern(this.mobnumPattern)])

  })
   

}