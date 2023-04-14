import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamSizeValidatorDirective } from 'app/directives/team-size-validator.directive';
import { ClientLocationStatusValidatorDirective } from 'app/directives/client-location-status-validator.directive';
import { ProjectIDUniqueValidatorDirective } from 'app/directives/project-idunique-validator.directive';
import { NumberToWordsPipe } from 'app/pipes/number-to-words.pipe';
import { FilterPipe } from 'app/pipes/filter.pipe';
import { PagingPipe } from 'app/pipes/paging.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentLoaderDirective } from 'app/directives/component-loader.directive';
import { SortPipe } from 'app/pipes/sort.pipe';



@NgModule({
  declarations: [
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectIDUniqueValidatorDirective,
    NumberToWordsPipe,
    FilterPipe,
    PagingPipe,
    ComponentLoaderDirective,
    SortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectIDUniqueValidatorDirective,
    NumberToWordsPipe,
    FilterPipe,
    PagingPipe,
    ComponentLoaderDirective,
    SortPipe
  ]
})
export class SharedModule { }
