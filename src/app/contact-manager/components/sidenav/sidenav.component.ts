import { state } from '@angular/animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT = 720

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public isScreenSmall: boolean = false;
  public users!: Observable<User[]>;
  //to access sidenav drawer component to close on select.
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  constructor(private breakpointObserver: BreakpointObserver,
              private userService: UserService,
              private route: Router) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([ `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)` ])
      .subscribe((state:BreakpointState) => {
        this.isScreenSmall = state.matches
        console.log(this.isScreenSmall);
      })

     //subscribe to user service and populate data.
     this.users = this.userService.users;
     this.userService.loadAll();
     this.users.subscribe(users => {
       //redirecting to first user when data populates.
       if(users.length > 0) {
         this.route.navigate(['/contactmanager/',users[0].id]);
       }
     })

     this.route.events.subscribe( ()=> {
       //todo sidenav close
       if(this.isScreenSmall) {
        this.drawer.close();
       }
     })
  }

}
