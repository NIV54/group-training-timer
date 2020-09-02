import NoSleep from "nosleep.js";

class NoSleepWrapper {
  private noSleep: NoSleep | null = null;
  active = false;
  constructor() {
    if (!this.noSleep) {
      this.noSleep = new NoSleep();
    }
  }

  enable = () => {
    if (!this.active) {
      this.active = true;
      this.noSleep?.enable();
    }
  };

  disable = () => {
    if (this.active) {
      this.active = false;
      this.noSleep?.disable();
    }
  };
}

export const noSleep = new NoSleepWrapper();
