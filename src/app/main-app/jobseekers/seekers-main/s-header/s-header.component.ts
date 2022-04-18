import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-s-header',
  templateUrl: './s-header.component.html',
  styleUrls: ['./s-header.component.css']
})
export class SHeaderComponent implements OnInit {

  user: User;

  constructor(private usersService: UsersService) { 

    this.user = usersService.User;
    // console.log(this.user);
  }

  ngOnInit(): void {
  }

  // user: User;

  onLogout() {
    this.usersService.logOut();
  }

}
