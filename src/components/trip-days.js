import AbstractComponent from "./abstract-component";

export default class TripDaysComponent extends AbstractComponent {
  getTemplate() {
    return (
      `<ul class="trip-days">
      </ul>`
    );
  }
}
