import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from "@angular/material";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

    projectData = {
      name: '',
        description: '',
        link: '',
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
    allLanguages: string[] = ['Java SE', 'Java EE', 'PHP', 'Python', 'C#', 'C++', 'C'];
    curators = [{
        value: '1',
        name: 'Osoba 1'
    },{
        value: '2',
        name: 'Osoba 2'
    },{
        value: '3',
        name: 'Osoba 3'
    },{
        value: '4',
        name: 'Osoba 4'
    }];

    @ViewChild('languageInput') languageInput: ElementRef<HTMLInputElement>;

    constructor() { }

    ngOnInit() {
        this.filteredLanguages = this.languageCtrl.valueChanges.pipe(
            startWith(null),
            map((language: string | null) => language ? this._filter(language) : this.allLanguages.slice())
        );
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

    create() {
        console.log(this.projectData);
        alert("Utworzono projekt");
    }
}
