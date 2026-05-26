import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-souvenir',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './souvenir.html',
  styleUrl: './souvenir.css',
})
export class Souvenir {

  selectedFileName = '';

  souvenirForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.souvenirForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      message: ['', Validators.required],
      photo: [null as File | null]
    });
  }



  onFileSelected(event: Event) {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      const file = input.files[0];

      this.selectedFileName = file.name;

      this.souvenirForm.patchValue({
        photo: file
      });
    }
  }

  submit() {

    if (this.souvenirForm.invalid) {
      this.souvenirForm.markAllAsTouched();
      return;
    }

    console.log(this.souvenirForm.value);
  }
}
