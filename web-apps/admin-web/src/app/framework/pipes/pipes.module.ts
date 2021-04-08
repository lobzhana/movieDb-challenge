import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToImgSrc } from './toImageSrc/to-img-src.pipe';

const declarations = [ToImgSrc];

@NgModule({
  declarations: [...declarations],
  imports: [CommonModule],
  exports: [...declarations],
})
export class PipesModule {}
