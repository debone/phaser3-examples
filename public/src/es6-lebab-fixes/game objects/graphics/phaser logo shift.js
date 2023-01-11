class Example extends Phaser.Scene {
    logos;
    props;
    go;
    colors;
    r;
    s;
    graphics;

    create() {
        this.graphics = this.add.graphics();

        const hsv = Phaser.Display.Color.HSVColorWheel();

        this.colors = [];

        for (let i = 0; i < hsv.length; i += 4)
        {
            this.colors.push(hsv[i].color);
        }

        this.r = 0;
        this.s = [];
        this.go = false;
        this.logos = 13;

        this.props = {
            a: 0,
            thickness: 10,
            alpha: 1
        };

        for (let i = 0; i < this.logos; i++)
        {
            this.s.push(0);
        }

        TweenMax.delayedCall(5, () => {

            this.r = 0;
            this.go = true;

        });

        TweenMax.delayedCall(14, () => {

            TweenMax.to(this.props, 0.05, {

                a: 1,

                repeat: -1,

                onRepeat: function () {
                    Phaser.Utils.Array.RotateRight(this.colors);
                }

            });

        });

        TweenMax.delayedCall(30, () => {

            TweenMax.to(this.props, 3, {

                alpha: 0.1,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1,
                repeatDelay: 4

            });

        });

        TweenMax.delayedCall(22, () => {

            TweenMax.to(this.props, 6, {

                thickness: 2,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1,
                repeatDelay: 16

            });

        });
    }

    update() {
        this.graphics.clear();

        this.r += 0.015;

        let scale = 0.9 - (this.logos * 0.01);

        for (let i = 0; i < this.logos; i++)
        {
            this.drawLogo(this.colors[i], -400 + ((i * 2) * Math.sin(this.r * 2)), -100 + ((i * 2) * Math.cos(this.r * 2)), scale, this.s[i]);

            if (this.go)
            {
                this.s[i] = Math.sin(this.r / 2);
            }

            scale += 0.01;
        }
    }

    drawLogo(color, x, y, scale, rot) {
        this.graphics.lineStyle(Math.round(this.props.thickness), color, this.props.alpha);

        const w = 100;
        const h = 200;
        const h2 = 100;
        const top = y + 0;
        const mid = y + 100;
        const bot = y + 200;
        const s = 30;

        this.graphics.save();
        this.graphics.translateCanvas(400, 300);
        this.graphics.scaleCanvas(scale, scale);
        this.graphics.rotateCanvas(rot);

        this.graphics.beginPath();

        //  P

        this.graphics.moveTo(x, top);
        this.graphics.lineTo(x + w, top);
        this.graphics.lineTo(x + w, mid);
        this.graphics.lineTo(x, mid);
        this.graphics.lineTo(x, bot);

        //  H

        x += w + this.s;

        this.graphics.moveTo(x, top);
        this.graphics.lineTo(x, bot);
        this.graphics.moveTo(x, mid);
        this.graphics.lineTo(x + w, mid);
        this.graphics.moveTo(x + w, top);
        this.graphics.lineTo(x + w, bot);

        //  A

        x += w + this.s;

        this.graphics.moveTo(x, bot);
        this.graphics.lineTo(x + (w * 0.75), top);
        this.graphics.lineTo(x + (w * 0.75) + (w * 0.75), bot);

        //  S

        x += ((w * 0.75) * 2) + this.s;

        this.graphics.moveTo(x + w, top);
        this.graphics.lineTo(x, top);
        this.graphics.lineTo(x, mid);
        this.graphics.lineTo(x + w, mid);
        this.graphics.lineTo(x + w, bot);
        this.graphics.lineTo(x, bot);

        //  E

        x += w + this.s;

        this.graphics.moveTo(x + w, top);
        this.graphics.lineTo(x, top);
        this.graphics.lineTo(x, bot);
        this.graphics.lineTo(x + w, bot);
        this.graphics.moveTo(x, mid);
        this.graphics.lineTo(x + w, mid);

        //  R

        x += w + this.s;

        this.graphics.moveTo(x, top);
        this.graphics.lineTo(x + w, top);
        this.graphics.lineTo(x + w, mid);
        this.graphics.lineTo(x, mid);
        this.graphics.lineTo(x, bot);
        this.graphics.moveTo(x, mid);
        this.graphics.lineTo(x + w, bot);

        this.graphics.strokePath();

        this.graphics.restore();
    }
}

const config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
