class Example extends Phaser.Scene {
    preload() {
        this.load.image('block', 'assets/sprites/block.png');
    }

    create() {
        const marker = this.add.image(100, 300, 'block').setAlpha(0.3);
        const image = this.add.image(100, 300, 'block');

        //  The 'Stepped' ease takes one argument: steps.
        //  The default value is 1
        //  But you can set whatever you like in the easeParams array

        this.tweens.add({
            targets: image,
            x: 600,
            duration: 3000,
            ease: 'Stepped',
            easeParams: [ 10 ],
            delay: 1000
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
