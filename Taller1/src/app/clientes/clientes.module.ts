import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { MaterialModule } from '../material/material.module';
import { ClientModalComponent } from './components/client-modal/client-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [ClientListComponent, ClientModalComponent, ConfirmModalComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class ClientesModule {}
