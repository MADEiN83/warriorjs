class Player {
  constructor() {
    this.health = 20;
    this.direction = "backward";
    this.mustHealNowAndGoBackward = false;
  }

  playTurn(warrior) {
    const takesDamages = warrior.health() < this.health;
    this.mustHealNowAndGoBackward = warrior.health() <= 8;
    this.health = warrior.health();

    if (this.hasEnemy(warrior, this.direction)) {
      warrior.think("Has unit forward");
      warrior.attack();
      return;
    } else if (takesDamages) {
      warrior.think("Takes damages");

      if (this.mustHealNowAndGoBackward) {
        warrior.walk(this.reverseDirection());
        return;
      }

      warrior.walk();
      return;
    }

    if (this.canRescue(warrior, this.direction)) {
      warrior.rescue(this.direction);
      this.direction = "forward";
      return;
    }

    if (this.mustBeHeal(warrior)) {
      warrior.think("I'm healing.");
      warrior.rest();
      return;
    }

    warrior.think("I'm walking.");
    warrior.walk(this.direction);
  }

  hasEnemy(warrior, direction = "forward") {
    const unit = warrior.feel(direction).getUnit();
    return unit && unit.isEnemy();
  }

  canRescue(warrior, direction = "forward") {
    const unit = warrior.feel(direction).getUnit();
    return unit && unit.isBound() && !unit.isEnemy();
  }

  mustBeHeal(warrior) {
    return warrior.health() < warrior.maxHealth();
  }

  reverseDirection() {
    switch (this.direction) {
      case "forward":
        return "backward";
      case "backward":
        return "forward";
      default:
        return "forward";
    }
  }
}
