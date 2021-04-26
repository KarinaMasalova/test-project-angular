import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleTableComponent } from './people-table/people-table.component';
import { SearchFiltersComponent } from './people-table/search-filters/search-filters.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from '../../common/components/loader/loader.module';
import { DialogModule } from './add-person-dialog-content/dialog.module';

@NgModule({
  declarations: [SearchFiltersComponent, PeopleTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    HttpClientModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    LoaderModule,
    DialogModule,
  ],
  exports: [PeopleTableComponent],
})
export class PeoplePageModule {}
