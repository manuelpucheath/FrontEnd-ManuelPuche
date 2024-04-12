import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IPersonDto } from '../../../interfaces/IPersonDto';
import { PersonService } from '../../../services/person/person.service';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IdentificationTypeService } from '../../../services/identificationType/identification-type.service';
import { IListSimpleItem } from '../../../interfaces/IListSimpleItem';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @ViewChild('createModal') createModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  createModalRef: NgbModalRef | undefined;
  deleteModalRef: NgbModalRef | undefined;
  personForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    identificationType: [{} as IListSimpleItem, Validators.required],
    identificationNumber: ['', Validators.required]
  })
  recordIdToDelete: number = 0;
  persons: IPersonDto[] = [];
  identificationTypes: IListSimpleItem[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(private _personService: PersonService, private modalService: NgbModal, private formBuilder: FormBuilder, private _identificationTypeService: IdentificationTypeService) { }

  ngOnInit() {
    this.getAllPersons()
    this.subscriptions.add(
      this._identificationTypeService.getAll().subscribe({
        next: (response: any) => {
          this.identificationTypes = response.data;
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getAllPersons() {
    this.subscriptions.add(
      this._personService.getAll().subscribe({
        next: (response: any) => {
          this.persons = response.data;
        }
      })
    )
  }

  openCreateModal() {
    const options: NgbModalOptions = {
      centered: true // Centra el modal verticalmente
    };
    this.createModalRef = this.modalService.open(this.createModal, options);
  }

  closeCreateModal(){
    if (this.createModalRef) {
      this.personForm.reset();
      this.createModalRef.close();
    }
  }

  createPerson() {
    if (this.personForm.valid) {
      let personDto: IPersonDto = {
        email: this.personForm.value.email as string,
        name: this.personForm.value.name as string,
        lastName: this.personForm.value.lastName as string,
        identificationType: this.personForm.value.identificationType as IListSimpleItem,
        identificationNumber: this.personForm.value.identificationNumber as string
      }
      this._personService.create(personDto).subscribe({
        next: (response: any) => {
          this.getAllPersons()
          if (this.createModalRef) {
            this.personForm.reset();
            this.createModalRef.close();
          }
        }
      })
    }
  }

  openDeleteModal(personId: number) {
    const options = {
      centered: true
    };
    this.recordIdToDelete = personId;
    this.deleteModalRef = this.modalService.open(this.deleteModal, options);
  }

  confirmDelete() {
    if (this.recordIdToDelete > 0) {
      this._personService.Delete(this.recordIdToDelete).subscribe({
        next: (response: any) => {
          this.getAllPersons()
          if (this.deleteModalRef) {
            this.deleteModalRef.close();
          }
        }
      })
    }
  }
}
