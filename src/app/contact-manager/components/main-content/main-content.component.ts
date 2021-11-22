import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  user!: User | undefined;

  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      const id = params['id'];
      this.user = undefined; //to get spinner effect
      //If length not equal to zero populate main content again on refresh
      this.userService.users.subscribe( users => {
        if(users.length == 0) return;

        //Just to see the spinner effect on load.
        setTimeout( () => {
          this.user = this.userService.userByid(id);
        },500);

      });

    })
  }

}
