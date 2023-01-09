class Example extends Phaser.Scene {
    progressBar;
    tween;
    text2;
    text1;

    preload() {
        this.load.image('block', 'assets/sprites/block.png');
    }

    create() {
        const marker = this.add.image(100, 400, 'block').setAlpha(0.3);
        const image = this.add.image(100, 400, 'block');

        this.text1 = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' });
        this.text2 = this.add.text(400, 10, '', { font: '16px Courier', fill: '#00ff00' });

        this.tween = this.tweens.add({
            targets: image,
            props: {
                x: { value: 700, duration: 4000, ease: 'Power2' },
                y: { value: 500, duration: 1500, ease: 'Bounce.easeOut' }
            },
            loop: 2,
            loopDelay: 1000
        });

        // tween = this.tweens.add({
        //     targets: image,
        //     props: {
        //         x: { value: 700, duration: 4000, ease: 'Power2' },
        //         y: { value: 500, duration: 1500, ease: 'Bounce.easeOut' }
        //     },
        //     delay: 2000,
        //     completeDelay: 2000
        // });

        // tween = this.tweens.add({
        //     targets: image,
        //     props: {
        //         x: { value: 700, duration: 4000, ease: 'Linear' },
        //     },
        //     delay: 2000,
        //     completeDelay: 2000
        // });

        this.input.on('pointerdown', () => {

            // var td = tween.data[0];

            // console.log('start', td.getStartValue(td.target, td.key, td.start));
            // console.log('end', td.getEndValue(td.target, td.key, td.end));

            this.tween.seek(0.01);

            // console.log('start', td.getStartValue(td.target, td.key, td.start));
            // console.log('end', td.getEndValue(td.target, td.key, td.end));

        });

        this.progressBar = document.createElement('input');
        this.progressBar.type = 'range';
        this.progressBar.min = '0';
        this.progressBar.max = '100';
        this.progressBar.step = '.001';
        this.progressBar.value = '50';

        document.body.appendChild(this.progressBar);

        this.progressBar.addEventListener('input', e => {

            this.tween.seek(e.target.value / 100);

        });

        this.progressBar.addEventListener('mousedown', e => {

            console.log('pause');

            this.tween.pause();

        });

        this.progressBar.addEventListener('mouseup', e => {

            console.log('resume');

            console.log(this.tween);

            this.tween.resume();

        });
    }

    update() {
        this.debugTween(this.text1, this.tween);
        this.debugTweenData(this.text2, this.tween.data[0]);

        if (this.tween.isPlaying())
        {
            this.progressBar.value = Math.floor(this.tween.progress * 100);
        }

    }

    debugTween(text, tween) {
        const output = [];

        const TStates = [
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            'PENDING_ADD',
            'PAUSED',
            'LOOP_DELAY',
            'ACTIVE',
            'COMPLETE_DELAY',
            'PENDING_REMOVE',
            'REMOVED'
        ];

        output.push('Tween');
        output.push('-----');
        output.push(`State: ${TStates[tween.state]}`);
        output.push(`Total Progress: ${tween.totalProgress}`);
        output.push(`Total Duration: ${tween.totalDuration}`);
        output.push(`Total Elapsed: ${tween.totalElapsed}`);
        output.push(`Progress: ${tween.progress}`);
        output.push(`Duration: ${tween.duration}`);
        output.push(`Elapsed: ${tween.elapsed}`);
        output.push(`Loop: ${tween.loop}`);
        output.push(`Loop Delay: ${tween.loopDelay}`);
        output.push(`Loop Counter: ${tween.loopCounter}`);
        output.push(`Start Delay: ${tween.startDelay}`);
        output.push(`Complete Delay: ${tween.completeDelay}`);
        output.push(`Countdown: ${tween.countdown}`);
        output.push(`Has Started: ${tween.hasStarted}`);

        text.setText(output);
    }

    debugTweenData(text, tweenData) {
        const output = [];

        const TDStates = [
            'CREATED',
            'INIT',
            'DELAY',
            'OFFSET_DELAY',
            'PENDING_RENDER',
            'PLAYING_FORWARD',
            'PLAYING_BACKWARD',
            'HOLD_DELAY',
            'REPEAT_DELAY',
            'COMPLETE'
        ];

        output.push(tweenData.key);
        output.push('--------');
        output.push(`State: ${TDStates[tweenData.state]}`);
        output.push(`Start: ${tweenData.start}`);
        output.push(`Current: ${tweenData.current}`);
        output.push(`End: ${tweenData.end}`);
        output.push(`Progress: ${tweenData.progress}`);
        output.push(`Elapsed: ${tweenData.elapsed}`);
        output.push(`Duration: ${tweenData.duration}`);
        output.push(`Total Duration: ${tweenData.totalDuration}`);
        output.push(`Delay: ${tweenData.delay}`);
        output.push(`Yoyo: ${tweenData.yoyo}`);
        output.push(`Hold: ${tweenData.hold}`);
        output.push(`Repeat: ${tweenData.repeat}`);
        output.push(`Repeat Counter: ${tweenData.repeatCounter}`);
        output.push(`Repeat Delay: ${tweenData.repeatDelay}`);

        text.setText(output);
    }
}

const config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);

