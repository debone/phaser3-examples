class Example extends Phaser.Scene {
    preload() {
        this.load.image('block', 'assets/sprites/block.png');
    }

    create() {
        const image = this.add.image(100, 100, 'block');

        this.tweens.add({
            targets: image,
            x: { value: 700, duration: 4000, ease: 'Power2', yoyo: -1 },
            y: { value: 400, duration: 1500, ease: 'Bounce.easeOut', yoyo: -1 }
        });

    }
}

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
