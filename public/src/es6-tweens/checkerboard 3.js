class Example extends Phaser.Scene {
    preload() {
        this.load.image('block', 'assets/sprites/50x50.png');
    }

    create() {
        const blocks = this.add.group({ key: 'block', repeat: 139, setScale: { x: 0, y: 0 } });

        Phaser.Actions.GridAlign(blocks.getChildren(), {
            width: 14,
            cellWidth: 50,
            cellHeight: 50,
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
                angle: 180,
                _ease: 'Sine.easeInOut',
                ease: 'Power2',
                duration: 1000,
                delay: i * 50,
                repeat: -1,
                yoyo: true,
                hold: 1000,
                repeatDelay: 1000
            });

            i++;

            if (i % 14 === 0)
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
    backgroundColor: '#080808',
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
