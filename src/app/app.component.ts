import { Component, VERSION } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ContactService } from "./contact.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  contactForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}
  name = "Angular " + VERSION.major;
  get itemRows() {
    return this.contactForm.get("itemRows") as FormArray;
  }
  deleteMyRelation(i) {
    this.itemRows.removeAt(i);
  }
  createItem(): FormGroup {
    return this.fb.group({
      province_id: "",
      district_id: ""
    });
  }

  addItem(): void {
    this.itemRows.push(this.createItem());
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      province_id: "",
      district_id: "",
      itemRows: this.fb.array([this.createItem()])
    });
    this.getProvinces();
  }

  provinces = <any>[];
  districts = <any[]>[];

  getProvinces() {
    this.contactService.getProvinces().subscribe(
      data => {
        this.provinces = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  onChangeProvince(i) {
    this.contactService
      .getDistrict(this.itemRows.get(i + ".province_id").value)
      .subscribe(
        data => {
          this.districts[i] = data;
        },
        error => {
          console.log(error);
        }
      );
  }
}
