class Example extends Phaser.Scene {
    preload() {
        this.load.image('block', 'assets/sprites/block.png');
    }

    create() {
        const image1 = this.add.image(50, 100, 'block');
        const image2 = this.add.image(60, 200, 'block');
        const image3 = this.add.image(70, 300, 'block');

        const tween = this.tweens.add({
            targets: [ image1, image2, image3 ],
            x: '+=600',
            y: '+=200',
            duration: 4000,
            ease: 'Power3'
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
