import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { map, Observable } from 'rxjs';
import { Diario } from 'src/app/core/models/diario';
import { DiariosService } from 'src/app/core/services/diarios/diarios.service';
import { DiarioAddComponent } from '../diario-add/diario-add.component';
import { DiarioEditComponent } from '../diario-edit/diario-edit.component';

@Component({
  selector: 'app-diario-list',
  templateUrl: './diario-list.component.html',
  styleUrls: ['./diario-list.component.scss'],
})
export class DiarioListComponent implements OnInit {
  allDiarios$?: Observable<Diario[]>;
  meusDiarios$?: Observable<Diario[]>;
  cardsDiarios$?: Observable<Diario[]>;

  



  constructor(
    private dialog: MatDialog,
    private diariosService: DiariosService,
    private toast: HotToastService,
    private breakponitObserver: BreakpointObserver
  ) {} // Abrir dialogs baseado em componentes existentes

  onClickAdd() {
    // DiarioAddComponent será mostrado dentro do dialog
    const ref = this.dialog.open(DiarioAddComponent, { maxWidth: '512px' });
    // Acontece logo após o fechamento do dialog
    ref.afterClosed().subscribe({
      next: (result) => {
        // Evento que ocorre ao fechar dialog
        if (result) {
          this.diariosService
            .addDiario(result.diario, result.imagem)
            .pipe(
              this.toast.observe({
                loading: 'Adicionando...',
                error: 'Ocorreu um erro',
                success: 'Diário adicionado',
              })
            )
            .subscribe();
        }
      },
    });
  }

  onClickEdit(diario: Diario) {
    // Criar referência p/ dialog
    const ref = this.dialog.open(DiarioEditComponent, {
      maxWidth: '512px',
      data: { ...diario },
    });
    ref.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.diariosService
            .editDiario(result.diario, result.imagem)
            .pipe(
              this.toast.observe({
                loading: 'Atualizando...',
                error: 'Ocorreu um erro',
                success: 'Diário atualizado',
              })
            )
            .subscribe();
        }
      },
    });
  }

  onClickDelete(diario: Diario) {
    const canDelete = confirm('Deseja mesmo deletar?');
    if (canDelete) {
      this.diariosService
        .deleteDiario(diario)
        .pipe(this.toast.observe({ success: 'Diário apagado!' }))
        .subscribe();
    }
  }

  ngOnInit(): void {
    this.allDiarios$ = this.diariosService.getTodosDiarios();
    this.meusDiarios$ = this.diariosService.getDiariosUsuario();

    this.breakponitObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            { username :  '', cols: 1, rows: 1,  },
            // console.log(matches)
          ]

        }
  
        return [
          { title: '' , cols: 1, rows: 1, }
        ]
      })
    ).subscribe();
  }
  activateHandsetLayout() {
    throw new Error('Method not implemented.');
  }

}
