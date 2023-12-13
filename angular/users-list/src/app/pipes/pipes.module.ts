import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstnamePipe } from './firstname.pipe';
import { SurnamePipe } from './surname.pipe';
import { SortDirectionPipe } from './sort-direction.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FirstnamePipe, SurnamePipe, SortDirectionPipe],
  exports: [FirstnamePipe, SurnamePipe, SortDirectionPipe],
})
export class PipesModule {}
