import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MapSettingsService } from './map-settings.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-map-settings',
  templateUrl: './map-settings.component.html',
  styleUrls: ['./map-settings.component.css']
})
export class MapSettingsComponent implements OnInit {

  clusterRadius: any;
  GeoFencing: boolean = false;
  timeBuffer: any;
  locationBuffer: number = 0;
  duration: any;
  mapProps: any;


  selectedMapType: string = "Map Type";
  selectedMapSubType: string = "Map Sub Type";
  MapSettingID: any


  constructor(private mapset: MapSettingsService) { }
  MapType: any = [];
  MapSubType: any = [];
  resultData = this.mapset.MapsSettingsArray

  ngOnInit() {
    this.MapType = this.mapset.MapType();
    this.mapset.getMaps()
      .subscribe(response => {
        this.mapProps = response;
      });


  }
  onSelect(MapType: any) {
    this.MapSubType = this.mapset.MapSubType().filter(e => e.name == MapType.target.value);
    const target = MapType.target;
    this.selectedMapType = target.value;
  }
  onSelectSub(MapSubType: any) {
    const target = MapSubType.target;
    this.selectedMapSubType = target.value;
  }


  decimalRegex: RegExp = /^\d+(\.\d{1,3})?$/;




  onInputChange() {
    if (this.locationBuffer !== undefined && this.locationBuffer !== null) {
      this.locationBuffer = parseFloat(this.locationBuffer.toFixed(3));
    }
  }


  registerationFormValidation = new FormGroup({
    ClusterRadius: new FormControl("", [Validators.min(0.01), Validators.max(99)]),
    myNumberControl: new FormControl(0, [Validators.required, Validators.pattern(this.decimalRegex),]

    )
  })


  get ClusterRadiusValid() {
    return this.registerationFormValidation.controls.ClusterRadius.valid;
  }

  get NumberDecimalValid() {
    return this.registerationFormValidation.controls.myNumberControl.valid;
  }


  Show() {
    console.log(this.registerationFormValidation);
    console.log(this.registerationFormValidation.controls.ClusterRadius.errors);
    if (this.registerationFormValidation.valid) {
      console.log("Trueeeee")//push
    } else {
      console.log("--false--")
    }
  }
  validate(event: any) {
    var t = event.target.value;
    var result =
      t.indexOf(".") >= 0
        ? t.substr(0, t.indexOf('.')) + t.substr(t.indexOf('.'), 3)
        : t;
    if (event.keyCode === '8' || event.keyCode === 8) {
      return true;
    } else {
      if (result !== event.target.value) {
        // alert("Please enter a number with up to 3 decimal places");
        return false
      }
    }
    return true;
  }


  onToggleChange() {
    if (this.GeoFencing == true) {
      this.GeoFencing = false;
    } else {
      this.GeoFencing = true;
    }

  }



  registerNewMap() {

    let bodyData = {
      "MapType": this.selectedMapType,
      "MapSubType": this.selectedMapSubType,
      "ClusterRadius": this.clusterRadius,
      "GeoFencing": this.GeoFencing,
      "TimeBuffer": this.timeBuffer,
      "LocationBuffer": this.locationBuffer,
      "Duration": this.duration,

    };

    this.mapset.AddNewMap(bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Map Settings Registered Successfully")
      this.mapset.getAllMapsSettings();

    });
  }

  setUpdate(data: any) {
    this.selectedMapType = data.selectedMapType,
      this.selectedMapSubType = data.selectedMapSubType,
      this.clusterRadius = data.clusterRadius,
      this.GeoFencing = data.GeoFencing,
      this.timeBuffer = data.timeBuffer,
      this.locationBuffer = data.locationBuffer,
      this.duration = data.duration,
      this.MapSettingID = data.id
  };

}















