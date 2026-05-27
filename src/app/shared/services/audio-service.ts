import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AudioService {

  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async startRecording(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    this.audioChunks = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      // On demande au navigateur d'émettre des chunks toutes les 1000 ms (1 seconde).
      // Cela évite que l'appareil perde les données s'il manque de mémoire à la fin.
      this.mediaRecorder.start(1000);
    } catch (err) {
      console.error("Erreur d'accès au microphone :", err);
      throw err;
    }
  }

  stopRecording(): Promise<File> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) return reject('Aucun enregistrement en cours');

      this.mediaRecorder.onstop = () => {
        // Utiliser le type MIME réel généré par le navigateur (Essentiel pour Safari / iOS !)
        const mimeType = this.mediaRecorder?.mimeType || 'audio/webm';

        // Déduire la bonne extension et créer un objet File au lieu d'un simple Blob
        const extension = mimeType.includes('mp4') ? 'mp4' : 'webm';
        const audioFile = new File(this.audioChunks, `enregistrement.${extension}`, { type: mimeType });

        // Éteindre le microphone proprement pour libérer les ressources système
        this.mediaRecorder?.stream.getTracks().forEach(track => track.stop());

        resolve(audioFile);
      };
      this.mediaRecorder.stop();
    });
  }
}
