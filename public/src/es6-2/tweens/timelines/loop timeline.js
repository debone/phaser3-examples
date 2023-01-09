class Example extends Phaser.Scene {
    timeline;

    preload() {
        this.load.image('block', 'assets/sprites/block.png');
    }

    create() {
        const image = this.add.image(100, 300, 'block');

        this.timeline = this.tweens.timeline({

            targets: image,
            loop: 4,

            tweens: [
            {
                x: 700,
                ease: 'Sine.easeInOut',
                duration: 2000,
                yoyo: true
            },
            {
                y: 100,
                ease: 'Sine.easeOut',
                duration: 1000,
                offset: 0
            },
            {
                y: 300,
                ease: 'Sine.easeIn',
                duration: 1000
            },
            {
                y: 500,
                ease: 'Sine.easeOut',
                duration: 1000
            },
            {
                y: 300,
                ease: 'Sine.easeIn',
                duration: 1000
            }
            ]

        });

        console.log(this.timeline);
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
