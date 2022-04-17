<<<<<<< HEAD
import {Clock} from '../../src/common/Timer';
=======
import {Clock} from '../src/Timer';
>>>>>>> main

export class FakeClock extends Clock {
  public millis: number = 0;

  public now(): number {
    return this.millis;
  }
}
