class Example extends Phaser.Scene {
    preload() {
        this.load.image('block', 'assets/sprites/block.png');
    }

    create() {
        Phaser.GameObjects.GameObject.prototype.tween = function (config)
        {
            return this.scene.tweens.add({
                ...config,
                targets: this
            });
        }

        const block = this.add.image(100, 100, 'block');

        block.tween({ x: 600, duration: 1000 });
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
