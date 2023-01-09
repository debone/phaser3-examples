class Example extends Phaser.Scene {
    create() {
        const config = {
            key: 'explodeAnimation',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 23, first: 23 }),
            frameRate: 20,
            repeat: -1
        };

        this.anims.create(config);

        this.add.sprite(400, 300, 'explosion').play('explodeAnimation');
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
