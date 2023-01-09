class Example extends Phaser.Scene {
    preload() {
        this.load.image('metal', 'assets/textures/alien-metal.jpg');
        this.load.atlas('megaset', 'assets/atlas/megaset-0.png', 'assets/atlas/megaset-0.json');
    }

    create() {
        const graphics = this.add.graphics();

        graphics.setTexture('megaset', 'contra1');

        graphics.fillStyle(0x00ff00);
        graphics.fillRect(100, 100, 256, 256);

        graphics.setTexture('megaset', 'dragonwiz', 1);

        graphics.fillGradientStyle(0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 1);
        graphics.fillRect(350, 300, 256, 256);
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
