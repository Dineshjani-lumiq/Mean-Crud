import { Component, OnInit } from '@angular/core';
import { ExchangeService } from './../exchange.service';
import { Student } from './../studentmodel';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import {MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
dataSource: Student[]=[];
phonenumber:any;
student:any;
  constructor(private router: Router,private exchangeservice:ExchangeService) { }

  ngOnInit(): void {
    

this.refreshList();
  }
  refreshList() {
    
      this.exchangeservice.getstudentList().subscribe(
     
        lists => this.dataSource = lists,
       err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
          
    );
    console.log(this.dataSource);


   
  }
  
  ondelete(row:any){
if(confirm("Are you sure to delete ")) {
   
  
console.log(row);
this.phonenumber=row.phonenumber;
this.exchangeservice?.deletestudent(this.phonenumber).subscribe(
        
res=>this.student=res,  

        
      );
      this.refreshList();

  }
  }

  onupdate(row:any){
       
       
    console.log(row.marks);
    this.router.navigate(['/'], { queryParams: { name: row.name, phonenumber: row.phonenumber, address: row.address, dateofbirth: row.dateofbirth, marks: row.marks } });
  }
}
