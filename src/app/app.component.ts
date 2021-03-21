import { Component, VERSION } from "@angular/core";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";
import { map, first, filter, count, max, min, single } from "rxjs/operators";
import { interval } from "rxjs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;
  bannerMessage = "Welcome to codevaluation demo";
  topics = ["Angular", "React", "Vue"];
  apiDataObservable = ajax("https://api.github.com/users/lapalb");
  num = of(1, 2, 3);
  secondsCounter = interval(1000);

  test = function() {
    // subscribing to Ajax Observable
    this.apiDataObservable.subscribe({
      next(response) {
        console.log(response.response);
        console.log(response.response.created_at);
      },
      error(err) {
        console.error("Error: " + err);
      },
      complete() {
        console.log("Completed");
      }
    });

    // Subscrbing to of Observable
    this.num.subscribe({
      next(val) {
        console.log(val);
      },
      error(err) {
        console.error("Error: " + err);
      },
      complete() {
        console.log("Completed of");
      }
    });

    //Subscrbing to interval
    var secondsCounterSubscriptionObject = this.secondsCounter.subscribe({
      next(val) {
        console.log(`Time elapsed ${val}`);
      },
      error(err) {
        console.error("Error: " + err);
      },
      complete() {
        console.log("Completed time");
      }
    });

    map((x: number) => x * x)(of(1, 2, 3)).subscribe(v =>
      console.log(`value: ${v}`)
    );
    setTimeout(() => {
      secondsCounterSubscriptionObject.unsubscribe();
    }, 5000);
  };
}
