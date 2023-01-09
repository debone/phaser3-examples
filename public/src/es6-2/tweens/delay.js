class Example extends Phaser.Scene {
    preload() {
        this.load.image('block', 'assets/sprites/block.png');
    }

    create() {
        const marker = this.add.image(100, 100, 'block').setAlpha(0.3);
        const image = this.add.image(100, 100, 'block');

        const tween = this.tweens.add({
            targets: image,
            x: 600,
            ease: 'Power1',
            duration: 3000,
            delay: 2000
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
