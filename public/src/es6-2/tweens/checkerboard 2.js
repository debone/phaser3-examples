class Example extends Phaser.Scene {
    preload() {
        this.load.image('block', 'assets/sprites/50x50.png');
    }

    create() {
        const blocks = this.add.group({ key: 'block', repeat: 107, setScale: { x: 0.3, y: 0.3 } });

        Phaser.Actions.GridAlign(blocks.getChildren(), {
            width: 12,
            height: 10,
            cellWidth: 60,
            cellHeight: 60,
            x: 70,
            y: 60
        });

        const _this = this;

        let i = 0;

        blocks.children.iterate(child => {

            _this.tweens.add({
                targets: child,
                scaleX: 1,
                scaleY: 1,
                ease: 'Sine.easeInOut',
                duration: 300,
                delay: i * 50,
                repeat: -1,
                yoyo: true,
                repeatDelay: 500
            });

            i++;

            if (i % 12 === 0)
            {
                i = 0;
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
