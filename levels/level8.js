const PLACE_TYPES = {
  EMPTY: "empty",
  ENEMY: "enemy",
  CAPTIVE: "captive",
  WALL: "wall",
  STAIRS: "stairs"
};

class Player {
  constructor() {
    this.health = 20;
    this.direction = "forward";
    this.mustPivot = true;
    this.hasPivoted = false;
  }

  playTurn(warrior) {
    this.health = warrior.health();

    const places = this.getNextPlace(warrior);
    this.whatCanIDo(warrior, places);
  }

  getNextPlace(warrior) {
    const placesForward = warrior.look("forward").map(this.determineTypes);
    const placesBackward = warrior.look("backward").map(this.determineTypes);

    warrior.think(placesForward);
    warrior.think(placesBackward);
    return placesForward;
  }

  determineTypes(place) {
    if (place.isEmpty()) return PLACE_TYPES.EMPTY;
    if (place.isStairs()) return PLACE_TYPES.STAIRS;
    if (place.isWall()) return PLACE_TYPES.WALL;

    const unit = place.getUnit();
    if (unit && unit.isEnemy()) return PLACE_TYPES.ENEMY;
    if (unit && unit.isBound() && !unit.isEnemy()) return PLACE_TYPES.CAPTIVE;
  }

  whatCanIDo(warrior, places) {
    const [firstPlace, secondPlace, thirdPlace] = places;

    if (firstPlace === PLACE_TYPES.EMPTY && secondPlace === PLACE_TYPES.ENEMY) {
      warrior.walk(this.direction);
      return;
    }

    if (
      firstPlace === PLACE_TYPES.EMPTY &&
      secondPlace === PLACE_TYPES.EMPTY &&
      thirdPlace === PLACE_TYPES.ENEMY
    ) {
      warrior.shoot(this.direction);
      return;
    }

    if (
      !this.hasPivoted &&
      (firstPlace === PLACE_TYPES.WALL ||
        (firstPlace === PLACE_TYPES.EMPTY &&
          secondPlace === PLACE_TYPES.WALL) ||
        (firstPlace === PLACE_TYPES.EMPTY &&
          secondPlace === PLACE_TYPES.EMPTY &&
          thirdPlace === PLACE_TYPES.WALL))
    ) {
      warrior.pivot();
      this.hasPivoted = true;
      return;
    }

    switch (firstPlace) {
      case PLACE_TYPES.EMPTY:
        warrior.walk(this.direction);
        break;
      case PLACE_TYPES.ENEMY:
        warrior.attack(this.direction);
        break;
      case PLACE_TYPES.CAPTIVE:
        warrior.rescue(this.direction);
        break;
      case PLACE_TYPES.WALL:
        warrior.pivot();
        break;
      case PLACE_TYPES.STAIRS:
        warrior.walk(this.direction);
        break;
    }
  }
}
