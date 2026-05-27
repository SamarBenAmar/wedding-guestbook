import { Injectable } from '@angular/core';

export interface GuestbookState {
  name: string;
  message: string;
  photoFile: File | null;
  audioBlob: Blob | null;
}

@Injectable({
  providedIn: 'root',
})
export class GuestbookStateService {
  data: GuestbookState = {
    name: '',
    message: '',
    photoFile: null,
    audioBlob: null
  };

  clear() {
    this.data = { name: '', message: '', photoFile: null, audioBlob: null };
  }
}
