import { Component, OnInit } from '@angular/core';
import { ExchangeService } from './../exchange.service';
import { Student } from './../studentmodel';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import {MatTableModule} from '@angular/material/table';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
dataSource: Student[]=[];

  constructor(private exchangeservice:ExchangeService) { }

  ngOnInit(): void {
this.refreshList();
  }
  refreshList() {
    
      this.exchangeservice.getstudentList().subscribe(
     
        lists => this.dataSource = lists
          
    );
    console.log(this.dataSource);
   
  }

}
