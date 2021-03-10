import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule,  } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

const modules = [
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
