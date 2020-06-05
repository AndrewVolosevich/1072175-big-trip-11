export default class EventModel {
  constructor(data) {
    this._destination = data[`destination`];
    this.id = data[`id`];
    this.type = data[`type`];
    this.destination = this._destination[`name`];
    this.options = data[`offers`];
    this.info = this._destination[`description`];
    this.price = data[`base_price`];
    this.isFavorite = data[`is_favorite`];
    this.fotos = this._destination[`pictures`];
    this.startTime = new Date(data[`date_from`]);
    this.endTime = new Date(data[`date_to`]);
    this.timeDif = this.endTime - this.startTime;
  }

  static parseEvent(data) {
    return new EventModel(data);
  }

  static parseEvents(data) {
    return data.map(EventModel.parseEvent);
  }
}
