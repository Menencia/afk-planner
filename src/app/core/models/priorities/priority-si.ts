import { Priority } from '../priority';

export class PrioritySi extends Priority {
  si = 0;

  load(data: Partial<PrioritySi>): PrioritySi {
    Object.assign(this, data);
    return this;
  }
}
