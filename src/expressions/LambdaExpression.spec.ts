import { expect } from 'chai';
import { ParameterExpression } from './ParameterExpression';
import { LambdaExpression } from './LambdaExpression';

it('should serialize to json', () => {
  const p0 = new ParameterExpression(0);
  const lambda = new LambdaExpression([p0], p0);
  const data = lambda.toJSON();
  expect(data).to.eql({
    type: 'lambda',
    parameters: [{
      type: 'parameter',
      position: 0,
    }],
    body: {
      type: 'parameter',
      position: 0,
    },
  });
});

it('should evaluate', () => {
  const p0 = new ParameterExpression(0);
  const lambda = new LambdaExpression([p0], p0);
  const foo = lambda.evaluate();
  expect(foo(42)).to.equal(42);
});

it('should set the function length', () => {
  const p0 = new ParameterExpression(0);
  const lambda = new LambdaExpression([p0], p0);
  const foo = lambda.evaluate();
  expect(foo.length).to.equal(1);
});