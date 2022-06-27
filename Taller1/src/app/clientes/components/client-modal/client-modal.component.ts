import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ClientService } from '../../client.service';
import { Cliente } from '../../interfaces/Cliente';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.css'],
})
export class ClientModalComponent implements OnInit {
  isAdding = this.data === null;

  clientForm = this.fb.group({
    cedula: [
      this.data?.cedula || '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    nombres: [this.data?.nombres || '', [Validators.required]],
    apellidos: [this.data?.apellidos || '', [Validators.required]],
    direccion: [this.data?.direccion || '', [Validators.required]],
    edad: [
      this.data?.edad || '',
      [Validators.required, Validators.min(0), Validators.max(120)],
    ],
  });

  constructor(
    private dialogRef: MatDialogRef<ClientModalComponent>,
    private fb: FormBuilder,
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
  ) {}

  ngOnInit(): void {}

  isInvalid(field: keyof typeof this.clientForm.controls) {
    return (
      this.clientForm.controls[field].errors &&
      this.clientForm.controls[field].touched
    );
  }

  getErrorMessage(field: keyof typeof this.clientForm.controls): string {
    const errors = this.clientForm.get(field)?.errors;

    if (errors?.['required']) {
      return `El campo ${field} es requerido`;
    } else if (errors?.['email']) {
      return `El campo ${field} no tiene un formato válido`;
    } else if (errors?.['minlength']) {
      return `El campo ${field} debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
    } else if (errors?.['maxlength']) {
      return `El campo ${field} debe tener como máximo ${errors['maxlength'].requiredLength} caracteres`;
    } else if (errors?.['min']) {
      return `El campo ${field} debe tener al menos ${errors['min'].min} años`;
    } else if (errors?.['max']) {
      return `El campo ${field} debe tener como máximo ${errors['max'].max} años`;
    } else if (errors?.['pattern']) {
      return `El campo ${field} debe contener únicamente números`;
    }

    return '';
  }

  submit() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const { cedula, nombres, apellidos, direccion, edad } =
      this.clientForm.value;

    const cliente: Cliente = {
      cedula: cedula!,
      nombres: nombres!,
      apellidos: apellidos!,
      direccion: direccion!,
      edad: Number(edad!),
    };

    if (this.isAdding) {
      this.clientService.addClient(cliente);
    } else {
      this.clientService.updateClient(cliente);
    }

    this.dialogRef.close();
  }
}
