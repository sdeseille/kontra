import Text, { TextClass } from '../../src/text.js';
import { _reset, init, getContext } from '../../src/core.js';

// test-context:start
let testContext = {
  TEXT_AUTONEWLINE: true,
  TEXT_NEWLINE: true,
  TEXT_RTL: true,
  TEXT_ALIGN: true,
  TEXT_STROKE: true
};
// test-context:end

// --------------------------------------------------
// text
// --------------------------------------------------
describe(
  'text with context: ' + JSON.stringify(testContext, null, 4),
  () => {
    it('should export class', () => {
      expect(TextClass).to.be.a('function');
    });

    // --------------------------------------------------
    // init
    // --------------------------------------------------
    describe('init', () => {
      it('should set default properties', () => {
        let text = Text();

        expect(text.text).to.equal('');
        expect(text.textAlign).to.equal('');
        expect(text.lineHeight).to.equal(1);
        expect(text.font).to.equal(getContext().font);
      });

      it('should prerender the text and setup needed properties', () => {
        let text = Text({
          text: 'Hello',
          font: '32px Arial',
          color: 'black'
        });

        expect(text._s).to.exist;
        expect(text.width).to.be.above(70);
        expect(text.height).to.equal(32);
        expect(text.font).to.equal('32px Arial');
        expect(text.text).to.equal('Hello');
        expect(text.color).to.equal('black');
      });

      it('should cast text to string', () => {
        let text = Text({
          text: 1
        });

        expect(text.text).to.equal('1');
      });

      it('should set the text as dirty when setting font', () => {
        let text = Text({ text: '' });

        expect(text._d).to.be.false;

        text.font = '32px Arial';

        expect(text._d).to.be.true;
      });

      it('should set the text as dirty when setting text', () => {
        let text = Text({ text: '' });

        expect(text._d).to.be.false;

        text.text = 'Hello';

        expect(text._d).to.be.true;
      });

      it('should cast the value when setting text', () => {
        let text = Text({ text: '' });

        text.text = 123;

        expect(text.text).to.equal('123');
      });

      it('should set the text as dirty when setting width', () => {
        let text = Text({ text: '' });

        expect(text._d).to.be.false;

        text.width = 100;

        expect(text._d).to.be.true;
      });

      it('should not call prerender if context is not set', () => {
        _reset();

        let text = Text({ text: '' });

        expect(text._s).to.not.exist;
      });

      it('should set font if kontra.init is called after created', () => {
        _reset();

        let text = Text({ text: '' });

        expect(text.font).to.be.undefined;

        let canvas = document.createElement('canvas');
        canvas.width = canvas.height = 600;
        let context = canvas.getContext('2d');
        context.font = '32px Arial';
        init(canvas);

        expect(text.font).to.equal('32px Arial');
      });

      it('should not override font when set if kontra.init is called after created', () => {
        _reset();

        let text = Text({ text: '', font: '42px Arial' });

        let canvas = document.createElement('canvas');
        canvas.width = canvas.height = 600;
        let context = canvas.getContext('2d');
        context.font = '32px Arial';
        init(canvas);

        expect(text.font).to.equal('42px Arial');
      });

      it('should call prerender if kontra.init is called after created', () => {
        _reset();

        let text = Text({ text: '' });

        let canvas = document.createElement('canvas');
        canvas.width = canvas.height = 600;
        init(canvas);

        expect(text._s).to.exist;
      });
    });

    // --------------------------------------------------
    // prerender
    // --------------------------------------------------
    describe('prerender', () => {
      it('should be called if a property was changed since the last render', () => {
        let text = Text({
          text: 'Hello',
          font: '32px Arial',
          color: 'black'
        });

        sinon.stub(text, '_p');

        text.render();

        expect(text._p.called).to.be.false;

        text.text = 'Foo';

        text.render();

        expect(text._p.called).to.be.true;
      });

      it('should calculate the width based on the size of the text and font', () => {
        let text = Text({
          text: 'Hello',
          font: '32px Arial',
          color: 'black'
        });
        text.context.font = text.font;
        let width = text.context.measureText(text.text).width;

        expect(text.width).to.equal(width);
      });

      it('should calculate the height based on the font', () => {
        let text = Text({
          text: 'Hello',
          font: '32px Arial',
          color: 'black'
        });

        expect(text.height).to.equal(32);
      });

      it('should not modify the fixed width of the text', () => {
        let text = Text({
          text: 'Hello There\nWorld',
          font: '32px Arial',
          width: 1000,
          color: 'black'
        });

        expect(text.width).to.equal(1000);
      });

      if (testContext.TEXT_NEWLINE) {
        it('should calculate new lines', () => {
          let text = Text({
            text: 'Hello\nWorld',
            font: '32px Arial',
            color: 'black'
          });

          expect(text._s.length).to.equal(2);
          expect(text._s).to.deep.equal(['Hello', 'World']);
        });

        it('should calculate the width of a text with new lines as the width of the longest line', () => {
          let text = Text({
            text: 'Hello There\nWorld',
            font: '32px Arial',
            color: 'black'
          });
          text.context.font = text.font;
          let width = text.context.measureText('Hello There').width;

          expect(text.width).to.equal(width);
        });

        it('should not modify the fixed width of the text (newlines)', () => {
          let text = Text({
            text: 'Hello There\nWorld',
            font: '32px Arial',
            width: 1000,
            color: 'black'
          });

          expect(text.width).to.equal(1000);
        });

        it('should calculate the height based on the number of lines', () => {
          let text = Text({
            text: 'Hello\nWorld',
            font: '32px Arial',
            color: 'black'
          });

          expect(text.height).to.be.above(32);
        });
      } else {
        it('should not calculate new lines', () => {
          let text = Text({
            text: 'Hello\nWorld',
            font: '32px Arial',
            color: 'black'
          });

          expect(text._s.length).to.equal(1);
        });
      }

      if (testContext.TEXT_AUTONEWLINE) {
        it('should calculate new lines when the width is set', () => {
          let text = Text({
            text: 'Hello World',
            font: '32px Arial',
            color: 'black',
            width: 50
          });

          expect(text._s.length).to.equal(2);
          expect(text._s).to.deep.equal(['Hello', 'World']);
        });

        it('should calculate the height based on the number of lines', () => {
          let text = Text({
            text: 'Hello World',
            font: '32px Arial',
            color: 'black',
            width: 50
          });

          expect(text.height).to.be.above(32);
        });

        if (testContext.TEXT_NEWLINE) {
          it('should calculate new lines and auto new lines', () => {
            let text = Text({
              text: 'Hello\nWorld,\nI must be going to see the\nsights',
              font: '32px Arial',
              color: 'black',
              width: 200
            });

            expect(text._s).to.deep.equal([
              'Hello',
              'World,',
              'I must be',
              'going to see',
              'the',
              'sights'
            ]);
          });
        }
        else {
          it('should not calculate new lines and auto new lines', () => {
            let text = Text({
              text: 'Hello\nWorld,\nI must be going to see the\nsights',
              font: '32px Arial',
              color: 'black',
              width: 200
            });

            expect(text._s).to.deep.equal([
              'Hello\nWorld,\nI',
              'must be',
              'going to see',
              'the\nsights'
            ]);
          });
        }
      } else {
        it('should not calculate auto new lines', () => {
          let text = Text({
            text: 'Hello World',
            font: '32px Arial',
            color: 'black',
            width: 50
          });

          expect(text._s.length).to.equal(1);
        });
      }
    });

    // --------------------------------------------------
    // render
    // --------------------------------------------------
    describe('render', () => {
      it('should render the text', () => {
        let text = Text({
          text: 'Hello World',
          font: '32px Arial',
          color: 'black'
        });

        sinon.spy(text.context, 'fillText');

        text.render(0, 0);

        expect(text.context.fillText.called).to.be.true;
      });

      if (testContext.TEXT_ALIGN) {
        it('should respect textAlign property', () => {
          let text = Text({
            text: 'Hello World',
            font: '32px Arial',
            color: 'black',
            width: 1000
          });

          sinon.spy(text.context, 'fillText');

          text.textAlign = 'center';
          text.render(0, 0);

          expect(text.context.fillText.calledWith(text.text, 500, 0))
            .to.be.true;

          text.textAlign = 'right';
          text.render(0, 0);

          expect(text.context.fillText.calledWith(text.text, 1000, 0))
            .to.be.true;
        });
      }

      if (testContext.TEXT_RTL) {
        it('should handle RTL languages', () => {
          let text = Text({
            text: 'Hello World',
            font: '32px Arial',
            color: 'black',
            width: 1000
          });

          sinon.spy(text.context, 'fillText');

          text.context.canvas.dir = 'rtl';
          text.render(0, 0);

          expect(text.context.fillText.calledWith(text.text, 1000, 0))
            .to.be.true;
        });
      }

      if (testContext.TEXT_AUTONEWLINE) {
        it('should render each line of the text', () => {
          let text = Text({
            text: 'Hello World',
            font: '32px Arial',
            color: 'black',
            width: 50
          });

          sinon.spy(text.context, 'fillText');
          text.render(0, 0);

          expect(text.context.fillText.calledTwice).to.be.true;
          expect(
            text.context.fillText.firstCall.calledWith('Hello', 0, 0)
          ).to.be.true;
          expect(
            text.context.fillText.secondCall.calledWith(
              'World',
              0,
              32
            )
          ).to.be.true;
        });

        it('should account for lineHeight', () => {
          let text = Text({
            text: 'Hello World',
            font: '32px Arial',
            color: 'black',
            width: 50,
            lineHeight: 2
          });

          sinon.spy(text.context, 'fillText');
          text.render(0, 0);

          expect(
            text.context.fillText.secondCall.calledWith(
              'World',
              0,
              64
            )
          ).to.be.true;
        });
      }

      if (testContext.TEXT_NEWLINE) {
        it('should render each line of the text', () => {
          let text = Text({
            text: 'Hello\nWorld',
            font: '32px Arial',
            color: 'black'
          });

          sinon.spy(text.context, 'fillText');
          text.render(0, 0);

          expect(text.context.fillText.calledTwice).to.be.true;
          expect(
            text.context.fillText.firstCall.calledWith('Hello', 0, 0)
          ).to.be.true;
          expect(
            text.context.fillText.secondCall.calledWith(
              'World',
              0,
              32
            )
          ).to.be.true;
        });

        it('should account for lineHeight', () => {
          let text = Text({
            text: 'Hello\nWorld',
            font: '32px Arial',
            color: 'black',
            lineHeight: 2
          });

          sinon.spy(text.context, 'fillText');
          text.render(0, 0);

          expect(
            text.context.fillText.secondCall.calledWith(
              'World',
              0,
              64
            )
          ).to.be.true;
        });
      }

      if (testContext.TEXT_STROKE) {
        it('should call strokeText', () => {
          let text = Text({
            text: 'Hello World',
            font: '32px Arial',
            color: 'black',
            strokeColor: 'white'
          });

          sinon.spy(text.context, 'strokeText');

          text.render(0, 0);

          expect(text.context.strokeText.called).to.be.true;
        });

        it('should use lineWidth', () => {
          let text = Text({
            text: 'Hello World',
            font: '32px Arial',
            color: 'black',
            strokeColor: 'white',
            lineWidth: 2
          });

          let spy = sinon.spy(text.context, 'lineWidth', ['set']);

          text.render(0, 0);

          expect(spy.set.calledWith(2)).to.be.true;
        });
      }
      else {
        it('should not call strokeText', () => {
          let text = Text({
            text: 'Hello World',
            font: '32px Arial',
            color: 'black',
            strokeColor: 'white'
          });

          sinon.spy(text.context, 'strokeText');

          text.render(0, 0);

          expect(text.context.strokeText.called).to.be.false;
        });
      }
    });
  }
);
