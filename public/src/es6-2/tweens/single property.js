class Example extends Phaser.Scene {
    preload() {
        this.load.image('block', 'assets/sprites/block.png');
    }

    create() {
        // var marker = this.add.image(100, 100, 'block').setAlpha(0.3);
        const image = this.add.image(100, 100, 'block');

        this.input.on('pointerdown', () => {

            const duration = Phaser.Math.Between(200, 1000);

            this.tweens.add({
                targets: image,
                x: Phaser.Math.Between(100, 700),
                y: Phaser.Math.Between(100, 500),
                ease: 'Power1',
                duration: duration
            });

            console.log('--- duration', duration);

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
