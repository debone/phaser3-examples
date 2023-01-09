class Example extends Phaser.Scene {
    preload() {
        this.load.image('metal', 'assets/textures/alien-metal.jpg');
    }

    create() {
        const graphics = this.add.graphics();

        graphics.setTexture('metal');

        graphics.lineStyle(128, 0x00ff00, 1);

        graphics.lineBetween(100, 100, 600, 500);
    }
}

const config = {
    width: 800,
    height: 600,
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
