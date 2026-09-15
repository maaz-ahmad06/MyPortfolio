// Sound Manager disabled per user request
class SoundManager {
  constructor() {
    this.enabled = false;
  }
  init() {}
  toggleSound() { return false; }
  playHover() {}
  playClick() {}
  playSuccess() {}
}

export const soundManager = new SoundManager();
