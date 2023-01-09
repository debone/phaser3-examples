class Example extends Phaser.Scene {
    text;
    tween;
    arrow;

    preload() {
        this.load.image('arrow', 'assets/sprites/arrow.png');
    }

    create() {
        this.text = this.add.text(30, 20, '0', { font: '16px Courier', fill: '#00ff00' });

        this.arrow = this.add.image(400, 300, 'arrow');

        this.tween = this.tweens.add({
            targets: this.arrow,
            x: 400,
            y: 300,
            ease: 'Sine.easeIn',
            duration: 5000,
            paused: true
        });

        this.input.on('pointerdown', () => {

            this.tween.play();

        });
    }

    update() {
        this.arrow.rotation = Math.atan2(this.input.y - this.arrow.y, this.input.x - this.arrow.x);

        if (this.tween.isPlaying())
        {
            this.tween.updateTo('x', this.input.x, true);
            this.tween.updateTo('y', this.input.y, true);

            this.text.setText(`Progress: ${this.tween.progress}`);
        }
        else
        {
            this.text.setText('Click to start');
        }
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
