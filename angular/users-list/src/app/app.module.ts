import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { TableComponent } from './components/table/table.component';
import { usersReducer } from './reducers/users.reducer';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [AppComponent, TableComponent, SearchBoxComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    PipesModule,
    StoreModule.forRoot(
      {
        users: usersReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictStateSerializability: false,
          strictActionImmutability: false,
          strictActionSerializability: false,
        },
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
