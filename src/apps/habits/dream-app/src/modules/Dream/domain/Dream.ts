export class Dream {
  constructor(
    public id: string,
    public date: Date,
    public start: Date,
    public end: Date,
    public duration: number,
    public quality: number,
    public lucidity: number,
    public state: string
  ) {}

  static fromPrimitives(data: Record<string, any>) {
    return new Dream(
      data.id,
      new Date(data.date),
      new Date(data.start),
      new Date(data.end),
      data.duration,
      data.quality,
      data.lucidity,
      data.state
    );
  }

  public toPrimitives() {
    return {
      id: this.id,
      date: this.date.toISOString(),
      start: this.start.toISOString(),
      end: this.end.toISOString(),
      duration: this.duration,
      quality: this.quality,
      lucidity: this.lucidity,
      state: this.state,
    };
  }

  public startSleeping() {
    this.state = "sleeping";
  }

  public stopSleeping() {
    this.state = "awake";
    this.end = new Date();
    this.duration = this.end.getTime() - this.start.getTime();
  }
}
