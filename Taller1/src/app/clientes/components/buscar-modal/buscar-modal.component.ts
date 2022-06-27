import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ClientService } from '../../client.service';
import { Cliente } from '../../interfaces/Cliente';

@Component({
  selector: 'app-client-modal',
  templateUrl: './buscar-modal.component.html',
  styles: [],
})
export class BuscarModalComponent implements OnInit {

  
  constructor(
    private dialogRef: MatDialogRef<BuscarModalComponent>,
    private fb: FormBuilder,
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
  ) {}


  ngOnInit(): void {}
  
  submit() {
   
      
    this.dialogRef.close();
    
  }
  onConfirm(): void {
    
    this.dialogRef.close(false);
  }

}
