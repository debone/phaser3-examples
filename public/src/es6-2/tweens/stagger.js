class Example extends Phaser.Scene {
    preload() {
        this.load.image('block', 'assets/sprites/block.png');
    }

    create() {
        const image1 = this.add.image(100, 100, 'block');
        const image2 = this.add.image(100, 200, 'block');
        const image3 = this.add.image(100, 300, 'block');
        const image4 = this.add.image(100, 400, 'block');
        const image5 = this.add.image(100, 500, 'block');

        this.tweens.add({
            targets: [ image1, image2, image3, image4, image5 ],
            x: 700,
            yoyo: true,
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            delay: function (target, targetKey, value, targetIndex, totalTargets, tween) {
                return targetIndex * 100;
            }
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
