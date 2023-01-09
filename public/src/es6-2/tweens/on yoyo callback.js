class Example extends Phaser.Scene {
    tween;
    progressText;

    preload() {
        this.load.image('arrow', 'assets/sprites/arrow.png');
    }

    create() {
        const marker = this.add.image(64, 64, 'arrow').setAlpha(0.3);
        const image = this.add.image(64, 64, 'arrow');
        const text = this.add.text(32, 128, '', { font: '16px Courier', fill: '#00ff00' });
        this.progressText = this.add.text(500, 128, '', { font: '16px Courier', fill: '#00ff00' });
        const eventList = [ 'Events:', '-------', '' ];

        const addEvent = event => {
            eventList.push(event);
            text.setText(eventList);
        };

        /*
        tween = this.tweens.add({
            targets: image,
            props: {
                x: {
                    value: 600,
                    delay: 2000
                },
                y: {
                    value: 200,
                    delay: 4000
                }
            },
            x: 600,
            ease: 'Power1',
            duration: 3000,
            yoyo: true,
            repeat: 2,
            delay: 2000,
            onActive: function () { addEvent('onActive') },
            onStart: function () { addEvent('onStart') },
            onYoyo: function () { addEvent('onYoyo') },
            onRepeat: function () { addEvent('onRepeat') },
            onComplete: function () { addEvent('onComplete') }
        });
        */

        /*
        tween = this.tweens.add({
            targets: image,
            props: {
                x: {
                    value: 600,
                    delay: 2000
                },
                y: {
                    value: 200,
                    delay: 4000
                }
            },
            ease: 'Power1',
            duration: 3000,
            yoyo: true,
            repeat: 1,
            completeDelay: 2000,
            paused: true,
            onActive: function () { addEvent('onActive') },
            onStart: function () { addEvent('onStart') },
            onYoyo: function () { addEvent('onYoyo') },
            onRepeat: function () { addEvent('onRepeat') },
            onComplete: function () { addEvent('onComplete') }
        });
        */

        /*
        tween = this.tweens.add({
            targets: image,
            props: {
                x: {
                    value: 600,
                    delay: 2000
                },
                y: {
                    value: 200,
                    delay: 4000
                }
            },
            ease: 'Power1',
            duration: 3000,
            yoyo: true,
            loop: 1,
            paused: true,
            onActive: function () { addEvent('onActive') },
            onStart: function () { addEvent('onStart') },
            onLoop: function () { addEvent('onLoop') },
            onYoyo: function () { addEvent('onYoyo') },
            onRepeat: function () { addEvent('onRepeat') },
            onComplete: function () { addEvent('onComplete') }
        });
        */

        this.tween = this.tweens.add({
            targets: image,
            props: {
                x: {
                    value: 600,
                    delay: 1000
                }
            },
            ease: 'Power1',
            duration: 3000,
            yoyo: true,
            paused: true,
            onActive: function () { addEvent('onActive') },
            onStart: function () { addEvent('onStart') },
            onLoop: function () { addEvent('onLoop') },
            onYoyo: function () { addEvent('onYoyo') },
            onRepeat: function () { addEvent('onRepeat') },
            onComplete: function () { addEvent('onComplete') }
        });

        console.log(this.tween);

        this.input.on('pointerdown', () => {

            this.tween.play();

        });
    }

    update() {
        this.progressText.setText(`Progress: ${this.tween.totalProgress}`);
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
