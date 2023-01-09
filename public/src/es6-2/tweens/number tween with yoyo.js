class Example extends Phaser.Scene {
    tween;
    text;

    create() {
        this.text = this.add.text(30, 20, '0', { font: '16px Courier', fill: '#00ff00' });

        //  A 'Counter' tween is a special type of tween which doesn't have a target.
        //  Instead it allows you to tween between 2 numeric values. The default values
        //  are 0 to 1, but can be set to anything. You can use the tweened value via
        //  `tween.getValue()` for the duration of the tween.

        this.tween = this.tweens.addCounter({
            from: 100,
            to: 200,
            duration: 5000,
            yoyo: true
        });
    }

    update() {
        this.text.setText([
            `Value: ${this.tween.getValue()}`,
            `Progress: ${this.tween.totalProgress}`,
            `Elapsed: ${this.tween.totalElapsed}`,
            `Duration: ${this.tween.totalDuration}`
        ]);
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
