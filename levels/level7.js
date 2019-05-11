class Player {
  constructor() {
    this.health = 20;
  }

  playTurn(warrior) {
    const receivedDamages = this.hasDamages(warrior);
    this.health = warrior.health();

    if (this.isWall(warrior)) {
      warrior.pivot();
      return;
    }

    if (this.isEnemy(warrior)) {
      warrior.attack();
      return;
    } else if (receivedDamages && warrior.health() < 8) {
      this.a = true;
      // Not an enemy but I receive some damages... :(
      warrior.walk("backward");
      return;
    }

    // Criticity !!
    if (this.a && warrior.health() < warrior.maxHealth()) {
      warrior.rest();
      return;
    } else if (warrior.health() === warrior.maxHealth()) {
      this.a = false;
    }

    if (warrior.health() <= 15) {
      warrior.rest();
      return;
    }

    warrior.walk();
  }

  isStairs(warrior, direction = "forward") {
    const feel = warrior.feel(direction);
    return feel && feel.isStairs();
  }

  isUnit(warrior, direction = "forward") {
    const feel = warrior.feel(direction);
    return feel && feel.isUnit();
  }

  isWall(warrior, direction = "forward") {
    const feel = warrior.feel(direction);
    return feel && feel.isWall();
  }

  isEnemy(warrior, direction = "forward") {
    const unit = warrior.feel(direction).getUnit();
    return unit && unit.isEnemy();
  }

  hasDamages(warrior) {
    return warrior.health() < this.health;
  }
}
