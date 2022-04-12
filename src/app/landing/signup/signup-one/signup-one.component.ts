import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../can-deactivate-guard.service';

@Component({
  selector: 'app-signup-one',
  templateUrl: './signup-one.component.html',
  styleUrls: ['./signup-one.component.css']
})
export class SignupOneComponent implements OnInit, CanComponentDeactivate {

  changesSaved = false;

  constructor( private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onNextStep() {
    this.changesSaved = true;
    this.router.navigate(['../signup-two'], {relativeTo: this.route});
  }

  canDeactivate():  Observable<boolean> | Promise<boolean> | boolean {
    if (!this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  };

}
