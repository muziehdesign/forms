import { NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BooleanComponent } from './examples/boolean/boolean.component';
import { ApplicantComponent } from './examples/applicant/applicant.component';
import { DateComponent } from './examples/date/date.component';
import { NumberComponent } from './examples/number/number.component';
import { StringComponent } from './examples/string/string.component';
import { ObjectComponent } from './examples/object/object.component';
import { FileComponent } from './examples/file/file.component';
import { DynamicComponent } from './examples/dynamic/dynamic.component';
import { ArrayComponent } from './examples/array/array.component';

const routes: Routes = [
    { path: '', redirectTo: 'examples/string', pathMatch: 'full' },
    { path: 'examples/applicant', component: ApplicantComponent },
    { path: 'examples/string', loadComponent: () => import('./examples/string/string.component').then((x) => x.StringComponent) },
    { path: 'examples/number', component: NumberComponent },
    { path: 'examples/date', component: DateComponent },
    { path: 'examples/boolean', component: BooleanComponent },
    { path: 'examples/object', component: ObjectComponent },
    { path: 'examples/file', component: FileComponent },
    { path: 'examples/dynamic', component: DynamicComponent },
    { path: 'examples/array', component: ArrayComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
