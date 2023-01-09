class Example extends Phaser.Scene {
    preload() {
        this.load.image('block', 'assets/sprites/block.png');
    }

    create() {
        const marker = this.add.image(100, 100, 'block').setAlpha(0.3);
        const image = this.add.image(100, 100, 'block');

        const timeline = this.tweens.timeline({

            targets: image,
            ease: 'Power1',
            duration: 3000,

            tweens: [{
                x: 600
            },
            {
                y: 500
            },
            {
                x: 100
            },
            {
                y: 100
            }]

        });

        console.log(timeline);
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
