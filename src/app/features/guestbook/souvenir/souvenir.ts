import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../shared/component/navbar/navbar';
import { Footer } from '../../../shared/component/footer/footer';
import { AudioService } from '../../../shared/services/audio-service';
import { SupabaseService } from '../../../shared/services/supabase-service';

@Component({
  selector: 'app-souvenir',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Navbar,
    Footer
  ],
  templateUrl: './souvenir.html',
  styleUrl: './souvenir.css',
})
export class Souvenir {

  selectedFileName = '';
  isRecording: boolean = false;
  isSubmitting: boolean = false;

  souvenirForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private audioService: AudioService,
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.souvenirForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      message: ['', Validators.required],
      photo: [null as File | null],
      audio: [null as File | null]
    });
  }

  get audio() {
    return this.souvenirForm.get('audio')?.value;
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

  async toggleRecording() {
    if (this.isRecording) {
      try {
        const audioFile = await this.audioService.stopRecording();
        this.souvenirForm.patchValue({ audio: audioFile });
        this.isRecording = false;
        this.cdr.detectChanges();
      } catch (err) {
        console.error('Erreur lors de l\'arrêt de l\'enregistrement', err);
        this.isRecording = false;
        this.cdr.detectChanges();
      }
    } else {
      try {
        await this.audioService.startRecording();
        this.isRecording = true;
        this.souvenirForm.patchValue({ audio: null });
        this.cdr.detectChanges();
      } catch (err) {
        console.error('Erreur lors du démarrage de l\'enregistrement', err);
      }
    }
  }

  async submit() {
    if (this.souvenirForm.invalid) {
      this.souvenirForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formValue = this.souvenirForm.value;

    try {
      let photoUrl = undefined;
      let audioUrl = undefined;

      if (formValue.photo) {
        photoUrl = await this.supabaseService.uploadFile(formValue.photo, 'photos', formValue.photo.name);
      }

      if (formValue.audio) {
        audioUrl = await this.supabaseService.uploadFile(formValue.audio, 'audios', formValue.audio.name);
      }

      await this.supabaseService.saveGuestbookEntry({
        name: formValue.name,
        message: formValue.message,
        photoUrl: photoUrl,
        audioUrl: audioUrl
      });

      // On redirige vers le composant LivreDor en passant une information dans l'état de la navigation
      this.router.navigate(['/guestbook/livre-dor'], { state: { showThankYou: true } });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      alert('Oups, une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
    } finally {
      this.isSubmitting = false;
    }
  }
}
