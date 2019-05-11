class Player {
  constructor() {
    this.health = 20;
  }

  playTurn(warrior) {
    const takesDamages = warrior.health() < this.health;
    this.health = warrior.health();

    if (this.hasEnemy(warrior)) {
      warrior.think("Has unit forward");
      warrior.attack();
      return;
    } else if (takesDamages) {
      warrior.think("Takes damages");
      warrior.walk();
      return;
    }

    if (this.canRescue(warrior)) {
      warrior.rescue();
      return;
    }

    if (this.mustBeHeal(warrior)) {
      warrior.think("I'm healing.");
      warrior.rest();
      return;
    }

    warrior.think("I'm walking.");
    warrior.walk();
  }

  hasEnemy(warrior, direction = "forward") {
    const unit = warrior.feel(direction).getUnit();
    return unit && unit.isEnemy();
  }

  canRescue(warrior) {
    const unit = warrior.feel().getUnit();
    return unit && unit.isBound() && !unit.isEnemy();
  }

  mustBeHeal(warrior) {
    return warrior.health() < 14;
  }
}
