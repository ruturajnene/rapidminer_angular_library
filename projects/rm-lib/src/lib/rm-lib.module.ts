import { NgModule} from '@angular/core';
import { RmLibComponent } from './rm-lib.component';
import { RmJobsComponent } from './rm-jobs/rm-jobs.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { RapidminerAutomodelComponent } from './rapidminer-automodel/rapidminer-automodel.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DataQualityTableComponent } from './data-quality-table/data-quality-table.component';
import {MatGridListModule, MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatTableModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import { DataWeightsTableComponent } from './data-weights-table/data-weights-table.component';
import { SelectLearnersComponent } from './select-learners/select-learners.component';
import { PredictionResultsComponent } from './prediction-results/prediction-results.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ChartsComponent } from './charts/charts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, MatMenuModule, BrowserAnimationsModule, MatInputModule, MatStepperModule, MatButtonModule, MatTableModule, MatTabsModule,MatSelectModule,MatSlideToggleModule,MatGridListModule,MatProgressSpinnerModule
  ],
  declarations: [RmLibComponent, RmJobsComponent, RapidminerAutomodelComponent, DataQualityTableComponent, DataWeightsTableComponent, SelectLearnersComponent, PredictionResultsComponent, DataTableComponent, ChartsComponent],
  exports: [RmLibComponent, RmJobsComponent, RapidminerAutomodelComponent, DataTableComponent, ChartsComponent]
})
export class RmLibModule { }
