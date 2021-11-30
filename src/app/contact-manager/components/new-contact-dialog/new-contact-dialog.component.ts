import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>,
              private userService: UserService) { }

  avatars = [
    'svg-1',
    'svg-2',
    'svg-3',
    'svg-4',
  ];
  user!: User;

  nameFormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.user = new User();
  }

  save(): void {
    if(this.nameFormControl.valid) {
      this.user.name = this.nameFormControl.value;

      this.userService.addUser(this.user).then( (user:User) => {
        //If user gets accepted by service successfully
        this.dialogRef.close(user);
      },
      (user) => {
        //If service rejected the addition
        console.log('user rejected:', user);
      })

    }

  }

  dismiss(): void {
    this.dialogRef.close(null);
  }

}
