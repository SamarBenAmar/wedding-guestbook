import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  // Méthode pour uploader un fichier (photo ou audio)
  async uploadFile(file: File | Blob, folder: 'photos' | 'audios', fileName: string): Promise<string> {
    const filePath = `${folder}/${Date.now()}_${fileName}`;

    const { data, error } = await this.supabase.storage.from('guest_book').upload(filePath, file);
    if (error) throw error;

    const { data: { publicUrl } } = this.supabase.storage.from('guest_book').getPublicUrl(filePath);
    return publicUrl;
  }

  // Méthode pour sauvegarder l'entrée du livre d'or
  async saveGuestbookEntry(data: { name: string; message: string; photoUrl?: string; audioUrl?: string }) {
    try {
      const { data: result, error } = await this.supabase
        .from('Guests')
        .insert([data])
        .select();

      if (error) throw error;
      return result[0].id;
    } catch (e) {
      console.error("Erreur lors de la sauvegarde dans Supabase: ", e);
      throw e;
    }
  }
}
