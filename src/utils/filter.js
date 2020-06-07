import {FilterType} from "../consts.js";


export const getAllEvents = (events) => {
  return events;
};

export const getFutureEvents = (events, nowDate) => {
  const futureEvents = events.filter((event) => {
    return event.startTime > nowDate;
  });
  return futureEvents;
};

export const getPastEvents = (events, nowDate) => {
  const pastEvents = events.filter((event) => {
    return event.endTime < nowDate;
  });
  return pastEvents;
};

export const getEventsByFilter = (events, filterType) => {
  const nowDate = new Date();
  switch (filterType) {
    case FilterType.EVERYTHING:
      return getAllEvents(events);
    case FilterType.FUTURE:
      return getFutureEvents(events, nowDate);
    case FilterType.PAST:
      return getPastEvents(events, nowDate);
    default: return events;
  }
};
