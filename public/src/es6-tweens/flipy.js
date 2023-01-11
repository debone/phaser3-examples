class Example extends Phaser.Scene {
    preload() {
        this.load.image('cokecan', 'assets/sprites/cokecan.png');
    }

    create() {
        const marker = this.add.image(100, 100, 'cokecan').setAlpha(0.3);
        const image = this.add.image(100, 100, 'cokecan');

        //  flipY will call toggleFlipY on the image whenever it yoyos or repeats

        const tween = this.tweens.add({
            targets: image,
            x: 600,
            ease: 'Power1',
            duration: 3000,
            flipY: true,
            yoyo: true,
            repeat: -1
        });
    }
}

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    pixelArt: true,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
