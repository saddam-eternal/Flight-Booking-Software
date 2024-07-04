import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  providers:[ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  profileForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,public apiService:ApiService) {
  }
  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      contact_number: [null],
      address: [''],
      city: [''],
      state: [''],
      zipcode: [null],
      country: [''],
      is_deleted: [false],
    });

  }
  title = 'form';

  submit() {
    console.log('profileForm', this.profileForm);
   let id =  this.apiService.getData(this.profileForm.value);
  }
}
