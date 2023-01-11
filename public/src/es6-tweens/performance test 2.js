class Example extends Phaser.Scene {
    text;
    blitter;
    i = 0;
    x = 0;

    preload() {
        this.load.spritesheet('balls', 'assets/sprites/balls.png', { frameWidth: 17, frameHeight: 17 });
    }

    create() {
        window.scene = this;

        this.blitter = this.add.blitter(0, 0, 'balls');

        this.text = this.add.text(10, 720);

        this.time.addEvent({ delay: 2, callback: this.launch, callbackScope: this, repeat: 100000 });
    }

    launch() {
        this.i++;

        const bob = this.blitter.create(this.x, 700, Phaser.Math.Between(0, 5));

        this.x += 0.5;

        if (this.x >= 1024)
        {
            this.x = 0;
        }

        if (Phaser.VERSION.substr(0, 4) === '3.60')
        {
            this.text.setText(`Active Tweens: ${this.tweens.tweens.length}\nTotal Tweens created: ${this.i}`);
        }
        else
        {
            this.text.setText(`Active Tweens: ${this.tweens._active.length}\nTotal Tweens created: ${this.i}`);
        }

        this.tweens.add({
            targets: bob,
            y: 10,
            duration: Phaser.Math.Between(500, 1000),
            ease: 'Power1',
            yoyo: true,
            onComplete: function () {
                bob.destroy();
            }
        });
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
