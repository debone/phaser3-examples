class Example extends Phaser.Scene {
    preload() {
        this.load.image('ball', 'assets/sprites/blue_ball.png');
    }

    create() {
        const balls = this.add.group({ key: 'ball', repeat: 59 });

        const circle = new Phaser.Geom.Circle(400, 300, 160);
        const triangle = new Phaser.Geom.Triangle.BuildRight(200, 400, 300, 200);
        const rect = new Phaser.Geom.Rectangle(200, 150, 400, 300);
        const ellipse = new Phaser.Geom.Ellipse(400, 300, 200, 500);
        const triangle2 = new Phaser.Geom.Triangle.BuildEquilateral(400, 200, 300);

        //  Store the position data for each shape:
        Phaser.Actions.PlaceOnCircle(balls.getChildren(), circle);

        balls.children.iterate(child => {

            child.setData('circle', { x: child.x, y: child.y });

        });

        Phaser.Actions.PlaceOnTriangle(balls.getChildren(), triangle);

        balls.children.iterate(child => {

            child.setData('triangle', { x: child.x, y: child.y });

        });

        Phaser.Actions.PlaceOnRectangle(balls.getChildren(), rect);

        balls.children.iterate(child => {

            child.setData('rect', { x: child.x, y: child.y });

        });

        Phaser.Actions.PlaceOnEllipse(balls.getChildren(), ellipse);

        balls.children.iterate(child => {

            child.setData('ellipse', { x: child.x, y: child.y });

        });

        Phaser.Actions.PlaceOnTriangle(balls.getChildren(), triangle2);

        balls.children.iterate(child => {

            child.setData('triangle2', { x: child.x, y: child.y });

        });

        //  Start off on the Circle
        Phaser.Actions.PlaceOnCircle(balls.getChildren(), circle);

        const shapes = [ 'circle', 'triangle', 'rect', 'ellipse', 'triangle2' ];
        let shape1 = 0;
        let shape2 = 1;

        this.tweens.add({

            targets: balls.getChildren(),
            ease: 'Quintic.easeInOut',
            duration: 3000,
            delay: 1000,
            hold: 1000,
            loop: -1,

            x: {

                getEnd: function (target, key, value)
                {
                    return target.getData(shapes[shape2]).x;
                },

                getStart: function (target, key, value)
                {
                    return target.getData(shapes[shape1]).x;
                }

            },

            y: {

                getEnd: function (target, key, value)
                {
                    return target.getData(shapes[shape2]).y;
                },

                getStart: function (target, key, value)
                {
                    return target.getData(shapes[shape1]).y;
                }

            },

            onLoop: function ()
            {
                shape1 = Phaser.Math.Wrap(shape1 + 1, 0, 5);
                shape2 = Phaser.Math.Wrap(shape2 + 1, 0, 5);
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
