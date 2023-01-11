class Example extends Phaser.Scene {
    preload() {
        this.load.image('block', 'assets/sprites/block.png');
    }

    create() {
        const image = this.add.image(0, 400, 'block');

        const tween = this.tweens.add({
            targets: image,
            props: {
                x: { value: 800, duration: 5000, ease: 'Linear' },
                y: { value: 100, duration: 1000, ease: 'Bounce.easeInOut', yoyo: true, delay: 1000 }
            }
        });

        console.log(tween);

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
