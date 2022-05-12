import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  keepNoteForm: FormGroup;
  panelOpenState = false;
  notesData: any;

  constructor(private fb: FormBuilder, private notesService: NotesService,
    private snackbar: MatSnackBar) {
    this.keepNoteForm = this.fb.group({
      title: [''],
      text: ['']
    })
  }

  ngOnInit(): void {
    this.notesService.getNotes().subscribe((response: any) => {
      console.log(response);
      this.notesData = response;
    })
  }

    formSubmit(){
      let title = this.keepNoteForm.value.title;
      let text = this.keepNoteForm.value.text;
      let keepNoteObject ={
        "id": "",
        "title": title,
        "text": text
  
      }
      this.notesService.addNote(keepNoteObject).subscribe((response: any) =>{
        if(response != {}){
          this.notesData.push(response);
        }else{
          setTimeout(()=>{this.snackbar.open("No data found", "CLOSE")}); 
        }
      }, error => {
        setTimeout(()=>{this.snackbar.open("Server Error","CLOSE")});
      })
      this.resetForm();
    }
    resetForm(){
      this.keepNoteForm.reset();
    }

}
