class Example extends Phaser.Scene {
    prevDirection = null;
    prevDuration = 0;
    duration = 0;
    lastY = 0;
    minY = 600;
    maxY = 0;
    logo = null;

    preload() {
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('marker', 'assets/sprites/longarrow.png');
    }

    create() {
        this.logo = this.physics.add.image(400, 100, 'logo');

        this.logo.setOrigin(0.5, 0);
        this.logo.setVelocity(0, 60);
        this.logo.setBounce(1, 1);
        this.logo.setCollideWorldBounds(true);

        this.lastY = this.logo.y;

        text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' });

        // this.physics.world.timeScale = 0.1;

        this.sys.events.on('postupdate', this.update, this);
    }

    update(time, delta) {
        text.setText([
            `steps: ${ this.physics.world._lastCount}`,
            `duration: ${ this.prevDuration}`,
            `last y: ${ this.lastY}`,
            `min y: ${ this.minY}`,
            `max y: ${ this.maxY}`
        ]);

        if (Phaser.Math.Fuzzy.LessThan(this.logo.body.velocity.y, 0, 0.1))
        {
            direction = 'up';
        }
        else
        {
            direction = 'down';
        }

        if (this.prevDirection !== direction && this.prevDirection === 'up')
        {
            const marker = this.add.sprite(0, this.logo.y + 18, 'marker');

            marker.setOrigin(0, 1);

            this.lastY = this.logo.y;

            this.prevDuration = this.duration;
            this.duration = 0;
        }

        this.prevDirection = direction;
        this.duration += delta;

        this.minY = Math.min(this.minY, this.logo.y);
        this.maxY = Math.max(this.minY, this.maxY, this.lastY);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 150 }
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);
