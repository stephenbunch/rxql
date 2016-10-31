import { IExpression } from '../expressions/IExpression';
import { CallExpression } from '../expressions/CallExpression';
import { ParameterExpression } from '../expressions/ParameterExpression';
import { LambdaExpression } from '../expressions/LambdaExpression';
import { DatumExpression } from './DatumExpression';
import { MemberExpression } from '../expressions/MemberExpression';

export class SequenceExpression implements IExpression {
  sequence: IExpression;

  constructor(sequence) {
    this.sequence = sequence;
  }

  toJSON() {
    return {
      type: 'sequence',
      sequence: this.sequence.toJSON(),
    };
  }

  evaluate(context) {
    return this.sequence.evaluate(context);
  }

  map<T extends IExpression>(callback: (datum: DatumExpression) => T): SequenceExpression {
    const datum = new DatumExpression(0);
    const parameters = [];
    const body = callback(datum);
    return new SequenceExpression(
      new CallExpression(new MemberExpression(this.sequence, 'map'), [new LambdaExpression([datum], body)]) 
    );
  }
}