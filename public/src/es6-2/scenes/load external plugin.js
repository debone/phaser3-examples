class Example extends Phaser.Scene {
    preload() {
        this.load.plugin('BasePlugin', '../../phaser3-plugin-template/dist/BasePlugin.js');
    }

    create() {
        this.sys.install('BasePlugin');

        this.sys.base.test('Rich');

        // console.log(this.sys);

        // this.add.image(400, 300, 'face');
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
