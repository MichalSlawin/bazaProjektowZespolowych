import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {UserService} from "../../services/user.service";
import {ProjectService} from "../../services/project.service";
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialog} from "@angular/material";
import {map, startWith} from "rxjs/operators";
import {SuccessDialogComponent} from "../success-dialog/success-dialog.component";

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

    projectData = {
        name: '',
        description: '',
        link: '',
        release: '',
        languages: [],
        mentoring: false,
        curator: ''
    };

    selectable = true;
    removable = true;
    addOnBlur = false;
    languageCtrl = new FormControl();
    filteredLanguages: Observable<string[]>;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    allLanguages;
    curators;

    @ViewChild('languageInput') languageInput: ElementRef<HTMLInputElement>;

    constructor(private user: UserService, private project: ProjectService, public dialog: MatDialog) { }

    ngOnInit() {
        this.getProjectData();
        this.project.getLanguages().subscribe((data) => {
            this.allLanguages = data;
            this.filteredLanguages = this.languageCtrl.valueChanges.pipe(
                startWith(null),
                map((language: string | null) => language ? this._filter(language) : this.allLanguages.slice())
            );
        });

        this.user.workerList().subscribe((data) => {
            this.curators = data;
        });
    }

    getProjectData() {
        this.project.getMine().subscribe((data) => {
            this.projectData['name'] = data['name'];
            this.projectData['description'] = data['description'];
            this.projectData['link'] = data['link'];
            this.projectData['release'] = data['release_link'];
            this.projectData['languages'] = data['languages'].map(language => language.name);
            this.projectData['mentoring'] = data['mentoring'];
            this.projectData['curator'] = data['worker'].id;
        });
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.projectData.languages.push(value.trim());
        }

        if (input) {
            input.value = '';
        }
        this.languageCtrl.setValue(null);
    }

    remove(language: string): void {
        const index = this.projectData.languages.indexOf(language);

        if (index >= 0) {
            this.projectData.languages.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.projectData.languages.push(event.option.viewValue);
        this.languageInput.nativeElement.value = '';
        this.languageCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allLanguages.filter(language => language.toLowerCase().indexOf(filterValue) === 0);
    }

    edit() {
        this.project.edit(this.projectData).subscribe((data) => {
            const dialogRef = this.dialog.open(SuccessDialogComponent, {
                width: '600px',
                data: 'Ukończono edycję projektu'
            });
            dialogRef.afterClosed().subscribe(() => {
                location.href = '/moj-projekt';
            });
        });
    }

}
