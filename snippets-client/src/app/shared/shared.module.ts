import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatChipsModule,
  MatDialogModule,
  MatProgressBarModule,
  MatSelectModule,
  MatIconModule,
  MatAutocompleteModule,
  MatMenuModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';

@NgModule({
  declarations: [NavigationBarComponent, LoginModalComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NavigationBarComponent
  ],
  entryComponents: [LoginModalComponent]
})
export class SharedModule {}
