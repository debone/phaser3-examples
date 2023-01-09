class Example extends Phaser.Scene {
    preload() {
        this.load.image('block', 'assets/sprites/block.png');
    }

    create() {
        const marker = this.add.image(100, 300, 'block').setAlpha(0.3);
        const image = this.add.image(100, 300, 'block');

        const tween = this.tweens.add({
            targets: image,
            x: 700,
            duration: 3000,
            ease: 'Power2',
            loop: 2,
            onLoop: () => {
                console.log('onLoop');
            }
        });

        console.log(tween);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
