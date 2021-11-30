import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) { }

  @Output() toggleSideNav = new EventEmitter();
  @Output() toggleTheme = new EventEmitter();

  ngOnInit(): void {
  }

  openAddContactDialog(): void {
    let dialogRef = this.dialog.open(NewContactDialogComponent, {
      width: "450px",
      height:"600px",
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("dailog closed successfully,", result);
      if(result) {
        this.openSnackBar("Contact Added","Navigate").onAction().subscribe(() => {
          this.router.navigate(['/contactmanager/',result.id]);
        });
      }
    })
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }


}
