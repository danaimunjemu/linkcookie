import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-r-header',
  templateUrl: './r-header.component.html',
  styleUrls: ['./r-header.component.css']
})
export class RHeaderComponent implements OnInit {
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
