import kontra from '../../src/kontra.defaults.js';

// --------------------------------------------------
// kontra.defaults
// --------------------------------------------------
describe('kontra.defaults', () => {
  it('should add animation api and class', () => {
    expect(kontra.Animation).to.exist;
    expect(kontra.AnimationClass).to.exist;
  });

  it('should add assets api', () => {
    expect(kontra.imageAssets).to.exist;
    expect(kontra.audioAssets).to.exist;
    expect(kontra.dataAssets).to.exist;
    expect(kontra.setImagePath).to.exist;
    expect(kontra.setAudioPath).to.exist;
    expect(kontra.setDataPath).to.exist;
    expect(kontra.loadImage).to.exist;
    expect(kontra.loadAudio).to.exist;
    expect(kontra.loadData).to.exist;
    expect(kontra.load).to.exist;
  });

  it('should add button api and class', () => {
    expect(kontra.Button).to.exist;
    expect(kontra.ButtonClass).to.exist;
  });

  it('should add core api', () => {
    expect(kontra.init).to.exist;
    expect(kontra.getCanvas).to.exist;
    expect(kontra.getContext).to.exist;
  });

  it('should add events api', () => {
    expect(kontra.on).to.exist;
    expect(kontra.off).to.exist;
    expect(kontra.emit).to.exist;
  });

  it('should add gameLoop api', () => {
    expect(kontra.GameLoop).to.exist;
  });

  it('should add gameObject api and class', () => {
    expect(kontra.GameObject).to.exist;
    expect(kontra.GameObjectClass).to.exist;
  });

  it('should add gamepad api', () => {
    expect(kontra.gamepadMap).to.exist;
    expect(kontra.updateGamepad).to.exist;
    expect(kontra.initGamepad).to.exist;
    expect(kontra.onGamepad).to.exist;
    expect(kontra.offGamepad).to.exist;
    expect(kontra.gamepadPressed).to.exist;
    expect(kontra.gamepadAxis).to.exist;
  });

  it('should add gesture api', () => {
    expect(kontra.gestureMap).to.exist;
    expect(kontra.initGesture).to.exist;
    expect(kontra.onGesture).to.exist;
    expect(kontra.offGesture).to.exist;
  });

  it('should add grid api and class', () => {
    expect(kontra.Grid).to.exist;
    expect(kontra.GridClass).to.exist;
  });

  it('should add helpers api', () => {
    expect(kontra.degToRad).to.exist;
    expect(kontra.radToDeg).to.exist;
    expect(kontra.angleToTarget).to.exist;
    expect(kontra.rotatePoint).to.exist;
    expect(kontra.movePoint).to.exist;
    expect(kontra.lerp).to.exist;
    expect(kontra.inverseLerp).to.exist;
    expect(kontra.clamp).to.exist;
    expect(kontra.getStoreItem).to.exist;
    expect(kontra.setStoreItem).to.exist;
    expect(kontra.collides).to.exist;
    expect(kontra.getWorldRect).to.exist;
    expect(kontra.depthSort).to.exist;
  });

  it('should add keyboard api', () => {
    expect(kontra.keyMap).to.exist;
    expect(kontra.initKeys).to.exist;
    expect(kontra.onKey).to.exist;
    expect(kontra.offKey).to.exist;
    expect(kontra.keyPressed).to.exist;
  });

  it('should add plugin api', () => {
    expect(kontra.registerPlugin).to.exist;
    expect(kontra.unregisterPlugin).to.exist;
    expect(kontra.extendObject).to.exist;
  });

  it('should add pointer api', () => {
    expect(kontra.initPointer).to.exist;
    expect(kontra.getPointer).to.exist;
    expect(kontra.track).to.exist;
    expect(kontra.untrack).to.exist;
    expect(kontra.pointerOver).to.exist;
    expect(kontra.onPointer).to.exist;
    expect(kontra.offPointer).to.exist;
    expect(kontra.pointerPressed).to.exist;
  });

  it('should add pool api and class', () => {
    expect(kontra.Pool).to.exist;
    expect(kontra.PoolClass).to.exist;
  });

  it('should add quadtree api and class', () => {
    expect(kontra.Quadtree).to.exist;
    expect(kontra.QuadtreeClass).to.exist;
  });

  it('should add random api', () => {
    expect(kontra.rand).to.exist;
    expect(kontra.randInt).to.exist;
    expect(kontra.getSeed).to.exist;
    expect(kontra.seedRand).to.exist;
  });

  it('should add scene api and class', () => {
    expect(kontra.Scene).to.exist;
    expect(kontra.SceneClass).to.exist;
  });

  it('should add sprite api and class', () => {
    expect(kontra.Sprite).to.exist;
    expect(kontra.SpriteClass).to.exist;
  });

  it('should add spriteSheet api and class', () => {
    expect(kontra.SpriteSheet).to.exist;
    expect(kontra.SpriteSheetClass).to.exist;
  });

  it('should add text api and class', () => {
    expect(kontra.Text).to.exist;
    expect(kontra.TextClass).to.exist;
  });

  it('should add tileEngine api and class', () => {
    expect(kontra.TileEngine).to.exist;
    expect(kontra.TileEngineClass).to.exist;
  });

  it('should add vector api and class', () => {
    expect(kontra.Vector).to.exist;
    expect(kontra.VectorClass).to.exist;
  });
});
