class Example extends Phaser.Scene {
    preload() {
        this.load.image('arrow', 'assets/sprites/arrow.png');
    }

    create() {
        const marker = this.add.image(100, 100, 'arrow').setAlpha(0.3);
        const image = this.add.image(100, 100, 'arrow');

        const tween = this.tweens.add({
            targets: image,
            x: 600,
            ease: 'Power1',
            duration: 3000,
            yoyo: true,
            repeat: 1,
            onStart: function () { console.log('onStart'); console.log(arguments); },
            onComplete: function () { console.log('onComplete'); console.log(arguments); },
            onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
            onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
        });
    }

    onYoyoHandler(tween, target) {
        console.log(arguments);

        target.toggleFlipX().setAlpha(0.2 + Math.random());
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
