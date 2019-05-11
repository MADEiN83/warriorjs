class Player {
  /**
   * Plays a warrior turn.
   *
   * @param {Warrior} warrior The warrior.
   */
  playTurn(warrior) {
    // Cool code goes here

    if (warrior.feel().isUnit()) {
      warrior.attack();
      return;
    }

    warrior.walk();
  }
}
