export interface TimelineData {
  title: Title;
  events: Events[];

}

export interface Title {
  media: Media;
  text: Text;
}

export interface Media {
  url: string;
  caption: string;
  credit: string;
}

export interface Text {
  headline: string;
  text: string;
}

export interface Events {
  media?: Media;
  start_date: TimelineDate;
  text: Text;
}

export interface TimelineDate {
  year: string;
  month?: string;
  day?: string;
}
