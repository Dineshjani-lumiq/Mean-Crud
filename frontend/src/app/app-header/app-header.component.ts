import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
logout(){
  console.log("logout");
    localStorage.removeItem('token');
         this.router.navigate(['/signin']);
}
}
