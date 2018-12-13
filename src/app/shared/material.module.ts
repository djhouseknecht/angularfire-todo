import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  exports: [
    MatToolbarModule,

  ],
  imports: [
    CommonModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
