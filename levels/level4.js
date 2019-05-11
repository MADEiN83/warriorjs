class Player {
  constructor() {
    // This code will be executed only once, at the beginning of the level.
    this.health = 20;
    this.w = null;
  }

  /**
   * Plays a warrior turn.
   *
   * @param {Warrior} warrior The warrior.
   */
  playTurn(warrior) {
    if (!this.w) {
      this.w = warrior;
    }

    const takesDamages = warrior.health() < this.health;
    this.health = warrior.health();

    if (this.hasUnit()) {
      warrior.think("Has unit forward");
      warrior.attack();
      return;
    } else if (takesDamages) {
      warrior.think("Takes damages");
      warrior.walk();
      return;
    }

    if (this.mustBeHeal()) {
      warrior.think("I'm healing.");

      warrior.rest();
      return;
    }

    warrior.think("I'm walking.");
    warrior.walk();
  }

  hasUnit(direction = "forward") {
    return this.w.feel(direction).isUnit();
  }

  mustBeHeal() {
    return this.w.health() < 14;
  }
}
