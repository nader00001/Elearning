import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loggedUser = '';
  currRole = '';
  title = '';
  user:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _router: Router,private userService:UserService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data)=>{console.log(data)
        this.user=data.find((el:any)=>el.email==this.loggedUser)
      }
      
    )
    this.loggedUser = JSON.stringify(
      sessionStorage.getItem('loggedUser') || '{}'
    );
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE') || '{}');
    this.currRole = this.currRole.replace(/"/g, '');

    if (this.loggedUser === 'admin@gmail.com') {
      this.title = 'Admin Dashboard';
    } else if (this.currRole === 'professor') {
      this.title = '';
    } else if (this.currRole === 'user') {
      this.title = '';
    }
  }

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

  navigateHome() {
    if (this.loggedUser === 'admin@gmail.com') {
      this._router.navigate(['/admindashboard']);
    } else if (this.currRole === 'professor') {
      this._router.navigate(['/professordashboard']);
    } else if (this.currRole === 'user') {
      this._router.navigate(['/userdashboard']);
    }
  }

  contacterAdmin() {
    if (this.loggedUser === 'admin@gmail.com') {
      this._router.navigate(['/conversation/admin']);
    } else if (this.currRole === 'professor') {
      this._router.navigate(['/conversation/',this.user.userid]);
    } else if (this.currRole === 'user') {
      console.log(this.loggedUser)
      this._router.navigate(['/conversation/',this.user.userid]);
    }
  }
}
