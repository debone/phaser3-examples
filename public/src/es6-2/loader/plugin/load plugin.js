class Example extends Phaser.Scene {
    preload() {
        // this.load.plugin('FractalPlugin', 'assets/loader-tests/fractalsPlugin.js');
        this.load.plugin('FractalPlugin', 'http://localhost/fractalplugin/dist/FractalPlugin.js');
    }

    create() {
        this.fractals.createImage(400, 300);
    }
}

const config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#0f0f0f',
    scene: Example
};

const game = new Phaser.Game(config);
