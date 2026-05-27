import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Navbar } from '../../../shared/component/navbar/navbar';
import { Footer } from '../../../shared/component/footer/footer';
import { SupabaseService } from '../../../shared/services/supabase-service';

class GuestbookEntry {
  id?: number;
  name!: string;
  message!: string;
  photoUrl?: string;
  audioUrl?: string;
}

@Component({
  selector: 'app-livre-dor',
  standalone: true,
  imports: [CommonModule, Navbar, Footer],
  templateUrl: './livre-dor.html',
  styleUrl: './livre-dor.css'
})
export class LivreDor implements OnInit {
  entries: GuestbookEntry[] = [];
  showThankYou: boolean = false;
  isLoading: boolean = true;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    // On vérifie si l'utilisateur vient d'enregistrer un message pour afficher le remerciement
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['showThankYou']) {
      this.showThankYou = true;
    }
  }

  async ngOnInit() {
    try {
      this.entries = await this.supabaseService.getGuestbookEntries();
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges(); // Force Angular à mettre à jour l'interface
    }
  }
}
